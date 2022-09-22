import { Message, Whatsapp } from 'venom-bot'
import { Financial } from './Financial'
import { Support } from './Support'
import { Upgrade } from './Upgrade'

const lolDb = require("lol.db")

let db = lolDb("clients.json", true)

export const Ura = async (client: Whatsapp, message: Message) => {
  try {

    const from = message.from.replace("@c.us", "")
    const buttons = [
      {
        "buttonText": {
          "displayText": "Suporte Técnico?"
        }
      },
      {
        "buttonText": {
          "displayText": "Upgrade?"
        }
      },
      {
        "buttonText": {
          "displayText": "Assuntos Financeiros?"
        }
      }
    ]

    await client
      .sendText(message.from, `Olá ${message.sender.shortName}, como podemos te ajudar?`)
      .then( async result => {
        await client.sendButtons(message.from, 'Title', buttons, 'Description')
          .then( async result => await db.set(`${from}.ura`, 'Ura'))
          .catch( error => new Error(error))
      })
      .catch( erro => new Error(erro))

  } catch (error: any) {
    return new Error(error)
  }
}

export const Ura1 = async (client: Whatsapp, message: Message) => {
  try {
    const msg = message.body.toLowerCase() as string

    if (msg.includes('upgrade'))
      await Upgrade(client, message)

    if (msg.includes('suporte'))
      await Support(client, message)

    if (msg.includes('financeiro'))
      await Financial(client, message)

  } catch (error: any) {
    return new Error(error)
  }
}
