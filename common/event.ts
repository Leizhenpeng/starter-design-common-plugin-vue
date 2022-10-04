/// <reference types="@mastergo/plugin-utils" />

import { EventEmitter } from 'eventemitter3'
import app from '../hook/app'

export class MyEvent extends EventEmitter {
  ifUI: boolean
  constructor(
    ifRenderUI = false,
  ) {
    super()
    this.ifUI = ifRenderUI
    this.init()
  }

  init() {
    const receive = (result: any) => {
      if (result && result.event)
        this.emit(result.event, result.data)
    }

    if (this.ifUI)
      window.onmessage = ev => receive(ev.data.pluginMessage)
    else
      app.ui.onmessage = data => receive(data)
  }

  send(event: any, data: any) {
    if (typeof event !== 'string')
      throw new Error('Expected first argument to be an event name string')
    const postData = {
      event,
      data,
    }
    if (this.ifUI)
      parent.postMessage({ pluginMessage: postData }, '*')
    else
      app.ui.postMessage(postData)
  }

  loadFirst(ev: any) {
    return new Promise((resolve) => {
      this.once(ev, resolve)
    })
  }
}

const isRenderer = typeof app === 'undefined'
export const ui = isRenderer ? new MyEvent(true) : undefined
export const hook = isRenderer ? undefined : new MyEvent(false)
