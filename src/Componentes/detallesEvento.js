import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import CompFoto from './foto';

const CompDetallesEvento = () => {
    const {idEntidad} = useParams()

    const [entidad, setEntidad] = useState([]); 
    useEffect( () => {getEntidad()}, []);

    const getEntidad = async () => {
        fetch(`https://parcial-backend-rociogm27s-projects.vercel.app/entidades/${idEntidad}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setEntidad(data);
            console.log("entidad encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener la entidad:', error);
        })
    }

    

    const styles = {
        container: {
          backgroundColor: '#333333', // Fondo gris oscuro
          padding: '20px', // Espaciado interno
          borderRadius: '10px', // Borde redondeado
          color: '#000000', // Color de texto negro
        },
        title: {
          textAlign: 'center',
        },
        detailsContainer: {
          backgroundColor: '#f0f0f0', // Fondo gris claro
          padding: '20px', // Espaciado interno
          borderRadius: '8px', // Borde redondeado
        },
        
      };

    return (
        <div style={styles.container}>
          <h1 style={styles.title}>Detalles del producto</h1>
          <div style={styles.detailsContainer}>
            <p>Nombre:</p> {entidad.nombre}
            <p>Fecha :</p> {entidad.timestamp}
            <p>Lugar: </p> {entidad.lugar}
            <p>Lat: </p> {entidad.lat}
            <p>Lon: </p> {entidad.lon}
            <p>Organizador: </p> {entidad.organizador}
            <p>Foto: </p> <img src={entidad.foto} alt="" className="card-img-top img-fluid" />
            
          </div>
          <div>
          <CompFoto/>
          </div>
        </div>
      );
      
}

export default CompDetallesEvento