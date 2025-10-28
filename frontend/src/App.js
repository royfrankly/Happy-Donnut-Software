// src/App.js

import React from 'react';
// Importamos tu componente de página de inicio (Home.jsx) desde la carpeta pages.
// La ruta es relativa a donde se encuentra App.js.
import Home from './pages/Home'; 

// Opcional: Importa App.css solo si contiene estilos globales necesarios 
// que no están en index.css o Home.css. Si está vacío, puedes eliminar esta línea.
import './App.css'; 

function App() {
  return (
    // <div className="App"> es el contenedor principal de toda tu aplicación.
    // Aquí es donde se podría manejar el ruteo (ej. react-router-dom) en el futuro, 
    // pero por ahora solo carga la página Home.
    <div className="App">
      <Home /> 
    </div>
  );
}

export default App;