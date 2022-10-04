import { hook as io } from '../common/event'
import { CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, SET_THEME, TEST_ACTION, UI_READY } from '../common/eventName'
import app from './app'
app.showUI(__html__, {
  width: 450,
  height: 600,
})

io?.on(NOTIFY, (data) => {
  if (typeof data === 'string') {
    app.notify(data, {
      position: 'bottom',
    })
  }
})
// app.on(
//   'themechange',
//   (theme: any) => {
//     const ifDark = theme === 'dark' ? 1 : 0
//     io?.send(SET_THEME, { ifDark })
//   },
// )
io?.on(GET_TEHME, () => {
  const app_ = app as any
  const ifDark = app_.themeColor === 'dark' ? 1 : 0
  io?.send(SET_THEME, { ifDark })
})

io?.on(TEST_ACTION, () => {
  app.notify('test code execute successful!')
})

io?.on(EXIST, () => {
  app.closePlugin()
})

io?.on(CREATE_RECTANGLES, ({ count }) => {
  const nodes = [] as any
  for (let i = 0; i < count; i++) {
    const rect = app.createRectangle()
    rect.x = i * 150
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
    app.currentPage.appendChild(rect)
    nodes.push(rect)
  }
  app.currentPage.selection = nodes
  app.viewport.scrollAndZoomIntoView(nodes)
})

io?.on(UI_READY, async () => {
  // ..
})
export { }
