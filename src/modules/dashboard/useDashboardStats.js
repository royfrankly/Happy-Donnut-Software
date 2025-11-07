// src/modules/dashboard/useDashboardStats.js
import { useState, useEffect } from 'react';
// Asumimos que tienes un 'api.js' en services como en el ejemplo anterior
import { api } from '../../services/api'; 

export const useDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Lo ideal es que tu API tenga un solo endpoint 
        // que devuelva todo el resumen del dashboard.
        const response = await api.get('/dashboard/summary');
        
        // El 'response.data' podría verse así:
        // {
        //   ventasDia: { total: 6524.00, porcentaje: 12.5 },
        //   comprobantes: { total: 87, nuevos: 5 },
        //   productos: { total: 538, unidadesHoy: 120 },
        //   clientes: { total: 245, nuevosEsteMes: 18 },
        //   ventasSemana: [ { dia: 'Lun', ventas: 4000 }, ... ],
        //   productosMasVendidos: [ { nombre: 'Dona', total: 150 }, ... ]
        // }
        setStats(response.data);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // El array vacío asegura que solo se ejecute 1 vez

  return { stats, loading, error };
};
