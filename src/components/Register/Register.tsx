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
    roles: ["{USER}"],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Ad alanı zorunludur."),
    surname: Yup.string().required("Soyad alanı zorunludur."),
    gsm: Yup.number().required("Telefon alanı zorunludur.")
    .min(10, "Başında 0 olmadan 10 haneli olarak giriniz"),
    
    email: Yup.string()
      .required("Email alanı zorunludur.")
      .email("Geçerli bir email adresi giriniz"),
    password: Yup.string()
      .required("Şifre alanı zorunludur.")
      .min(8, "En az 8 haneli olmak zorunda"),
  });

  const handleRegisterClick = () => {
    handleShow();
  };

  const handleRegisterSubmit = async (values: UsersModel, actions: any) => {
    try {
        const response = await AuthService.register(values);
        console.log(response.data);
        handleClose();
        toast.success('Kayıt başarıyla tamamlandı!', {
            position: 'top-right',
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
        Kayıt Ol
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kayıt Ol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput type="text" label="Ad" name="name" />
                <FormikInput type="text" label="Soyad" name="surname" />
                <FormikInput type="number" label="Telefon" name="gsm" />
                <FormikInput type="email" label="Email Adresi" name="email" />
                <FormikInput type="password" label="Şifre" name="password" />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
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
