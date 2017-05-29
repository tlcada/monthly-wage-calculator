import CsvReaderClass from '../Reader/CsvReader';
import * as moment  from 'moment';

const newJsonKeys = ['personName', 'personId', 'date', 'startTime', 'endTime'];
const csvReader = new CsvReaderClass(newJsonKeys);

/**
 * Calculate monthly wage
 */
class WageCalculation {
    public getMonthlyWage(): JSON | Error {
        const HOURLY_WAGE = 3.75;
        const EVENING_WORK_COMPENSATION = 1.15;
        const OVERTIME_MULTIPLIERS = [0.25, 0.50, 1.00];

        let wage: any = {};
        let combinedWorkingHours: Array<CsvJsonKeys> | Error;

        try {
            // Create a new JSON data that contains the person's working hours per day
            combinedWorkingHours = this.combineWorkingHoursOfDay();
        } catch (err) {
            throw new Error(err.message);
        }

        combinedWorkingHours.forEach(persons => {
            const personIds: Array<string> = Object.keys(persons);
            personIds.forEach(personId => {
                let monthlyWage: Array<number> = [];
                const workingHours: Array<JSON> = persons[personId]['workingHours'];
                const dates: Array<string> = Object.keys(workingHours);

                dates.forEach(currentDay => {
                    let dayDuration: number = 0;
                    let eveningWorkCompensation: number = 0;
                    const times: Array<string> = workingHours[currentDay];

                    times.forEach(time => {
                        const startAndEndTime: Array<string> = time.split("-");
                        const startTime: moment.Moment = this.createDate(currentDay, startAndEndTime[0]);
                        let endTime: moment.Moment = this.createDate(currentDay, startAndEndTime[1]);
                        let dayHasChanged: boolean;

                        if (endTime < startTime) {
                            dayHasChanged = true;
                            endTime = endTime.add(1, 'day');
                        } else {
                            dayHasChanged = false;
                        }

                        dayDuration += this.getDuration(startTime, endTime);
                        eveningWorkCompensation += this.getEveningWorkHours(currentDay, startTime, endTime, dayHasChanged) * EVENING_WORK_COMPENSATION;
                    });

                    const regularDailyWage: number = dayDuration * HOURLY_WAGE;
                    const overtimeCompensation: number = this.getOvertimeCompensation(dayDuration, HOURLY_WAGE, OVERTIME_MULTIPLIERS);
                    let dayWage: number = (regularDailyWage + eveningWorkCompensation + overtimeCompensation);
                    const date: moment.Moment = moment(currentDay, 'DD.MM.YYYY');
                    const monthYear: string = date.format('M') + "/" + date.format('Y');

                    if (monthlyWage[monthYear]) {
                        dayWage += monthlyWage[monthYear];
                    }

                    monthlyWage[monthYear] = Math.round(dayWage * 100) / 100;
                });

                // Convert array to JSON object
                let wages = Object.assign({}, monthlyWage);
                wage[persons[personId]['personName']] = wages;
            });
        });

        return wage;
    }

    private combineWorkingHoursOfDay(): Array<CsvJsonKeys> {
        let timeRegistrations: any = {};
        let parsedCsvData: Array<CsvJsonKeys>;

        try {
            parsedCsvData = csvReader.readFilesFromDirectory<CsvJsonKeys>('./files/hour_lists/');
        } catch (err) {
            throw new Error(err.message);
        }

        parsedCsvData.forEach(personObject => {
            let personWorkingHours: any = {};

            const interval: Array<string> = [personObject.startTime + '-' + personObject.endTime];
            const person: Array<CsvJsonKeys> = timeRegistrations[personObject.personId];
            if (person) {
                const startTimes: Array<string> = person['workingHours'][personObject.date];
                personWorkingHours[personObject.date] = (startTimes) ? startTimes.concat(interval) : interval;
                timeRegistrations[personObject.personId].workingHours[personObject.date] = personWorkingHours[personObject.date];
            } else {
                personWorkingHours[personObject.date] = interval;
                timeRegistrations[personObject.personId] = {'personName': personObject.personName, 'workingHours': personWorkingHours};
            }
        });

        return [timeRegistrations];
    }

    /* Evening work compensation is between 18:00 - 06:00 */
    private getEveningWorkHours(currentDay: string, startTime: moment.Moment, endTime: moment.Moment, dayHasChanged: boolean): number {
        let eveningWorkHours: number = 0;
        const eveningTimeStart: moment.Moment  = this.createDate(currentDay, '18:00');
        const eveningTimeEnd: moment.Moment = (dayHasChanged) ? this.createDate(endTime.format('DD.MM.YYYY'), '6:00') : this.createDate(currentDay, '6:00');

        // Match, for example 19:00 - 22:00 or 01:00 - 05:00
        if (((startTime >= eveningTimeStart && endTime >= eveningTimeStart) || (startTime <= eveningTimeEnd && endTime < eveningTimeEnd)) && !dayHasChanged) {
            eveningWorkHours = this.getDuration(startTime, endTime);
        // Match, for example 02:00 - 09:00
        } else if (startTime < eveningTimeEnd && endTime >= eveningTimeEnd && !dayHasChanged) {
            eveningWorkHours = this.getDuration(startTime, eveningTimeEnd);
        // Match, for example 16:00 - 22:00
        } else if (startTime < eveningTimeStart && endTime >= eveningTimeStart) {
            // Match, for example 17:00 - 07:00
            if (startTime < eveningTimeStart && endTime >= eveningTimeEnd && dayHasChanged) {
                eveningWorkHours = 12;
            } else {
                eveningWorkHours = this.getDuration(eveningTimeStart, endTime);
                // Match, for example 5:00 - 19:00
                if (startTime < eveningTimeEnd && endTime >= eveningTimeStart && !dayHasChanged) {
                    eveningWorkHours += this.getDuration(startTime, eveningTimeEnd);
                }
            }
        // Match, for example 22:00 - 06:00
        } else if ((startTime >= eveningTimeStart && endTime >= eveningTimeStart) && dayHasChanged) {
            eveningWorkHours = this.getDuration(startTime, endTime);
        }

        return eveningWorkHours;
    }

    private createDate(date: string, time: string): moment.Moment {
        return moment(date + " " + time, 'DD.MM.YYYY HH:mm');
    }

    private getDuration(startTime: moment.Moment, endTime: moment.Moment): number {
        const duration = moment.duration(endTime.diff(startTime));
        return duration.asHours();
    }

    private getOvertimeCompensation(dayDuration: number, hourlyWage: number, overtimeMultipliers: Array<number>): number {
        let overtimeCompensation: number = 0;
        const overtimeHour = (dayDuration - 8);

        if (overtimeHour > 0 && overtimeHour <= 2) {
            overtimeCompensation = overtimeHour * overtimeMultipliers[0] * hourlyWage;
        } else if (overtimeHour > 2 && overtimeHour <= 4) {
            overtimeCompensation = (overtimeMultipliers[0] * 2 + overtimeMultipliers[1] * (overtimeHour - 2)) * hourlyWage;
        } else if (overtimeHour > 4) {
            overtimeCompensation = (overtimeMultipliers[0] * 2 + overtimeMultipliers[1] * 2 + overtimeMultipliers[2] * (overtimeHour - 4)) * hourlyWage;
        }

        return overtimeCompensation;
    }
}

export default WageCalculation;
