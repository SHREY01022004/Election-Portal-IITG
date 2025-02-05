import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./TextEditor.module.css";
import { convertToHTML } from "draft-convert";
import convertFromHTML from "draft-convert/lib/convertFromHTML";
var parse = require("html-react-parser");

const TextEditor = (props) => {
  let currentContentAsHTML = "";
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  useState(() => {
    if (props.title) {
      setEditorState(
        EditorState.createWithContent(
          convertFromHTML(props?.candidate?.agenda_text[props.title])
        )
      );
    }
  }, [props.title]);

  const convertContentToHTML = () => {
    currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!props.title) {
      alert("Please add a title");
      return;
    }
    convertContentToHTML();
    const convertedString = parse(currentContentAsHTML);
    const data = {
      agenda_text: {
        ...props.candidate?.agenda_text,
        [`${props.title}`]: currentContentAsHTML,
      },
    };

    console.log("IYAT SAAAA after: ", data);

    props.updateNomination(data);
    props.setIsOld(false);
    props.setIsOpen(false);
    props.setTitle(null);
  };

  return (
    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={` ${styles.container} p-3 md:p-6 bg-white`}>
          <div className="flex pb-4 ">
            <h1 className="text-lg md:text-2xl"> Add New Agenda</h1>
            <button
              className={`ml-auto self-center ${styles.link}`}
              onClick={() => {
                props.setTitle(null);
                props.setIsOld(false);
                props.setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className={` ${styles.container} p-2`}>
            <div className="pb-2">
              <input
                type="text"
                placeholder="Title of the agenda point"
                className={` ${styles.input} p-2 w-full`}
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                disabled={props.isOld}
              />
              {props.isOld && (
                <p className="ml-1 text-sm text-blue-500">
                  Agenda title is not editable
                </p>
              )}
            </div>
            <div className={` ${styles.editor} p-2`}>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                placeholder="Describe the agenda point here..."
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    //"colorPicker",
                    //"link",
                    //"embedded",
                    "emoji",
                    //"image",
                    "remove",
                    "history",
                  ],
                }}
              />
            </div>
            <div className="flex flex-row-reverse p-2">
              <button
                className={` ${styles.button} px-11 py-2.5 font-semibold disabled disabled:bg-violet-100`}
                onClick={onSubmit}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
