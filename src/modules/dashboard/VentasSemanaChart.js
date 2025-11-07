// src/modules/dashboard/VentasSemanaChart.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export const VentasSemanaChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h3>Ventas de la Semana</h3>
      {/* ResponsiveContainer hace que el gráfico se adapte al tamaño del div */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" /> {/* Asume que la data tiene { dia: 'Lun', ... } */}
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="ventas" 
            stroke="#ff6600" 
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
