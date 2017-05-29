/* global fetch:false */

import config from '../../../config/config'
import 'whatwg-fetch'

function Request () {
  return fetch(config.apiUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }).then(response => {
    return response.json()
  }).then(json => {
    return json
  }, err => {
    return err
  }).catch(function (err) {
    return Promise.reject(err)
  })
}

export { Request }
