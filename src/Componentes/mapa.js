//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import NavbarPage from "../navbar/navbar.js";


const CompMapa = () => {

    const [position, setPosition] = useState([0, 0])
    const [paradas, setParadas] = useState()
    const [mostrarParadas, setMostrarParadas] = useState(false)
    const [ubicacionCargada, setUbicacionCargada] = useState(false);



    const [direccion, setDireccion] = useState()
    const buscarCercanas = (e) => {
        e.preventDefault()
        var raw = JSON.stringify({
            "direccion": direccion
        })
        fetch('http://localhost:4000/paradas/cercanas/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setParadas(data)
            setMostrarParadas(true)
        })
    }


    const mostrarMapa = () => {
        if(!ubicacionCargada) {
            fetch('https://parcial-backend-rociogm27s-projects.vercel.app/paradas/ubicacion/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(data => {
                    setPosition([data.lat, data.lon])
                    setUbicacionCargada(true)
            })
        }
    }

    useEffect(() => {
        mostrarMapa()
    }, [])  // Con el [] hago que solo se haga un useEffect

    return (
        <div className="container">
            <div className='row'>
              {position[0] !== 0 && position[1] !== 0 && (
                <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                      OpenStreetMap</a> contributors'
                  />
                  {!mostrarParadas && (
                    <Marker position={position}>
                      <Popup>Marcador</Popup>
                    </Marker>
                  )}
    
                  {paradas && paradas.map((parada, index) => (
                    <Marker
                      key={index}
                      position={[parada.lat, parada.lon]}
                    >
                      <Popup>{`Parada ${parada.nombreParada}`}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
            <div className="row">
              <h2>Mapa con eventos</h2>
              <div className='formulario'>
                <h2>Buscar eventos cercanos a una dirección</h2>
                <form className='form' onSubmit={buscarCercanas}>
                  <label>Dirección</label>
                  <input
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className='form-control'
                    required
                    type='text'
                  />
                  <br/>
                  <button className='btn btn-primary' type='submit'>Buscar</button>
                </form>
              </div>
        </div>
        </div>
      );
    };

export default CompMapa