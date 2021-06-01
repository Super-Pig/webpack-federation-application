const fs = require('fs')
const path = require('path')

const actions = []
const templatesDir = 'plop-templates'

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
  plop.setGenerator('application', {
    description: '创建微服务',
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