"use client";
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({
                placeholder: 'Write your blog content here...',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return <div>Loading editor...</div>;

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-2 flex gap-2 flex-wrap border-b">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                >
                    List
                </button>
                <button
                    onClick={() => {
                        const url = window.prompt('Enter image URL');
                        if (url) editor.chain().focus().setImage({ src: url }).run();
                    }}
                    className="px-2 py-1 rounded hover:bg-gray-200"
                >
                    Add Image
                </button>
            </div>
            <EditorContent editor={editor} className="prose max-w-none p-4 min-h-75" />
        </div>
    );
};

export default RichTextEditor;