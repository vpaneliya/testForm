import { Button, Container, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "react-phone-number-input";
import {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormField from "../common/commonFormField/commonFormField.component";
import PasswordField from "../common/commonPasswordField/commonPasswordField.component";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX =
  /^(?=.*[a-z](.*[a-z]){2,})(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=]).{8,24}$/;

/**
 * Renders a registration form with input fields for first name, last name, username, email address, password, confirm password, address, and phone number.
 *
 * @param {object} data - The form data submitted by the user.
 * @return {void}
 */

const Register = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required("Required").trim().min(3, "Too Short"),
    lastName: yup.string().required("Required").trim().min(3, "Too Short"),
    userName: yup
      .string()
      .required("Required")
      .trim()
      .test("validUsername", "User name not valid", (value) => {
        return USER_REGEX.test(value);
      }),
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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    address: yup
      .string()
      .required("Address is required")
      .trim()
      .min(10, "Too Short"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test(
        "validPhoneNumber",
        "Invalid phone number",
        (value) => isValidPhoneNumber(value) && isPossiblePhoneNumber(value)
      ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
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
        {/* First name */}
        <FormField
          label="First Name"
          name="firstName"
          placeholder="Enter First Name"
          register={register}
          errors={errors}
          type="text"
        />

        {/* Last name */}
        <FormField
          label="Last Name"
          name="lastName"
          placeholder="Enter Last Name"
          register={register}
          errors={errors}
          type="text"
        />

        {/* Username */}
        <FormField
          label="Username"
          name="userName"
          placeholder="Enter username"
          register={register}
          errors={errors}
          type="text"
        />

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

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-Enter Password"
          register={register}
          errors={errors}
        />

        {/* Address */}
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Address"
            name="address"
            {...register("address")}
            isInvalid={errors.address}
          />
          {errors.address && (
            <Form.Control.Feedback type="invalid">
              {errors.address.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Phone Number */}
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                defaultCountry="IN"
                placeholder="Enter Phone Number"
                inputStyle={{ width: "100%" }}
                isInvalid={!!errors.phoneNumber}
                addInternationalOption={false}
                onChange={(value) => field.onChange(value)}
                onBlur={() => field.onBlur()}
                international
                limitMaxLength
                countryCallingCodeEditable={false}
              />
            )}
          />
          {errors.phoneNumber && (
            <Form.Text className="text-danger">
              {errors.phoneNumber.message}
            </Form.Text>
          )}
        </Form.Group>

        {/** Submit */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
