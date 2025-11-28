import React, { useState, useEffect } from 'react';

const HealthCheck = () => {
  const [status, setStatus] = useState('Verificando conexión...');

  useEffect(() => {
    // Petición al endpoint que acabas de crear en Laravel
    // Nota: Si usas Docker, asegúrate que el puerto 8000 sea el correcto
    fetch('http://localhost:8080/api/health')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta');
        }
        return response.json();
      })
      .then(data => setStatus(data.status))
      .catch(error => setStatus('Error: No se pudo conectar al backend'));
  }, []);

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', marginTop: '20px', borderRadius: '5px' }}>
      <h3>Diagnóstico del Sistema:</h3>
      <p style={{ fontWeight: 'bold', color: status.includes('Conectado') ? 'green' : 'red' }}>
        {status}
      </p>
    </div>
  );
};

export default HealthCheck;