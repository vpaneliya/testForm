import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "react-phone-number-input";
import FormField from "../common/commonFormField/commonFormField.component";
import PasswordField from "../common/commonPasswordField/commonPasswordField.component";

const PWD_REGEX =
  /^(?=.*[a-z](.*[a-z]){2,})(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=]).{8,24}$/;

/**
 * Generates the login form.
 *
 * @return {React.Node} The rendered login form.
 */

const Login = () => {
  const schema = yup.object().shape({
    emailAddress: yup
      .string()
      .required("Required")
      .trim()
      .email("Invalid Email"),
    password: yup
      .string()
      .required("Required")
      .test(
        "validPassword",
        "Password must contain at least one number, uppercase character, 3 lowercase characters, and one special character !@#$%^&*+=",
        (value) => {
          return PWD_REGEX.test(value);
        }
      ),
  });

  const initialValues = {
    emailAddress: "",
    password: "",
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = (data) => {
    console.log("HandleSubmit", data);
  };

  const handleFormError = (error) => {
    console.log("HandleError", error);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
        {/* Email Address */}
        <FormField
          label="Email"
          name="emailAddress"
          placeholder="Enter Email Address"
          register={register}
          errors={errors}
          type="email"
        />

        {/* Password */}
        <PasswordField
          label="Password"
          name="password"
          placeholder="Enter Password"
          register={register}
          errors={errors}
        />

        {/** Submit */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
