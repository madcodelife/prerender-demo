const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: resolve('dist'),
            routes: ['/', '/about'],
            renderer: new Renderer({
              inject: {
                _m: 'prerender'
              },
              headless: true,
              renderAfterDocumentEvent: 'render-event'
            })
          })
        ]
      }
    }
  }
}
