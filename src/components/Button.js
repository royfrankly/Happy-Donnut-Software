// src/components/Button/Button.js
import React from 'react';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger'
  size = 'medium',     // 'small' | 'medium' | 'large'
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn--${variant}`;
  const sizeClasses = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';

  const fullClassName = [
    baseClasses,
    variantClasses,
    sizeClasses,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={fullClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;