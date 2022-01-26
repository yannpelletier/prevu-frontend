const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
const {PAGES_PRE_RENDERED_TAGS, DEFAULT_TAGS} = require("./seo");
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const plugins = (process.env.NODE_ENV !== 'production') ? [] : [
  new SitemapPlugin('https://prev-u.com', ['/', ...Object.keys(PAGES_PRE_RENDERED_TAGS)], {
    fileName: 'sitemap.xml',
    lastMod: true,
    changeFreq: 'weekly',
  }),
  new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: Object.keys(PAGES_PRE_RENDERED_TAGS),

    postProcess(renderedRoute) {
      const {route} = renderedRoute;
      const description = PAGES_PRE_RENDERED_TAGS[route].description || DEFAULT_TAGS.description;

      renderedRoute.html = renderedRoute.html.replace(
        /<meta name="?description"? content="[^"]*">/i,
        `<meta name="description" content="${description}">`
      );
      return renderedRoute
    },
    renderer: new Renderer({
      headless: true,
      renderAfterDocumentEvent: 'render-event'
    }),
  })
]
module.exports = {
  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  // outputDir: '../public',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  // indexPath: process.env.NODE_ENV === 'production'
  //   ? '../resources/views/index.blade.php'
  //   : 'index.html'
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins,
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
