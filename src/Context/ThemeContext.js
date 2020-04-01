import React, { useState, useLayoutEffect } from 'react';
import {darkTheme, lightTheme} from "../constants";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider (props) {
  const [dark, setDark] = useState(false);

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');

    if (lastTheme === 'true') {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    }
  }, [dark]);

  const applyTheme = theme => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  };

  const toggle = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.cssText = 'transition: background .5s ease';

    setDark(!dark);
    window.localStorage.setItem('darkTheme', !dark);
  };

  return (
      <ThemeContext.Provider value={{
        dark,
        toggle,
      }}>
        {props.children}
      </ThemeContext.Provider>
  )
}