"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { common, createLowlight } from "lowlight";
import {
  DocumentTextIcon,
  CodeBracketIcon,
  LinkIcon,
  PhotoIcon,
  ListBulletIcon,
  QueueListIcon,
  ChatBubbleLeftIcon,
  BoldIcon,
  ItalicIcon,
  HashtagIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  XMarkIcon,
  MinusIcon,
  StrikethroughIcon,
  PencilIcon,
  ArrowPathIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({
  editor,
  onImageUpload,
}: {
  editor: any;
  onImageUpload: (file: File) => void;
}) => {
  if (!editor) {
    return null;
  }

  const buttonClass = (isActive: boolean) => `
    p-2 rounded-md transition-colors
    ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
    }
  `;

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50 sticky top-0 z-10">
      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            className={buttonClass(editor.isActive("heading", { level }))}
            title={`Heading ${level}`}
            type="button"
          >
            <span className="font-bold text-base">H{level}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
          type="button"
        >
          <BoldIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
          type="button"
        >
          <ItalicIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive("underline"))}
          title="Underline (Ctrl+U)"
          type="button"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={buttonClass(editor.isActive("strike"))}
          title="Strikethrough (Ctrl+Shift+S)"
          type="button"
        >
          <StrikethroughIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
          title="Bullet List"
          type="button"
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
          title="Numbered List"
          type="button"
        >
          <QueueListIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
          title="Blockquote"
          type="button"
        >
          <ChatBubbleLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buttonClass(editor.isActive("codeBlock"))}
          title="Code Block"
          type="button"
        >
          <CodeBracketIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={buttonClass(false)}
          title="Horizontal Rule"
          type="button"
        >
          <MinusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <button
          onClick={() => {
            const url = window.prompt("Enter the URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={buttonClass(editor.isActive("link"))}
          title="Add Link"
          type="button"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Enter the image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className={buttonClass(false)}
          title="Add Image by URL"
          type="button"
        >
          <PhotoIcon className="w-5 h-5" />
        </button>
        <label
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 cursor-pointer"
          title="Upload Image"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onImageUpload(e.target.files[0]);
              }
            }}
          />
        </label>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-2">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={buttonClass(editor.isActive({ textAlign: "left" }))}
          title="Align Left"
          type="button"
        >
          <Bars3BottomLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={buttonClass(editor.isActive({ textAlign: "center" }))}
          title="Align Center"
          type="button"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={buttonClass(editor.isActive({ textAlign: "right" }))}
          title="Align Right"
          type="button"
        >
          <Bars3BottomRightIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={buttonClass(editor.isActive({ textAlign: "justify" }))}
          title="Justify"
          type="button"
        >
          <Bars4Icon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={buttonClass(false)}
          title="Undo (Ctrl+Z)"
          type="button"
        >
          <ArrowUturnLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={buttonClass(false)}
          title="Redo (Ctrl+Y)"
          type="button"
        >
          <ArrowUturnRightIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          className={buttonClass(false)}
          title="Clear Formatting"
          type="button"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  console.log("content", content);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        editor?.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Heading.configure({ levels: [1, 2, 3] }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-blue-600 hover:text-blue-800 underline",
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: "rounded-lg max-w-full",
          },
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        Placeholder.configure({
          placeholder: "Start writing your blog post...",
        }),
        Underline,
        Strike,
        HorizontalRule,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: content || "",
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
        },
      },
    },
    []
  );

  useEffect(() => {
    if (editor && content) {
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-40 flex justify-center w-full">
        <div className="" style={{ minHeight: 48 }}>
          <MenuBar editor={editor} onImageUpload={handleImageUpload} />
        </div>
      </div>
      <div
        className="tiptap-content bg-white rounded-xl p-8 sm:p-10 min-h-[350px]  mx-auto  mb-8 transition focus-within:shadow-lg focus-within:border-blue-300"
        style={{ fontFamily: "inherit", fontSize: "1.1rem", lineHeight: 1.7 }}
      >
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .tiptap-content h1 {
          font-size: 2.25rem !important;
          font-weight: bold;
          margin: 0.75rem 0 0.5rem 0;
        }
        .tiptap-content h2 {
          font-size: 1.5rem !important;
          font-weight: bold;
          margin: 0.5rem 0 0.4rem 0;
        }
        .tiptap-content h3 {
          font-size: 1.25rem !important;
          font-weight: bold;
          margin: 0.4rem 0 0.3rem 0;
        }
        .tiptap-content ul {
          list-style-type: disc !important;
          padding-left: 2em;
        }
        .tiptap-content ol {
          list-style-type: decimal !important;
          padding-left: 2em;
        }
        .tiptap-content li {
          margin-bottom: 0.25rem;
        }
        .tiptap-content li > p {
          margin: 0 !important;
          display: inline;
        }
      `}</style>
    </div>
  );
}

export default RichTextEditor;
