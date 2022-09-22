import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express, { Request, Response } from 'express'
import Sender from './Sender'

import { MkAuth } from './mkauth'
MkAuth()

dotenv.config()

const app = express()

const sender = new Sender()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', async ( request: Request, response: Response ) => {
  return response.send({
    connected: sender.isConnected,
    qr_code: sender.qrCode
  })
})

app.post('/send', async ( request: Request, response: Response ) => {
  try {
    const { to, message } = request.body
    
    if (!to) throw new Error("Need number valid in to!");

    const res = await sender.sendText(to, message)
    console.log('res',res?.message)
    if (res?.message === 'Not connected')
      response.status(500).json({ status: 'error', message: res?.message })
    else 
      response.status(200).json({ status: 'ok', message: 'Message sended' })

  } catch (error: any) {
    console.log('[/send]:',error.Message)
    response.status(500).json({ status: 'error', message: error })
  }
})


app.use(function(request: Request, response: Response, next) {
  
  next();
});

app.post('/', async ( request: Request, response: Response ) => {
  try {
    const { token, celular, mensagem, device } = request.body

    const fone = celular.replace("+", "")
console.log('fone:',fone)
console.log('mensagem:',mensagem)
    const res = await sender.sendText(fone, mensagem)

    response.status(200).json({ status: 'ok', message: res })
  } catch (error: any) {
    console.log('[/send]:',error.Message)
    response.status(500).json({ status: 'error', message: error })
  }
})

app.listen(process.env.API_PORT || 3333, () => console.log(`API server runing in port ${process.env.API_PORT}`) )
