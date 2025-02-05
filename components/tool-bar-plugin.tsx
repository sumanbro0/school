// components/ToolbarPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { FORMAT_TEXT_COMMAND } from "lexical";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatList = (format: "ul" | "ol") => {
    if (format === "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  return (
    <div className="flex gap-2 p-2 border-b mb-2">
      <button
        className="p-2 border rounded hover:bg-gray-100"
        onClick={() => formatText("bold")}
      >
        Bold
      </button>
      <button
        className="p-2 border rounded hover:bg-gray-100"
        onClick={() => formatText("italic")}
      >
        Italic
      </button>
      <button
        className="p-2 border rounded hover:bg-gray-100"
        onClick={() => formatText("underline")}
      >
        Underline
      </button>
      <button
        className="p-2 border rounded hover:bg-gray-100"
        onClick={() => formatList("ul")}
      >
        Bullet List
      </button>
      <button
        className="p-2 border rounded hover:bg-gray-100"
        onClick={() => formatList("ol")}
      >
        Numbered List
      </button>
    </div>
  );
}
