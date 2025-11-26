// src/components/auth/LoginModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { MailIcon, LockIcon, UserIcon } from '../../utils/icons';
import Button from '../ui/Button';

export default function LoginModal({ 
  isOpen, 
  onClose, 
  loginForm, 
  setLoginForm, 
  showLogin, 
  setShowLogin,
  handleLogin 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-500">Happy Donut</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Login */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-orange-500 mb-4">Bienvenido de Nuevo</h3>
            <p className="text-gray-600 mb-6">Inicia sesión para continuar</p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Correo Electrónico</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="tu@email.com"
                    required
                  />
                  <MailIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="••••••••"
                    required
                  />
                  <LockIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-700">Recordarme</label>
                <a href="#" className="ml-auto text-orange-500 hover:text-orange-600">¿Olvidaste tu contraseña?</a>
              </div>
              <Button type="submit" className="w-full">Iniciar Sesión</Button>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <button 
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Register */}
          <div className={`${showLogin ? 'hidden' : 'block'} bg-white p-6 rounded-lg`}>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Crear Cuenta</h3>
            <p className="text-gray-600 mb-6">Únete a la familia Happy Donut</p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nombre Completo</label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="Juan Pérez"
                  />
                  <UserIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Correo Electrónico</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="tu@email.com"
                    required
                  />
                  <MailIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="••••••••"
                    required
                  />
                  <LockIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginForm.confirmPassword}
                    onChange={(e) => setLoginForm({...loginForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                    placeholder="••••••••"
                    required
                  />
                  <LockIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-gray-700">Acepto los términos y condiciones</label>
              </div>
              <Button type="submit" className="w-full">Crear Cuenta</Button>
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <button 
                    type="button"
                    onClick={() => setShowLogin(true)}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    Inicia sesión
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}