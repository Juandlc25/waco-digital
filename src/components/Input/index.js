import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Input({ value, onChange, type, Icon, placeholder }) {
  return (
    <div className="input">
      <Icon style={{ color: "lightgray" }} />
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  Icon: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

Input.defaultProps = {
  value: undefined,
};

export default Input;
