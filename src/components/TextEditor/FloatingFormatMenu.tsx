import { useState, useEffect, useRef } from "react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { EditorView } from "prosemirror-view";
import { toggleMark } from "prosemirror-commands";
import { schema } from "prosemirror-schema-basic";

interface FloatingFormatMenuProps {
  editorView: EditorView; // Ensure editorView is not null
}

export default function FloatingFormatMenu({ editorView }: FloatingFormatMenuProps) {
  const [selectionCoords, setSelectionCoords] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    placement: "top",
    middleware: [offset(-35), flip(), shift()],
  });

  useEffect(() => {
    function handleSelection() {
      const { state } = editorView;
      const { selection } = state;

      if (selection.empty) {
        setSelectionCoords(null);
        return;
      }

      const start = editorView.coordsAtPos(selection.from);
      const end = editorView.coordsAtPos(selection.to);

      const top = Math.min(start.top, end.top) - 40; // Adjust if necessary
      const left = (start.left + end.left) / 2;

      setSelectionCoords({ top, left });

      refs.setReference({
        getBoundingClientRect: () => ({
          top,
          left,
          width: 0,
          height: 0,
          right: left,
          bottom: top,
        }),
      } as any);

      update();
    }

    editorView.dom.addEventListener("mouseup", handleSelection);
    return () => editorView.dom.removeEventListener("mouseup", handleSelection);
  }, [editorView, refs, update]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSelectionCoords(null); // Close the menu if the click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!selectionCoords) return null; // Only render the menu if there are selection coordinates

  const applyMark = (mark: string) => {
    const { state, dispatch } = editorView;
    const markType = schema.marks[mark];

    if (markType) {
      toggleMark(markType)(state, dispatch);
      editorView.focus(); // Refocus the editor after applying the mark
    }
  };

  return (
<div
  ref={(el) => {
    refs.setFloating(el);
    if (menuRef) menuRef.current = el;
  }}
  style={{ ...floatingStyles, zIndex: 1000 }} // Ensure the menu is on top
  className="floating-format-menu absolute bg-white border rounded-lg shadow-lg p-2 flex space-x-2"
>

  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("strong");
    }}
  >
  format_bold
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("em");
    }}
  >
    format_italic
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("underline");
    }}
  >
    format_underlined
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("strike");
    }}
  >
    strikethrough_s
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("code");
    }}
  >
  code
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      applyMark("math");
    }}
  >
    functions
  </button>
  <button
    className="p-1 text-gray-600 hover:text-black material-icons"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = prompt("Enter URL:");
      if (url) applyMark("link", url);
    }}
  >
    add_link
  </button>
</div>
  );
}