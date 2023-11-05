import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
export const CodeEditor = ({ editorRef=null, code, setCode=null, readOnly=false }) => {
    function handleEditorDidMount(editor: any, monaco: Monaco) {
        if(editorRef) {
            editorRef.current = editor;
        }
    }
    const options = {
        autoIndent: 'full',
        contextmenu: true,
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 24,
        hideCursorInOverviewRuler: true,
        matchBrackets: 'always',
        minimap: {
          enabled: false,
        },
        scrollbar: {
          horizontalSliderSize: 4,
          verticalSliderSize: 18,
        },
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: {readOnly},
        cursorStyle: 'line',
        automaticLayout: true,
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
                    onChange={setCode}
                    options={options}
                />
            </div>
        </>
    );
}