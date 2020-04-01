import React, {useContext} from "react";
import ThemeContext from "../../Context/ThemeContext";

import {SOURCECODE_KEY} from "../../constants";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-twilight";


export default function Editor () {
  const {dark} = useContext(ThemeContext);

  function update(source) {
    localStorage.setItem(SOURCECODE_KEY, source);
  }

  return (
      <AceEditor
          mode="java"
          theme={dark ? "twilight" : "crimson_editor"}
          showPrintMargin={false}
          fontSize={22}
          width={"100%"}
          height={"100%"}
          onChange={update}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          editorProps={{$blockScrolling: true}}
          value={localStorage.getItem(SOURCECODE_KEY)}
      />
  );
}