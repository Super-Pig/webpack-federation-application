const fs = require('fs')
const path = require('path')

const actions = []
const templatesDir = path.join('plop-templates', 'react')

const genActions = f => {
  const stat = fs.statSync(f)

  if (stat.isDirectory()) {
    const items = fs.readdirSync(f)

    items.forEach(item => {
      genActions(path.join(f, item))
    })
  } else {
    const filename = path.basename(f)
    const dirname = path.dirname(f)

    actions.push({
      type: 'add',
      path: path.join('{{applicationName}}', dirname.replace(templatesDir, ''), filename.replace('.hbs', '')),
      templateFile: path.join(dirname, filename)
    })
  }
}

genActions(templatesDir)

module.exports = plop => {
  plop.setHelper('upperCapital', (txt) => {
    if (!txt) {
      return ''
    }

    const [first, ...rest] = txt

    return `${first.toUpperCase()}${rest.join('')}`
  });

  plop.setGenerator('react app', {
    description: '创建React微服务',
    prompts: [{
      type: 'input',
      name: 'applicationName',
      message: 'application name'
    }, {
      type: 'input',
      name: 'port',
      message: 'webpack dev server port'
    }],
    actions
  })
}