import React from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

interface BlockNoteEditorProps {
  // You can add any necessary props for customization here
}

const BlockNoteEditor: React.FC<BlockNoteEditorProps> = (props) => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({});
  
  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} {...props} />;
};

export default BlockNoteEditor;
