import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";
import CompFoto from "../Componentes/foto.js"

const PaginaInicial = () => {
    const styles = {
        welcomeBox: {
          backgroundColor: '#dddddd', // Fondo gris claro
          padding: '20px', // Espaciado interno
          borderRadius: '10px', // Borde redondeado
          width: 'fit-content', // Ajusta el ancho al contenido
          margin: '20px auto', // Centra el cuadro horizontalmente y agrega un margen superior e inferior
        },
      };
      
    return (
        <div>
          <NavbarPage />
          <div className="container-fluid" style={{ marginLeft: '9.5vmin' }}>
            <div className="row">
              <div className="col">
                {localStorage.getItem('objetoToken') != undefined ? (
                  <div style={styles.welcomeBox}>
                    <h2>Bienvenido {JSON.parse(localStorage.getItem('objetoToken')).correo}</h2>
                  </div>
                ) : (
                  <div style={styles.welcomeBox}>
                    <h2>Bienvenido, usuario no registrado</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default PaginaInicial