// src/modules/dashboard/ProductosMasVendidosChart.js
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export const ProductosMasVendidosChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h3>Productos Más Vendidos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#ff6600" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
