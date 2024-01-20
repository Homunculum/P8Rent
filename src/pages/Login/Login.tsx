import React, { useContext, useState } from "react";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

type Props = {};

const Login = (props: Props) => {
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
			  onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				authContext.setIsAuthenticated(true);
				handleClose();
				// Assuming autocontex is a state in AuthContext
				authContext.setAutocontex(true);
				setSubmitting(false);
			  }}
			>
			  <Form>
				<FormikInput type="email" label="Email Adresi" name="email" />
				<FormikInput type="password" label="Şifre" name="password" />
				<Button variant="primary" type="submit">
				  Giriş Yap
				</Button>
			  </Form>
			</Formik>
		  </Modal.Body>
		</Modal>
	  </>
	);
  };
export default Login;
