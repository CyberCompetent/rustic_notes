import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, BaseEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

// Define custom types
type CustomText = { text: string; bold?: boolean };
type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type CustomElement = ParagraphElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const TextEditor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // Initial content
  const [value, setValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // Custom render function for elements
  const renderElement = useCallback((props: any) => {
    const { attributes, children } = props;
    return <p {...attributes}>{children}</p>;
  }, []);

  // Custom render function for text (bold formatting)
  const renderLeaf = useCallback((props: any) => {
    const { attributes, children, leaf } = props;
    return leaf.bold ? <strong {...attributes}>{children}</strong> : <span {...attributes}>{children}</span>;
  }, []);

  // Toggle bold formatting
  const toggleBold = () => {
    const [match] = Editor.nodes(editor, {
      match: (n) => Text.isText(n) && n.bold === true,
      universal: true,
    });

    const isBold = !!match;
    Transforms.setNodes(
      editor,
      { bold: !isBold }, // Toggle bold
      { match: (n) => Text.isText(n), split: true }
    );
  };

  // Handle keyboard shortcuts
  const onKeyDown = (event: React.KeyboardEvent) => {
    // Allow default behavior for regular keys, including Enter and Backspace
    if (event.key === "Backspace" || event.key === "Delete" || event.key === "Enter") {
      return; // Allow default behavior
    }

    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      toggleBold();
    }
  };

  return (
    <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
      <Editable 
        renderElement={renderElement} 
        renderLeaf={renderLeaf} 
        onKeyDown={onKeyDown} 
        className="bg-gray-200 text-black focus:outline-none" // Added classes for background and text color
      />
    </Slate>
  );
};

export default TextEditor;
