// src/components/Input/Input.js
import React from 'react';

const Input = React.forwardRef(({
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
      className={`input-field ${className}`}
      {...props}
    />
  );
});

export default Input;