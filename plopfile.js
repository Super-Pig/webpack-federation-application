const fs = require('fs')
const path = require('path')

const {sep} = path
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
    let dirname = path.dirname(f)

    dirname = dirname.replace(templatesDir, '').replace(sep, '')
    
    actions.push({
      type: 'add',
      path: `{{applicationName}}${sep}${dirname}${sep}${filename.replace('.hbs', '')}`,
      templateFile: `plop-templates${sep}${dirname}${sep}${filename}`
    })
  }
}

genActions(templatesDir)

console.log(actions)

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