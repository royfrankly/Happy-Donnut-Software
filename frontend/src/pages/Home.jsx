// src/pages/Home.jsx

import React from 'react';
// Importaciones de CSS de la página
import './Home.css'; 

// 👇 DEBEN EXISTIR TODAS ESTAS LÍNEAS 👇
import NavBar from '../components/NavBar/NavBar';
import CoffeeGallery from '../components/CoffeeGallery';
import StatsSection from '../components/StatsSection';
import AboutUsSection from '../components/AboutUsSection';
import PromoSection from '../components/PromoSection';
import Footer from '../components/Footer'; 
// ------------------------------------

function Home() {
    return (
        <div className="page-wrapper">
            <NavBar />
            <CoffeeGallery /> {/* Ya sabe qué es gracias al import */}
            <StatsSection />
            <AboutUsSection />
            <PromoSection />
            <Footer />
        </div>
    );
}

export default Home;