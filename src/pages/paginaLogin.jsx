import NavbarPage from "../navbar/navbar.js";
import CompLogin from "../login/Login.js";

function paginaLogin() {
    const entraInvitado = (e) => {
        localStorage.clear();
        window.location.href="/inicio"
    }

    const styles = {
        container: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#333333', // Fondo gris oscuro
        },
        contentContainer: {
          backgroundColor: '#dddddd', // Fondo gris claro
          padding: '20px', // Espaciado interno para el contenido
          borderRadius: '10px', // Borde redondeado
        },
    }

    return (
        <div style={styles.container}>
          <div className="container mt-5" style={styles.contentContainer}>
            <div className="row">
              <div className="col">
                <h1>Inicio de sesión</h1>
                <h2>Parcial Web 3 Rocio Gómez</h2>
                <div className="mt-5" style={{ marginLeft: '41%' }}>
                  <CompLogin></CompLogin>
                </div>
                <a onClick={entraInvitado} className='btn btn-dark mt-3'>Entrar como usuario no registrado</a>
              </div>
            </div>
          </div>
        </div>
      );
      
    
}
export default paginaLogin