import React from "react";
import "./style.css";
import PropTypes from "prop-types";

function ErrorNot({ msg, clear }) {
  return (
    <div className="errorNot">
      <span>{msg}</span>
      <button className="errorNot__btn" onClick={clear}>
        X
      </button>
    </div>
  );
}

ErrorNot.propTypes = {
  clear: PropTypes.func.isRequired,
  msg: PropTypes.string.isRequired,
};

export default ErrorNot;
