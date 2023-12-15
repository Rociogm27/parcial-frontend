import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CompEntidades = () => {

    const [entidadades, setEntidades] = useState([]); 
    useEffect( () => {getEntidades()}, []);

    const getEntidades = async () => {
        fetch(`https://parcial-backend-rociogm27s-projects.vercel.app/entidades/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setEntidades(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }
    const [nombreUsuario,setNombreUsuario]=useState('')

useEffect(() => {
    if(localStorage.getItem('objetoToken')!=undefined){
    setNombreUsuario(JSON.parse(localStorage.getItem('objetoToken')).correo)
    } else {
    setNombreUsuario("Usuario no registrado")
    }
}, []);

    const crearEvento = async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        console.log('Creando evento...');
    
        // Obtener el valor de los datos del formulario
        const nombreEvento = document.getElementById("nombre").value;
        console.log('Nombre:', nombreEvento);

        const lugarEvento = document.getElementById("lugar").value;
        console.log('Lugar:', lugarEvento);

        const fechaEvento = document.getElementById("timestamp").value;
        console.log('Fecha:', fechaEvento);
        
        
            const datosEvento = {
                "nombre": nombreEvento, // Convertir el valor a número si es necesario
                "lugar": lugarEvento,
                "timestamp" : fechaEvento,
                "organizador" : nombreUsuario
            };
            console.log('Datos de la puja:', datosEvento);
        
            // Convertir los datos a formato raw
            const rawDatosEvento = JSON.stringify(datosEvento);

            // Realizar la solicitud al backend
            fetch(`https://parcial-backend-rociogm27s-projects.vercel.app/entidades/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: rawDatosEvento, // Enviar datos en formato raw
            })
            .then(response => response.json())
            .then(data => {
                console.log('Evento realizada con éxito:', data);
                // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario7
                window.location.reload();
            })
            .catch(error => {
                console.error('Error al realizar el evento:', error);
                // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario

            });
        }


    return(
        <div className='container-fluid m-5'>
        {localStorage.getItem('objetoToken') != undefined ? (
            <div class="buscador-center col 4" style={{marginLeft: '10%'}}>
            <form
                id="formularioEvento"
                className="buscador-center"
                onSubmit={crearEvento}
            >
                <input
                    className='barrabusquedabig'
                    type="string"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    required
                />
                <input
                    className='barrabusquedabig'
                    type="string"
                    id="lugar"
                    name="lugar"
                    placeholder="Lugar"
                    required
                />
                <input
                    className='barrabusquedabig'
                    type="date"
                    id="timestamp"
                    name="nombre"
                    placeholder="Fecha"
                    required
                />
                <button className="botonBusqueda col 1" type="submit">Crear evento</button>
            </form>
            </div>
            ): (
                <div>
                    <p> Inicia sesion para crear eventos</p>
                </div>
            )}
            <div>

            </div>
        <b style={{marginLeft: '10%'}}>Eventos:</b> 
            <div class="card" style={{width: '70%', marginLeft: '10%'}}>
                <div class="card body">
                    {Array.isArray(entidadades) && entidadades.length > 0 ? (
                    <ul class="list-group list-group-flush">
                        {entidadades.map((entidad, index) => (
                        <li key={index} class="list-group-item">
                            <p>
                            <b>Nombre:</b> {entidad.nombre}
                            </p>
                            <p>
                            <b>Organizador:</b> {entidad.organizador} 
                            </p>
                            <p>
                            <b>Detalles:</b> <a href={`/evento/${entidad._id} `} className='btn btn-secondary'>Ver mas informacion</a>
                            </p>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>No hay eventos.</p>
                    )}
                </div>
        </div>
        </div>
        
    )
}


export default CompEntidades