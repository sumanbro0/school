import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

interface EditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
}

const ContentEditor = ({ initialValue = "", onChange }: EditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(_, editor) => {
        editorRef.current = editor;
      }}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "visualblocks",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content) => {
        onChange?.(content);
      }}
    />
  );
};

export default ContentEditor;
