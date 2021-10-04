let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  // BASE_URL = '/api'
  // baseURL: ''http://152.136.185.210:5000'',
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api'
} else {
  BASE_URL = '/api'
}

export { BASE_URL, TIME_OUT }


