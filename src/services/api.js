// src/services/api.js
// Placeholder for API configuration
const get = async (url) => {
    console.log(`Mock API GET request to: ${url}`);
    // Mock data based on URL
    if (url === '/dashboard/summary') {
        return {
            data: {
                ventasDia: { total: 6524.00, porcentaje: 12.5 },
                comprobantes: { total: 87, nuevos: 5 },
                productos: { total: 538, unidadesHoy: 120 },
                clientes: { total: 245, nuevosEsteMes: 18 },
                ventasSemana: [
                    { dia: 'Lun', ventas: 4000 },
                    { dia: 'Mar', ventas: 3000 },
                    { dia: 'Mie', ventas: 2000 },
                    { dia: 'Jue', ventas: 2780 },
                    { dia: 'Vie', ventas: 1890 },
                    { dia: 'Sab', ventas: 2390 },
                    { dia: 'Dom', ventas: 3490 },
                ],
                productosMasVendidos: [
                    { nombre: 'Dona', total: 150 },
                    { nombre: 'Cafe', total: 120 },
                    { nombre: 'Jugo', total: 90 },
                    { nombre: 'Torta', total: 50 },
                    { nombre: 'Galleta', total: 30 },
                ]
            }
        };
    }
    return Promise.resolve({ data: {} });
};

export const api = {
    get,
};
