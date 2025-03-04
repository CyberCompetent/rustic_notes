import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { Schema } from "prosemirror-model"; // Add this import
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history, undo, redo } from "prosemirror-history";
import { Selection } from "prosemirror-state";
import FloatingFormatMenu from "./TextEditor/FloatingFormatMenu"; // Import the FloatingFormatMenu

const ProseMirrorEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null); // Add state for editor view

  useEffect(() => {
    if (!editorRef.current) return;

    const customSchema = new Schema({
      nodes: basicSchema.spec.nodes,
      marks: {
        ...basicSchema.spec.marks,
        underline: {
          toDOM: () => ["u", 0], // Render as <u> element
          parseDOM: [{ tag: "u" }], // Parse <u> elements
        },
        size: {
          toDOM: () => ["span", { style: "font-size: 1.2em;" }, 0], // Example
          parseDOM: [{ tag: "span[style*='font-size']" }], // Example
        },
      },
    });

    const state = EditorState.create({
      schema: customSchema,
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap),
      ],
    });

    const view = new EditorView(editorRef.current, { state });
    viewRef.current = view; // Store the editor view in ref
    setEditorView(view); // Store the editor view in state

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && viewRef.current) {
        // Check if the click is inside the editor
        if (editorRef.current.contains(event.target as Node)) {
          // Prevent cursor movement when clicking inside the editor
          return;
        }
        if ((event.target as HTMLElement).closest(".floating-format-menu")) {
          // Prevent cursor movement when clicking inside the menu
          return;
        }

        const clickPosition = editorContainerRef.current?.getBoundingClientRect();
        const y = event.clientY - (clickPosition?.top ?? 0);

        // Use ProseMirror's method to find the position at the clicked y-coordinate
        const pos = viewRef.current.posAtCoords({ left: 0, top: y });

        // If pos is valid, use it directly
        if (pos) {
          const newSelection = Selection.near(viewRef.current.state.doc.resolve(pos.pos));
          viewRef.current.dispatch(viewRef.current.state.tr.setSelection(newSelection));
        } else {
          // Fallback logic if pos is invalid
          const lineHeight = 20; // Set your desired line height
          const lineIndex = Math.floor(y / lineHeight);

          // Get the document's block node positions
          const linePositions: number[] = []; // Explicitly type as an array of numbers
          let position = 0;

          // Iterate through the document's content
          viewRef.current.state.doc.forEach((node) => {
            if (node.isBlock) {
              position += node.nodeSize; // Increase position by the size of the node
              linePositions.push(position); // Store each line's position
            }
          });

          // Get the nearest line index based on the calculated positions
          let nearestLineIndex = Math.min(lineIndex, linePositions.length - 1);

          // If the click is near the last line, we might want to avoid going out of bounds
          if (lineIndex >= linePositions.length) {
            nearestLineIndex = linePositions.length - 1; // Stay within bounds
          }

          // Set resolved position to the nearest line position, plus one to adjust upward
          let resolvedPos = linePositions[nearestLineIndex] - 2; // Move one line higher

          // Create a new selection based on the resolved position
          const newSelection = Selection.near(viewRef.current.state.doc.resolve(resolvedPos));
          viewRef.current.dispatch(viewRef.current.state.tr.setSelection(newSelection));
        }

        viewRef.current.focus(); // Focus the view after moving the cursor
      }
    };

    const handleClickInside = () => {
      // Prevent cursor movement when clicking inside the editor
    };

    editorContainerRef.current?.addEventListener("click", handleClickOutside);
    editorRef.current?.addEventListener("click", handleClickInside);

    return () => {
      editorContainerRef.current?.removeEventListener("click", handleClickOutside);
      editorRef.current?.removeEventListener("click", handleClickInside);
    };
  }, []);

  return (
    <div ref={editorContainerRef} className="flex h-full flex-grow justify-center">
      {editorView && <FloatingFormatMenu editorView={editorView} />} {/* Only render if editorView exists */}
      <div
        ref={editorRef}
        className="text-black w-full max-w-4xl leading-[20px] h-[20px]"
      ></div>
    </div>
  );
};

export default ProseMirrorEditor;