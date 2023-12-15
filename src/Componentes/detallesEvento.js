import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import CompFoto from './foto';

const CompDetallesEvento = () => {
    const {idEvento} = useParams()

    const [evento, setEvento] = useState({})

    useEffect(() => {
        getEvento()
    }, [])

    const getEvento = async () => {
        try {
            // Hacer la solicitud para obtener productos desde el backend
            const response = await fetch(`ttps://parcial-backend-rociogm27s-projects.vercel.app/entidades/${idEvento}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                // Manejar la respuesta exitosa, redirigir o realizar otras acciones según sea necesario
                console.log('Evento obtenido con éxito');
                const data = await response.json();
                setEvento(data);
            } else {
                console.error('Error al obtener el evento:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener el evento:', error);
        }
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
            <p>Nombre: {evento.nombre}</p>
            <p>Fecha: {evento.timestamp}</p>
            <p>Lugar: {evento.lugar}</p>
            <p>Lat: {evento.lat}</p>
            <p>Lon: {evento.lon}</p>
            <p>Organizador: {evento.organizador}</p>
            <p>Foto: {evento.foto}</p>
          </div>
          <div>
          <CompFoto/>
          </div>
        </div>
      );
      
}

export default CompDetallesEvento