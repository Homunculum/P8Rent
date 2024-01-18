import React, { useContext } from 'react'
import { object, string } from 'yup';
import { Form, Formik } from 'formik';
import FormikInput from '../../components/FormikInput/FormikInput';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
	const authContext:any = useContext(AuthContext);
	const initialValues = {
		email: "",
		
		password: "",
		stock: 0,
	};

	const validationSchema = object({
		email: string()
			.required("Email alanı zorunludur.")
			.min(3, "Başlık alanı en az 3 karakter olmalıdır.")
			.max(50).email("Geçerli bir Email adresi giriniz"),
		password: string().required("Şifre alanı zorunludur.").min(8,"En az 8 haneli olmak zorunda"),
		
	});

	return (
		<div className="container mt-5">
			<Formik 
			initialValues={initialValues}
			onSubmit={values => {
				console.log(values);
				}}
				validationSchema={validationSchema}
				>
					
			<Form>
					<FormikInput type="email" label={'Email Adresi'} name={'email'}/>
				
					<FormikInput type="password" label={'Şifre'} name={'password'}/>
				
				<div className="mb-3 mr-1 form-check">
					<input
						type="checkbox" />
					<label className="form-check-label">Check me out</label>
				</div>
				
				<Link onClick={()=> {authContext.setIsAuthenticated(true)}} to={`/`} className="btn btn-primary" role="button">
                        Giriş Yap
            </Link>
			</Form>
			
			</Formik>
		</div>
	);
};
export default Login