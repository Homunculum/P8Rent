import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthService } from "../../services/AuthService";

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
      const token = await AuthService.login(email, password);
      authContext.setIsAuthenticated(true);
      handleClose();
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Giriş Yap
      </Button>

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
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
