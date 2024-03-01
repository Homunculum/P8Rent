import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthService } from "../../services/AuthService";
import './Login.css'
import Register from "../Register/Register"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const authContext: any = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email alanı zorunludur.")
      .min(3, "Başlık alanı en az 3 karakter olmalıdır.")
      .max(50)
      .email("Geçerli bir Email adresi giriniz"),
    password: Yup.string()
      .required("Şifre alanı zorunludur.")
      .min(8, "En az 8 haneli olmak zorunda"),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { email, password } = values;
      const { accessToken, id } = await AuthService.login(email, password);
      authContext.setIsAuthenticated(true, id);
      handleClose();
      actions.setSubmitting(false);
      toast.success('Giriş başarıyla tamamlandı!', {
        position: 'top-right',
        autoClose: 3000,
       
    });
    } catch (error) {
      toast.error('Hatalı bilgiler', {
        position: 'top-right',
        autoClose: 3000,
       
    });
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <button className="login btn" onClick={handleShow}>
        Giriş Yap
      </button>

       

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Giriş Yap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput type="email" label="Email Adresi" name="email" />
                <FormikInput type="password" label="Şifre" name="password" />
                <button className="login btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
                <button className="register btn" type="submit">
                <Register />
                </button>
                
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Login;