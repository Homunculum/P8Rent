import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import './Contact.css'


type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const initialValues: FormData = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("İsim zorunlu."),
    email: Yup.string().email("Geçerli bir email adresi giriniz.").required("Email zorunlu."),
    message: Yup.string().min(50, "Mesaj en az 50 karakter olmalıdır.").required("Mesaj zorunlu."),
  });

  const handleSubmit = (values: FormData) => {
    console.log("Form submitted with values:", values);
    
  };

  return (
    <div className="container">
      <h1>Contact Form</h1>
      <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
          <FormikInput label="İsim" name="name" />
          <FormikInput label="Email" name="email" />
          <div className="message">
            <label className="form-label">Mesaj</label>
            <Field
              name="message"
              as="textarea" 
              className="form-control" 
            />
            <ErrorMessage name="message" component="div" className="text-danger" />
          </div>
          <button type="submit">Gönder</button>
        </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
