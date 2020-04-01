import React, {useContext} from "react";
import ThemeContext from "../Context/ThemeContext";

import "./Switch.css"

export default function Switch () {
  const {toggle} = useContext(ThemeContext);

  return (
      <label className="switch switch-toolbar">
        <input type="checkbox"
               onChange={() => toggle()}/>
        <span className="slider round"/>
      </label>
  );
}