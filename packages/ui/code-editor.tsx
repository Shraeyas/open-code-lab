import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
interface CodeEditorProps {
  editorRef?: React.RefObject<monaco.editor.IStandaloneCodeEditor> | null;
  code: string;
  setCode?: (value: string) => void;
  readOnly?: boolean;
}
export const CodeEditor: React.FC<CodeEditorProps> = ({
  editorRef = null,
  code,
  setCode = null,
  readOnly = false,
}) => {
  function handleEditorDidMount(editor: any) {
    // if(editorRef) {
    //     editorRef.current = editor;
    // }
  }
  const options: monaco.editor.IEditorConstructionOptions = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: false,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: readOnly,
    cursorStyle: "line",
    automaticLayout: true,
  };
  const onChange = (e: any) => {
    if (setCode) {
      setCode(e.target.value);
    }
  };
  return (
    <>
      <div>
        <Editor
          height="70vh"
          defaultLanguage="cpp"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
          theme={"vs-dark"}
          value={code}
          onChange={onChange}
          options={options}
        />
      </div>
    </>
  );
};
