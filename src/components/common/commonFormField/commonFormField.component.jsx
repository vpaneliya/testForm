import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const FormField = ({
  label = "",
  name = "",
  placeholder = "",
  register = "",
  errors = {},
  type = "text",
  ...rest
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        {...register(name)}
        isInvalid={errors[name]}
        {...rest}
      />
      {errors[name] && (
        <Form.Control.Feedback type="invalid">
          {errors[name].message}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string,
};

export default FormField;
