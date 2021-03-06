import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ?
"http://localhost:3000/" :'https://infinite-cove-99947.herokuapp.com/' || 'http://infinite-cove-99947.herokuapp.com/'

  // /routes/auth

const authService = axios.create({
  baseURL,
  withCredentials: true
})


export const signupFn = userInfo =>
  authService.post('/signup', userInfo)

export const loginFn = userInfo =>
  authService.post('/login', userInfo)

export const updateUserFn= userInfo=>
  authService.put('/userUpdate', userInfo)

export const userDetails= (_id) => 
  authService.get(`/${_id}`)

export const currentUserFn = () =>
  authService.get('/current-user')
  
export const sendEmail = (_id, email) =>
  authService.post(`/sendEmail/${_id}`, email)

export const logoutFn = () =>
  authService.get('/logout')