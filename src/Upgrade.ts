import { Message, Whatsapp } from 'venom-bot'

const lolDb = require("lol.db")

export const Upgrade = async (client: Whatsapp, message: Message) => {
  try {
    let db = lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")

    const list = [
      {
        title: "LD Fibra - Upgrade",
        rows: [
          {
            title: "10 Mbps R$49,90 / mês",
            description: "Ideal para atividades básicas como whatsapp e emails",
          },
          {
            title: "20 Mbps R$69,90 / mês",
            description: "Alem das atividades básicas para assistir streams",
          },
          {
            title: "30 Mbps R$89,90 / mês",
            description: "Streams em 4K",
          },
          {
            title: "60 Mbps R$109,90 / mês",
            description: "Para usuários exigentes",
          }
        ]
      }
    ]

    await client.sendListMenu(message.from, 'Upgrade', 'subTitle', 'Click abaixo para as opções', 'LD Fibra - Upgrade', list)
      .then( async result => await db.set(`${from}.ura`, 'Upgrade') )
      .catch( error => new Error(error))
  } catch (error: any) {
    return new Error(error)
  }
}

export const UpgradeOpt = async (client: Whatsapp, message: Message) => {
  try {
    
    let db = await lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")
    const msg = message.body.toLowerCase() as string

    let plan = 0
    if (msg.includes('10 Mbps')) plan = 10
    if (msg.includes('20 Mbps')) plan = 20
    if (msg.includes('30 Mbps')) plan = 30
    if (msg.includes('60 Mbps')) plan = 60

    await client
      .sendText(message.from, `Seu plano será alterado para ${plan} Mbps`)
      .then( async result => await db.set(`${from}.ura`, '-'))
      .catch( erro => new Error(erro))

  } catch (error: any) {
    return new Error(error)
  }
}
