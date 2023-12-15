import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CompLogin = () => {
    const navigate = useNavigate()

    const volverAtras = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect (() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '188871590545-2ffe7kt7l6v7pla4458c41t7mq6uidig.apps.googleusercontent.com',
            callback: handleCallBackResponse
        });

        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("singInDiv"), {
                'scope': 'profile email',
                'width': 240,
                'height': 70,
                'longtitle': true,
                'theme': 'dark' 
            }

        );
        
    }, []);

    function handleCallBackResponse (response){
        console.log("Encode JWT: "+  response.credential)
        fetch(`http://localhost:4000/loginToken/${response.credential}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
          .then(data => {
                // Actualizar el estado con los productos obtenidos
                if (data){
                    data.tokenCompleto= response.credential
                    localStorage.setItem('objetoToken', JSON.stringify(data));
                    window.location.href="/inicio"
                    //console.log(JSON.parse(localStorage.getItem('objetoToken')))
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }

    function handleSingOut (e) {
        google.accounts.id.signOut().then(function () {
            console.log('User signed out.');
            });
    }


    return (  
        <div id='singInDiv'></div>
    )
}

export default CompLogin 