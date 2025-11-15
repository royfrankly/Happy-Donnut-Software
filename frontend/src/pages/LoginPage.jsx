import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Header from '../components//Header/Header';



function LoginPage() {
  return (
    <>
   <div>
      <Header/>
   </div>
    <div className="login-container">
       
      <div className="box">
        <h1 className="title">Iniciar Sesión</h1>
        <LoginForm />
      </div>
      <div className="box">
        <h1 className="title">Registrarse</h1>
        <RegisterForm />
      </div>
    </div>
    </>
  );
}

export default LoginPage;
