// src/modules/dashboard/StatsCard.js
import './Dashboard.css';
// Necesitarás una librería de iconos, por ejemplo: react-icons
// (Instálala con: npm install react-icons)

export const StatsCard = ({ title, value, change, icon }) => {
  // El prop 'icon' será el componente del icono, ej: <FaDollarSign />
  return (
    <div className="stats-card">
      <div className="stats-card-info">
        <span className="stats-card-title">{title}</span>
        <span className="stats-card-value">{value}</span>
        <span className="stats-card-change">{change}</span>
      </div>
      <div className="stats-card-icon">
        {icon}
      </div>
    </div>
  );
};
