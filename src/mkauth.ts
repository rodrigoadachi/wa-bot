import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const instance = axios.create({
  baseURL: `${process.env.MKAUTH_URL}/api/`,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
  auth: {
    username: process.env.MKAUTH_USER_ID as string,
    password: process.env.MKAUTH_USER_SECRET as string
  }
})

export const MkAuth = async () => {

  instance.get(`/cliente/list/user1`)
    .then(function (response) {
      console.log('cliente:',response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    })
}