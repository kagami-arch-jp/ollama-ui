<?js

const CDN_FILES=[

  'https://cdn.jsdelivr.net/npm/intersection-observer-polyfill/dist/IntersectionObserver.js',

  'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js',
  'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js',
  'https://cdn.jsdelivr.net/npm/react-cross-component-state@1.0.2/index.umd.js',

  'https://cdn.jsdelivr.net/npm/marked@16.4.1/lib/marked.umd.js',
  'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/highlight.min.js',
  'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/styles/github-dark.min.css',

  'https://cdn.jsdelivr.net/npm/bootstrap@4.5.1/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/react-bootstrap@1.6.8/dist/react-bootstrap.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/fonts/bootstrap-icons.woff2?e34853135f9e39acf64315236852cd5a',

]
const MODULE_ALIAS={
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-cross-component-state': 'createSharedState',
  'react-bootstrap': 'ReactBootstrap',
}

const fs=require('fs')
const ABOUT_MD=fs.readFileSync(__dirname+'/about.md', 'utf8')
