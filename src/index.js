const request = require('superagent')
const { keys, pluck } = require('ramda')
const jsonfile = require('jsonfile')

const DATA_SOURCE = {
  clj: 'https://anvaka.github.io/common-words/static/data/clj/context.json',
  cmake: 'https://anvaka.github.io/common-words/static/data/cmake/context.json',
  cpp: 'https://anvaka.github.io/common-words/static/data/cpp/context.json',
  cs: 'https://anvaka.github.io/common-words/static/data/cs/context.json',
  css: 'https://anvaka.github.io/common-words/static/data/css/context.json',
  elm: 'https://anvaka.github.io/common-words/static/data/elm/context.json',
  erl: 'https://anvaka.github.io/common-words/static/data/erl/context.json',
  ex: 'https://anvaka.github.io/common-words/static/data/ex/context.json',
  fs: 'https://anvaka.github.io/common-words/static/data/fs/context.json',
  go: 'https://anvaka.github.io/common-words/static/data/go/context.json',
  groovy: 'https://anvaka.github.io/common-words/static/data/groovy/context.json',
  hs: 'https://anvaka.github.io/common-words/static/data/hs/context.json',
  html: 'https://anvaka.github.io/common-words/static/data/html/context.json',
  java: 'https://anvaka.github.io/common-words/static/data/java/context.json',
  js: 'https://anvaka.github.io/common-words/static/data/js/context.json',
  jsx: 'https://anvaka.github.io/common-words/static/data/jsx/context.json',
  kt: 'https://anvaka.github.io/common-words/static/data/kt/context.json',
  lisp: 'https://anvaka.github.io/common-words/static/data/lisp/context.json',
  lua: 'https://anvaka.github.io/common-words/static/data/lua/context.json',
  objc: 'https://anvaka.github.io/common-words/static/data/objc/context.json',
  pas: 'https://anvaka.github.io/common-words/static/data/pas/context.json',
  php: 'https://anvaka.github.io/common-words/static/data/php/context.json',
  pl: 'https://anvaka.github.io/common-words/static/data/pl/context.json',
  purs: 'https://anvaka.github.io/common-words/static/data/purs/context.json',
  py: 'https://anvaka.github.io/common-words/static/data/py/context.json',
  r: 'https://anvaka.github.io/common-words/static/data/r/context.json',
  rb: 'https://anvaka.github.io/common-words/static/data/rb/context.json',
  rs: 'https://anvaka.github.io/common-words/static/data/rs/context.json',
  scala: 'https://anvaka.github.io/common-words/static/data/scala/context.json',
  sql: 'https://anvaka.github.io/common-words/static/data/sql/context.json',
  swift: 'https://anvaka.github.io/common-words/static/data/swift/context.json',
  vim: 'https://anvaka.github.io/common-words/static/data/vim/context.json'
}

async function parseData (lang) {
  const url = DATA_SOURCE[lang]
  const data = await request.get(url)
  const words = pluck('word', data.body)
  const file = `data/top-1000-popular-${lang}-words.json`
  const trainingData = createTrainigData(lang, words)

  jsonfile.writeFile(file, trainingData, {spaces: 2}, function (err) {
    if (err) console.error(err)
    console.log(`${words.length} words for ${lang} saved to ${file}`)
  })
}

function createTrainigData (lang, words) {
  return {
    id: `popular-${lang}-words`,
    name: `Popular ${lang} words training`,
    mode: lang,
    level: 'beginner',
    logo: `images/languages/${lang}.png`,
    lessons: words.map(word => ({
      exercise: '',
      example: word
    }))
  }
}

var r = keys(DATA_SOURCE).map(parseData)

Promise
  .all(r)
  .catch(console.error)


