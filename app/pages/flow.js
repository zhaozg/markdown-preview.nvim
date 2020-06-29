let options = {}

const flow = (md, opts = {}) => {
  options = opts
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    try {
      if (token.info && token.info.trim() === 'flowchart') {
        const code = token.content.trim()
        return `<div class="flowchart">${code}</div>`
      }
    } catch (e) {
      console.error(`Parse flowchart Error: `, e)
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export const renderFlow = () => {
  let list = document.querySelectorAll('.flowchart')
  if (!list) {
    return
  }
  list.forEach(item => {
    try {
      let d = flowchart.parse(item.textContent)
      item.textContent = ''
      d.drawSVG(item, {
        'x': 0,
        'y': 0,
        'line-width': 3,
        'line-length': 50,
        'text-margin': 10,
        'font-size': 14,
        'font-color': 'black',
        'line-color': 'black',
        'element-color': 'black',
        'fill': 'white',
        'yes-text': 'yes',
        'no-text': 'no',
        'arrow-end': 'block',
        'scale': 1,
        ...options
      })
    } catch (e) {
      console.error(`Parse flowchart Error: ${e}`)
    }
  })
  list = null
}

export default flow
