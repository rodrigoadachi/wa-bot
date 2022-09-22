import { create, Whatsapp, Message, SocketState } from 'venom-bot'
import parsePhoneNumber,{ isValidPhoneNumber } from 'libphonenumber-js'
import { Chat } from './Chat'

export type QRCodeType = {
  qrCode: string
  asciiQR: string
  attempt: number
  urlCode?: string
}

export default class Sender {
  
  private client: Whatsapp
  private connected: boolean
  private qr: QRCodeType

  public get isConnected() : boolean {
    return this.connected
  }
  
  public get qrCode() : QRCodeType {
    return this.qr
  }

  constructor() {
    this.initialize()
  }
  
  async sendText(to: string, body: string) {
    try {
      
      if (!this.connected)
        throw new Error('Not connected')

      if (!to)
        throw new Error('need valid number')

      if (!isValidPhoneNumber(to, 'BR'))
        throw new Error('this number is not valid')
      
      const phoneNumber = parsePhoneNumber(to, 'BR')
        ?.format('E.164')
        ?.replace('+','') as string

      this.client.sendText(`${phoneNumber}@c.us`, body)
        .then( result => console.log('sendText:',result))
        .catch( erro => new Error(erro))

    } catch (error: any) {
      console.log('[sendText]:',error.message)
      return new Error(error.message)
    }
  }

  private initialize() {
    try {

      const catchQR = ( qrCode: string, asciiQR: string, attempt: number, urlCode?: string ) => this.qr = { qrCode, asciiQR, attempt, urlCode }
  
      const statusFind = ( statusSession: string, session: string ) => this.connected = ['isLogged', 'qrReadSuccess', 'chatsAvailable', 'Authenticated'].includes(statusSession)
  
      const start = (client: Whatsapp) => {
        try {
          this.client = client
        
          client.onStateChange( state => this.connected = state === SocketState.CONNECTED)
  
          client.onMessage((message) => {
            if (message.isGroupMsg === false)
              Chat(client, message)
                .then( res => {} )
                .catch( error => new Error(error))
          });

        } catch (error: any) {
          console.log('[start]:',error.message)
          return new Error(error.message)
        }

      }
  
      create('ws-sender-dev', catchQR)//, { logQR: true }
        .then( client => start(client))
        .catch( error => console.log(error))

    } catch (error) {
      console.log('[Sender] ',error)      
    }
  }
}

/*
{
  id: 'false_557192590635@c.us_3EB000CDCE3523ADEFAB',
  body: 'ok',
  type: 'chat',
  t: 1663285736,
  notifyName: 'Rodrigo Adachi',
  from: '557192590635@c.us',
  to: '557191261850@c.us',
  self: 'in',
  ack: 1,
  isNewMsg: true,
  star: false,
  kicNotified: false,
  recvFresh: true,
  isFromTemplate: false,
  pollInvalidated: false,
  broadcast: false,
  mentionedJidList: [],
  isVcardOverMmsDocument: false,
  isForwarded: false,
  hasReaction: false,
  ephemeralOutOfSync: false,
  productHeaderImageRejected: false,
  lastPlaybackProgress: 0,
  isDynamicReplyButtonsMsg: false,
  isMdHistoryMsg: false,
  requiresDirectConnection: false,
  pttForwardedFeaturesEnabled: true,
  chatId: '557192590635@c.us',
  fromMe: false,
  sender: {
    id: '557192590635@c.us',
    name: 'Rodrigo Adachi',
    shortName: 'Rodrigo',
    pushname: 'Rodrigo Adachi',
    type: 'in',
    isBusiness: false,
    isEnterprise: false,
    isContactSyncCompleted: 1,
    formattedName: 'Rodrigo Adachi',
    displayName: 'Rodrigo Adachi',
    formattedShortName: 'Rodrigo',
    formattedShortNameWithNonBreakingSpaces: 'Rodrigo',
    isMe: false,
    mentionName: 'Rodrigo Adachi',
    notifyName: 'Rodrigo Adachi',
    isMyContact: true,
    isPSA: false,
    isUser: true,
    isWAContact: true,
    profilePicThumbObj: { id: '557192590635@c.us', tag: '' },
    msgs: null
  },
  timestamp: 1663285736,
  content: 'ok',
  isGroupMsg: false,
  isMedia: false,
  isNotification: false,
  isPSA: false,
  chat: {
    id: '557192590635@c.us',
    pendingMsgs: false,
    lastReceivedKey: {
      fromMe: false,
      remote: '557192590635@c.us',
      id: '3EB028692F6E0EF07F7E',
      _serialized: 'false_557192590635@c.us_3EB028692F6E0EF07F7E'
    },
    t: 1663285724,
    unreadCount: 1,
    isReadOnly: false,
    muteExpiration: 0,
    notSpam: true,
    unreadMentionsOfMe: [],
    unreadMentionCount: 0,
    hasUnreadMention: false,
    archiveAtMentionViewedInDrawer: false,
    hasChatBeenOpened: false,
    tcToken: {},
    tcTokenTimestamp: 1663285494,
    tcTokenSenderTimestamp: 1663282255,
    pendingInitialLoading: false,
    msgs: null,
    kind: 'chat',
    isGroup: false,
    contact: {
      id: '557192590635@c.us',
      name: 'Rodrigo Adachi',
      shortName: 'Rodrigo',
      pushname: 'Rodrigo Adachi',
      type: 'in',
      isBusiness: false,
      isEnterprise: false,
      isContactSyncCompleted: 1,
      formattedName: 'Rodrigo Adachi',
      displayName: 'Rodrigo Adachi',
      formattedShortName: 'Rodrigo',
      formattedShortNameWithNonBreakingSpaces: 'Rodrigo',
      isMe: false,
      mentionName: 'Rodrigo Adachi',
      notifyName: 'Rodrigo Adachi',
      isMyContact: true,
      isPSA: false,
      isUser: true,
      isWAContact: true,
      profilePicThumbObj: [Object],
      msgs: null
    },
    groupMetadata: null,
    presence: { id: '557192590635@c.us', chatstates: [] },
    isOnline: null,
    lastSeen: null
  },
  isOnline: null,
  lastSeen: null,
  mediaData: {},
  linkPreview: false,
  text: 'ok',
  initialPageSize: 768
}
*/


                /*

client
.sendText(message.from, 'Welcome Venom ')//🕷
.then((result) => {



                {
  me: {},
  to: {
    fromMe: true,
    remote: {
      server: 'c.us',
      user: '557192590635',
      _serialized: '557192590635@c.us'
    },
    id: 'DMRKRR3JGK7BUELWNDJG',
    _serialized: 'true_557192590635@c.us_DMRKRR3JGK7BUELWNDJG'
  },
  erro: false,
  text: 'Welcome Venom 🕷' ,
  status: 'OK',
  result: null,
  type: 'sendText'
}
*/