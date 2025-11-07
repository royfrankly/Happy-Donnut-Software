// src/modules/dashboard/Dashboard.js
import { useDashboardStats } from './useDashboardStats';
import { StatsCard } from './StatsCard';
import { VentasSemanaChart } from './VentasSemanaChart';
import { ProductosMasVendidosChart } from './ProductosMasVendidosChart';
import './Dashboard.css';

// Importamos los iconos que usaremos
import { FaDollarSign, FaReceipt, FaBox, FaUsers } from 'react-icons/fa';

export const Dashboard = () => {
  // 1. Llamamos al hook para obtener los datos
  const { stats, loading, error } = useDashboardStats();

  // 2. Manejamos los estados de carga y error
  if (loading) {
    return <div>Cargando resumen del negocio...</div>;
  }
  if (error) {
    return <div>Error al cargar el dashboard: {error.message}</div>;
  }
  if (!stats) {
    return <div>No hay datos disponibles.</div>;
  }

  // 3. Renderizamos el dashboard cuando ya tenemos los datos
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Resumen general del negocio</p>

      {/* Fila de Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <StatsCard
          title="Ventas del Día"
          value={`S/ ${stats.ventasDia.total.toFixed(2)}`}
          change={`+${stats.ventasDia.porcentaje}% desde ayer`}
          icon={<FaDollarSign />}
        />
        <StatsCard
          title="Comprobantes Emitidos"
          value={stats.comprobantes.total}
          change={`${stats.comprobantes.nuevos} Hoy`}
          icon={<FaReceipt />}
        />
        <StatsCard
          title="Productos Vendidos"
          value={stats.productos.total}
          change={`${stats.productos.unidadesHoy} Unidades hoy`}
          icon={<FaBox />}
        />
        <StatsCard
          title="Clientes Activos"
          value={stats.clientes.total}
          change={`+${stats.clientes.nuevosEsteMes} este mes`}
          icon={<FaUsers />}
        />
      </div>

      {/* Fila de Gráficos */}
      <div className="charts-grid">
        <VentasSemanaChart data={stats.ventasSemana} />
        <ProductosMasVendidosChart data={stats.productosMasVendidos} />
      </div>
    </div>
  );
};
