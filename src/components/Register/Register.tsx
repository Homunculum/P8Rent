import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button, Modal, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { UsersModel } from "../../models/responses/UsersModel";
import { AuthService } from "../../services/AuthService";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
  };
  const handleShow = () => setShow(true);

  const initialValues: UsersModel = {
    name: "",
    surname: "",
    gsm: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: ["{USER}"],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    surname: Yup.string().required("Surname is required."),
    gsm: Yup.string()
      .required("Phone number is required.")
      .min(10, "Please enter a 10-digit number without leading zeros."),

    email: Yup.string()
      .required("Email is required.")
      .email("Please enter a valid email address."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("Please confirm your password."),
  });

  const handleRegisterClick = () => {
    handleShow();
  };

  const handleRegisterSubmit = async (values: UsersModel, actions: any) => {
    try {
      const response = await AuthService.register(values);
      console.log(response.data);
      handleClose();
      toast.success("Registration completed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      actions.setSubmitting(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <button className="register" onClick={handleRegisterClick}>
        Register
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <FormikInput type="text" label="Name" name="name" />
                <FormikInput type="text" label="Surname" name="surname" />
                <FormikInput type="text" label="Phone" name="gsm" />
                <FormikInput type="email" label="Email Address" name="email" />
                <FormikInput type="password" label="Password" name="password" />
                <FormikInput type="password" label="Confirm Password" name="confirmPassword" />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Register;
