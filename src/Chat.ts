import { Financial, FinancialOpt } from './Financial';
import { Message, Whatsapp } from 'venom-bot'
import { Support, SupportOpt } from './Support'
import { Upgrade, UpgradeOpt } from './Upgrade'
import { Ura, Ura1 } from './Ura'

const lolDb = require("lol.db")

export const Chat = async (client: Whatsapp, message: Message) => {

  try {

    let db = lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")
    const msg = message.body.toLowerCase() as string
    const dateNow = Date.now()
    const ura = await db.get(`${from}.ura`)

    const userTimer = await db.get(`${from}.lastMessage`)
    const lastTime = Math.floor( (dateNow - userTimer)/*ms*/ / 1000 )
    
    if ( !userTimer || lastTime > (60/*min*/ * 60/*seg*/)/*segundos*/ ) {
      await db.set(`${from}.lastMessage`, dateNow)
      await Salutation(client, message)
    }

    if (ura === 'Ura') await Ura1(client, message)
    else if (ura === 'Support') await SupportOpt(client, message)
    else if (ura === 'Upgrade') await UpgradeOpt(client, message)
    else if (ura === 'Financial') await FinancialOpt(client, message)
    else await Ura(client, message)

  } catch (error: any) {
    return new Error(error)
  }
}

const Salutation = async (client: Whatsapp, message: Message) => {
  try {

    const msg = message.body.toLowerCase() as string
    const date_ob = new Date()
    const hours = date_ob.getHours()
    const minutes = date_ob.getMinutes()

    const resSalutation = (hours >= 6 && hours <= 11) ? 'Bom dia' : (hours >= 12 && hours <= 17) ? 'Boa tarde' : 'Boa noite'

    client
      .sendText(message.from, `${resSalutation} ${message.sender.shortName}! Eu sou o assistente virtual da LD Fibra.`)
      .then( result => {})
      .catch( erro => new Error(erro))

  } catch (error: any) {
    return new Error(error)
  }
}
