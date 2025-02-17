"use client";
import {
  Image,
  List,
  Redo,
  Undo,
  ListOrdered,
  Link,
  Underline,
} from "lucide-react";
import type { Editor } from "@tiptap/react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
} from "lucide-react";
import { Toggle } from "./toggle";
import { useCallback, useRef, useState } from "react";

export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const { from, to } = editor.state.selection;
  const text = editor.state.doc.textBetween(from, to, " ");

  const onSetLink = useCallback(() => {
    const url = window.prompt("Masukkan URL:");
    const text = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    if (url) {
      // Jika tidak ada teks yang dipilih, gunakan URL sebagai teks
      const linkText = text || url;

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .insertContent({
          type: "text",
          text: linkText,
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                target: "_blank", // Opsional: buka di tab baru
              },
            },
          ],
        })
        .run();
    }
  }, [editor]);
  const addImage = () => {
    const url = window.prompt("Masukkan URL gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      for (const file of Array.from(files)) {
        const imageUrl = URL.createObjectURL(file); // Buat URL dari file
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      }

      // Reset input file agar bisa memilih gambar yang sama lagi
      e.target.value = "";
    },
    [editor]
  );

  const options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().setUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.can().undo(),
    },
    {
      icon: <Redo className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.can().redo(),
    },
    { icon: <Upload className="size-4" />, onClick: addImage, pressed: false },
    {
      icon: <Image className="size-4" />,
      onClick: handleClick,
      pressed: false,
    },
    { icon: <Link className="size-4" />, onClick: onSetLink, pressed: false },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1  space-x-1 sticky bg-card top-20 z-50 flex flex-wrap gap-1">
      {options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFile}
        accept="image/*"
        multiple
      />
    </div>
  );
}
