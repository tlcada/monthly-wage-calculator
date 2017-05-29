const environment = process.env.NODE_ENV || 'development'
const url = (environment === 'development') ? 'http://localhost:3000/' : window.location.href.split('#')[0]

const config = {
  apiDoc: url + 'api',
  apiUrl: url + 'api/wage'
}

export default config
