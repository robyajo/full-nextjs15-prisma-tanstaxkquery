import * as React from 'react'
import type { Editor } from '@tiptap/react'
import type { VariantProps } from 'class-variance-authority'
import { Toggle } from "./toggle";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Link2Icon } from '@radix-ui/react-icons'

interface LinkEditPopoverProps extends VariantProps<typeof Toggle> {
  editor: Editor
}

const LinkEditPopover = ({ editor, size, variant }: LinkEditPopoverProps) => {
  const [open, setOpen] = React.useState(false)

  const { from, to } = editor.state.selection
  const text = editor.state.doc.textBetween(from, to, ' ')

  const onSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: openInNewTab ? '_blank' : ''
              }
            }
          ]
        })
        .setLink({ href: url })
        .run()

      editor.commands.enter()
    },
    [editor]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>

        <Link2Icon className="size-5" />
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80" align="end" side="bottom">
        scscz
      </PopoverContent>
    </Popover>
  )
}

export { LinkEditPopover }
