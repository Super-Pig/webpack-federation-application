const fs = require('fs')
const path = require('path')

const getReactActions = () => {
  const actions = []
  const templatesDir = path.join('plop-templates', 'react')

  const next = f => {
    const stat = fs.statSync(f)
  
    if (stat.isDirectory()) {
      const items = fs.readdirSync(f)
  
      items.forEach(item => {
        next(path.join(f, item))
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

  next(templatesDir)

  return actions
}

module.exports = plop => {
  plop.setHelper('upperCapital', (txt) => {
    if (!txt) {
      return ''
    }

    const [first, ...rest] = txt

    return `${first.toUpperCase()}${rest.join('')}`
  });

  plop.setGenerator('react app', {
    description: '创建 React 微服务',
    prompts: [{
      type: 'input',
      name: 'applicationName',
      message: 'application name'
    }, {
      type: 'input',
      name: 'port',
      message: 'webpack dev server port'
    }],
    actions: getReactActions()
  })
}