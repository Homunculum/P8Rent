import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import FormikInput from '../FormikInput/FormikInput';
import { Button, Modal, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { UsersModel } from '../../models/responses/UsersModel';
import { AuthService } from '../../services/AuthService';
import './Register.css'

const Register: React.FC = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setShow(false);
        setError(null);
    };
    const handleShow = () => setShow(true);

    const initialValues: UsersModel = {
        name: '',
        surname: '',
        gsm: '',
        email: '',
        password: '',
        roles: ['{USER}'],
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ad alanı zorunludur.'),
        surname: Yup.string().required('Soyad alanı zorunludur.'),
        gsm: Yup.string().required('Telefon alanı zorunludur.'),
        email: Yup.string()
            .required('Email alanı zorunludur.')
            .email('Geçerli bir email adresi giriniz'),
        password: Yup.string()
            .required('Şifre alanı zorunludur.')
            .min(8, 'En az 8 haneli olmak zorunda'),
    });

    const handleRegisterClick = () => {
        handleShow();
    };

    const handleRegisterSubmit = async (values: UsersModel, actions: any) => {
        try {
            const response = await AuthService.register(values);
            console.log(response.data);
            handleClose();
            actions.setSubmitting(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Beklenmeyen bir hata oluştu.');
            }
            actions.setSubmitting(false);
        }
    };

    return (
        <>
            <button className='register' onClick={handleRegisterClick}>
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
                                <FormikInput type="text" label="Telefon" name="gsm" />
                                <FormikInput type="email" label="Email Adresi" name="email" />
                                <FormikInput type="password" label="Şifre" name="password" />
                                <Button  type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Register;
