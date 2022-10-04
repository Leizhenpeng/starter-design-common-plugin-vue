//  jsDesign or mg or figma
let app = null

const isJsDesign = typeof jsDesign !== 'undefined'

const isFigma = typeof figma !== 'undefined'

function exportApp() {
  if (isJsDesign) {
    app = jsDesign
    return
  }
  if (isFigma)
    app = figma
}

exportApp()

export default app as unknown as PluginAPI
