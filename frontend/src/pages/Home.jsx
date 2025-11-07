// src/pages/Home.jsx

import React from 'react';
// Importaciones de CSS de la página
import './Home.css'; 

// 👇 DEBEN EXISTIR TODAS ESTAS LÍNEAS 👇
import NavBar from '../components/NavBar/NavBar';
import HeroSection from '../components/HeroSection/HeroSection';
import GalleryItem from '../components/GalleryItem/GalleryItem';
// ------------------------------------

function Home() {
    return (
       
        <div className="page-wrapper">
            <div className="content-wrapper">
                <NavBar />
                <HeroSection />
                <GalleryItem />
            </div>
               
        </div>
    );
}

export default Home;