import { Message, Whatsapp } from 'venom-bot'

const lolDb = require("lol.db")

let db = lolDb("clients.json", true)

export const Support = async (client: Whatsapp, message: Message) => {
  try {
    const from = message.from.replace("@c.us", "")

    const list = [
      {
        title: "Qual das alternativas abaixo?",
        rows: [
          {
            title: "Sem acesso",
            description: "Está sem acesso a internet?",
          },
          {
            title: "Lentidão",
            description: "Percebeu alguma lentidão?",
          },
          {
            title: "Defeito",
            description: "Está com problemas em seu roteador?",
          },
        ]
      }
    ]

    await client.sendListMenu(message.from, 'Suporte Técnico', 'subTitle', 'Click abaixo para as opções', 'LD Fibra - Suporte Técnico', list)
      .then( async result => await db.set(`${from}.ura`, 'Support') )
      .catch( error => new Error(error))

  } catch (error: any) {
    return new Error(error)
  }
}

export const SupportOpt = async (client: Whatsapp, message: Message) => {
  try {
    
    let db = await lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")
    const msg = message.body.toLowerCase() as string

    await client
      .sendText(message.from, `Estamos agendando o suporte técnico para melhor te atender.`)
      .then( async result => await db.set(`${from}.ura`, '-'))
      .catch( erro => new Error(erro))

  } catch (error: any) {
    return new Error(error)
  }
}
