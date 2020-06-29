let options = {}

import './d3'
import './markmap/d3-flextree';
// const parse = require('../../lib/parse.markdown');
import parse from './markmap/parse.txtmap';
import transform from './markmap/transform.headings';
import markmapr from './markmap/view.mindmap';

const markmap = (md, opts = {}) => {
  options = opts
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    try {
      if (token.info && token.info.trim() === 'markmap') {
        const code = token.content.trim()
        return `<svg class="markmap" style="width:100%;">${code}</svg>`;
      }
    } catch (e) {
      console.error(`Parse markmind Error: `, e)
    }
    return temp(tokens, idx, options, env, slf)
  }
}

export const renderMarkmap = () => {
  let list = document.querySelectorAll('svg.markmap')
  if (!list) {
    return
  }
  list.forEach(item => {
    try {
      const data = transform(parse(item.textContent));
      item.textContent = ''
      markmapr(item, data, {
        preset: 'colorful', // or default
        linkShape: 'diagonal' // or bracket
      })
    } catch (e) {
      console.error(`Parse markmap Error: ${e}`)
    }
  })
  list = null
}

export default markmap

