import { useState, useEffect, useRef } from "react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { EditorView } from "prosemirror-view";
import { toggleMark } from "prosemirror-commands";
import { schema } from "prosemirror-schema-basic";
import ToggleComponent from "@/components/templates/toggle";

interface FloatingFormatMenuProps {
  editorView: EditorView; // Ensure editorView is not null
}

export default function FloatingFormatMenu({ editorView }: FloatingFormatMenuProps) {
  const [selectionCoords, setSelectionCoords] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    placement: "right",
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
  className="floating-format-menu absolute bg-white border rounded-lg shadow-lg p-2 flex space-x-2 justify-center content-center"
>
<div className="dropdown dropdown-start">
  <div tabIndex={0} role="button" className='btn bg-transparent border-none shadow-none text-black h-9'>Text<span className="material-icons">keyboard_arrow_down</span></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>Bullet list</a></li>
    <li><a>Number list</a></li>
    <li><a>To-do list</a></li>
    <li><a>Toggle list</a></li>
    <li><a>Heading 1</a></li>
    <li><a>Heading 2</a></li>
    <li><a>Heading 3</a></li>
    <li><a>Quote</a></li>
    <li><a>Block code</a></li>
    <li><a>Block equation</a></li>
    <li><a>Call out</a></li>




  </ul>
</div>
<ToggleComponent text="format_bold" applyMark={applyMark} mark="strong" />
<ToggleComponent text="format_italic" applyMark={applyMark} mark="em" />
<ToggleComponent text="format_underlined" applyMark={applyMark} mark="underline" />
<ToggleComponent text="strikethrough_s" applyMark={applyMark} mark="strike" />
<ToggleComponent text="code" applyMark={applyMark} mark="code" />
<ToggleComponent text="functions" applyMark={applyMark} mark="math" />
<ToggleComponent text="add_link" applyMark={applyMark} mark="link" />

</div>
  );
}