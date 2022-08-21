import React, { useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { StateField } from '@codemirror/state'
import type { EditorState } from '@codemirror/state'
import { showTooltip } from '@codemirror/view'
import type { Tooltip } from '@codemirror/view'

function getCursorTooltips(state: EditorState): readonly Tooltip[] {
  return state.selection.ranges
    .filter((range) => range.empty)
    .map((range) => {
      const line = state.doc.lineAt(range.head)
      const text = line.number + ':' + (range.head - line.from)
      return {
        pos: range.head,
        above: true,
        strictSide: true,
        arrow: true,
        create: () => {
          const dom = document.createElement('div')
          dom.className = 'cm-tooltip-cursor'
          dom.textContent = text
          return { dom }
        },
      }
    })
}

const cursorTooltipField = StateField.define<readonly Tooltip[]>({
  create: getCursorTooltips,

  update(tooltips, tr) {
    if (!tr.docChanged && !tr.selection) return tooltips
    return getCursorTooltips(tr.state)
  },

  provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
})

function App() {
  const codemirror = useRef<ReactCodeMirrorRef>(null)

  console.log({ codemirror })

  return (
    <div>
      <CodeMirror
        value="console.log('hello world!');"
        height="300px"
        extensions={[javascript({ jsx: true }), cursorTooltipField]}
        ref={codemirror}
      />
    </div>
  )
}

export default App
