import React from "react";
import "components/Button.scss";

const classNames = require('classnames');

export default function Button(props) {
   const { confirm, danger, onClick, disabled, children } = props;
   const buttonClass = classNames(
      'button',
      { ' button--confirm': confirm },
      { ' button--danger': danger }
   );

   return (
      <button
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
}