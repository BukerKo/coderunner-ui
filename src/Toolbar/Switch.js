import React, {useContext} from "react";
import ThemeContext from "../Context/ThemeContext";

import "./Switch.css"

export default function Switch () {
  const {toggle, dark} = useContext(ThemeContext);

  return (
      <label className="switch switch-toolbar">
        <input type="checkbox"
               onChange={() => toggle()}
               checked={dark}/>
        <span className="moon round"/>
      </label>
  );
}