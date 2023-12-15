import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import logo from '../logo.svg'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function NavbarPage(props) {
  const [nombreUsuario,setNombreUsuario]=useState('')
  const [foto,setFoto]=useState('')

  useEffect(() => {
    if(localStorage.getItem('objetoToken')!=undefined){
      comprobarConexion()
      setNombreUsuario(JSON.parse(localStorage.getItem('objetoToken')).correo)
      setFoto(JSON.parse(localStorage.getItem('objetoToken')).foto)
    } else {
      setNombreUsuario("Usuario no registrado")
      setFoto('http://res.cloudinary.com/dekrjaaxf/image/upload/v1702643004/zmkh2ucj3vrf0gq8pn6m.png')
    }
}, []);


const comprobarConexion = async () => {
  // console.log(JSON.parse(localStorage.getItem('objetoToken')).tokenId)
  fetch(`https://parcial-backend-rociogm27s-projects.vercel.app/conexion/${JSON.parse(localStorage.getItem('objetoToken')).tokenId}/${JSON.parse(localStorage.getItem('objetoToken')).tokenCompleto}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.text())
      .then(data => {
            console.log(data)
            if(data=="expired" || data=="invalid token"){
              localStorage.clear()
              alert("Tu sesion ha expirado")
              window.location.href = '/login'
            }
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function cerrarSesion () {
  console.log("en Cerrar sesion")
  localStorage.clear();
      // Redirige a /login
  window.location.href = '/login';
}
const styles = {
  navbar: {
    backgroundColor: '#333333', // Fondo gris oscuro
    color: '#000000', // Color de texto negro
  },
  navLink: {
    marginLeft: '10vmin',
    color: '#ffffff ', // Color de texto negro
  },
  };

return (
  <Navbar expand="lg" className="navbar" style={styles.navbar}>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
      <Nav className="me-auto">
        <Nav.Link href={`/inicio`} className='navbar-link' style={styles.navLink}> Home </Nav.Link>
      </Nav>
      <NavItem style={styles.navLink}>{(nombreUsuario !== '') ? (nombreUsuario) : "Hola" }</NavItem>
      <Nav>
        <NavDropdown drop='start' className='me-3' title={<img src={foto} style={{ width: '6vh', borderRadius: '50%' }} alt="" />} id="basic-nav-dropdown">
          <NavDropdown.Item href="/" onClick={cerrarSesion}>Cerrar sesión</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
};


  export default NavbarPage;