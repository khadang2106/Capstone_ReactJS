import React from 'react';
import './register-style.scss';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

export default function Register() {
  return (
    <div className="register container">
      <h2>Registration</h2>
      <RegistrationForm />
    </div>
  );
}
