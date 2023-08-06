// PasswordField.js
import { Button, Form } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PropTypes from "prop-types";
import { useState } from "react";

const PasswordField = ({
  label = "",
  name = "",
  register = "",
  errors = {},
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword((prevValue) => !prevValue);
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="input-group">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={`Enter `}
          name={name}
          {...register(name)}
          isInvalid={errors[name]}
          {...rest}
        />
        <Button
          className="input-group-btn btn btn-outline-primary"
          onClick={toggleVisibility}
          style={{
            backgroundColor: "white",
          }}
        >
          {showPassword ? (
            <AiFillEyeInvisible className="eye-icon" />
          ) : (
            <AiFillEye className="eye-icon" />
          )}
        </Button>
      </div>
      {errors[`${name}`] && (
        <Form.Control.Feedback type="invalid">
          {errors[`${name}`]?.message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default PasswordField;
