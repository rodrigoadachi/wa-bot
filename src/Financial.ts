import { Message, Whatsapp } from 'venom-bot'

const lolDb = require("lol.db")

export const Financial = async (client: Whatsapp, message: Message) => {
  try {
    let db = lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")

    const list = [
      {
        title: "Financeiro",
        rows: [
          {
            title: "PIX",
            description: "Gostaria que eu te envie o PIX para pagamento",
          },
          {
            title: "Status",
            description: "Quer saber como estão seus pagamentos?",
          }
        ]
      },
    ]

    await client.sendListMenu(message.from, 'Financeiro', 'subTitle', 'Click abaixo para as opções', 'LD Fibra - Financeiro', list)
      .then( async result => await db.set(`${from}.ura`, 'Financial') )
      .catch( error => new Error(error))

  } catch (error: any) {
    return new Error(error)
  }
}

export const FinancialOpt = async (client: Whatsapp, message: Message) => {
  try {
    
    let db = await lolDb("clients.json", true)
    const from = message.from.replace("@c.us", "")
    const msg = message.body.toLowerCase() as string

    if (msg.includes('status'))
      await client
        .sendText(message.from, `Você possue uma fatura em aberto`)
        .then( async result => await db.set(`${from}.ura`, '-'))
        .catch( erro => new Error(erro))

    if (msg.includes('pix'))
      await client
        .sendText(message.from, `O PIX é 000000000000000`)
        .then( async result => await db.set(`${from}.ura`, '-'))
        .catch( erro => new Error(erro))

  } catch (error: any) {
    return new Error(error)
  }
}
