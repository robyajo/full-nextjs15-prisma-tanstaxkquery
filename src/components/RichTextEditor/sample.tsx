"use client";
import { Image, List, Redo, Undo, ListOrdered, Link } from "lucide-react";
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
import { useCallback, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ToolBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            label: "Heading 1",
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            label: "Heading 2",
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            label: "Heading 3",
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            label: "Bold",
            action: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4" />,
            label: "Italic",
            action: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className="size-4" />,
            label: "Strikethrough",
            action: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className="size-4" />,
            label: "Align Left",
            action: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            label: "Align Center",
            action: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <AlignRight className="size-4" />,
            label: "Align Right",
            action: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <List className="size-4" />,
            label: "Bullet List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4" />,
            label: "Ordered List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <Code className="size-4" />,
            label: "Code Block",
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            pressed: editor.isActive("code"),
        },
        {
            icon: <Highlighter className="size-4" />,
            label: "Highlight",
            action: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
        {
            icon: <Undo className="size-4" />,
            label: "Undo",
            action: () => editor.chain().focus().undo().run(),
            pressed: editor.can().undo(),
        },
        {
            icon: <Redo className="size-4" />,
            label: "Redo",
            action: () => editor.chain().focus().redo().run(),
            pressed: editor.can().redo(),
        },
        {
            icon: <Upload className="size-4" />,
            label: "Upload Image URL", action: addImage, pressed: false
        },
        {
            icon: <Image className="size-4" />,
            label: "Add Image Device", action: handleClick, pressed: false
        },
        {
            icon: <Link className="size-4" />,
            label: "Add Link", action: handleClick, pressed: false
        },
    ];

    return (
        <TooltipProvider>
            <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50 flex flex-wrap gap-1">
                {options.map((option, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger asChild>
                            <Toggle
                                size="sm"
                                pressed={option.pressed}
                                onPressedChange={option.action}
                            >
                                {option.icon}
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            {option.label} {/* Menampilkan teks tooltip */}
                        </TooltipContent>
                    </Tooltip>
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
        </TooltipProvider>
    );
}
