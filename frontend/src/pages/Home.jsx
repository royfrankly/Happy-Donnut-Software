// src/pages/Home.jsx

import React from 'react';
// Importaciones de CSS de la página
import './Home.css'; 

// 👇 DEBEN EXISTIR TODAS ESTAS LÍNEAS 👇
import NavBar from '../components/NavBar/NavBar';


// ------------------------------------

function Home() {
    return (
       
        <div className="page-wrapper">
            <div className="content-wrapper">
                <NavBar />
            </div>
               
        </div>
    );
}

export default Home;