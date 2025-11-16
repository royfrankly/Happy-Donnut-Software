import React from 'react';
import './PaymentMethods.css';
import YapeIcon from '../../assets/payment/yape.svg';
import PlinIcon from '../../assets/payment/plin.svg';

const PaymentMethods = ({ selected, onChange }) => {
  // Opciones disponibles
  const methods = [
    { id: 'yape', label: 'Yape', icon: YapeIcon },
    { id: 'plin', label: 'Plin', icon: PlinIcon },
  ];

  return (
    <div className="payment-methods">
      <h4 className="payment-title">Método de pago</h4>
      <div className="payment-options">
        {methods.map(m => (
          <label key={m.id} className={`payment-option ${selected === m.id ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment-method"
              value={m.id}
              checked={selected === m.id}
              onChange={() => onChange(m.id)}
            />
            <img src={m.icon} alt={`${m.label} icon`} className="payment-icon" />
            <span className="payment-label">{m.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
