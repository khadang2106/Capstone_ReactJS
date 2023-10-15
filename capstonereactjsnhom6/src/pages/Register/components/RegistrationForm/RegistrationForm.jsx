import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP01',
    hoTen: '',
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="w-50 mx-auto">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            className="form-control"
            id="username"
            name="username"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="error-message"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </Form>
    </Formik>
  );
}
