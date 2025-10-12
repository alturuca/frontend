import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import StocklyXLogo from '../components/StocklyXLogo';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate para la redirección

  const handleLogin = async () => {
  if (!usuario || !contraseña) {
    setMessage('Por favor, completa todos los campos.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Corrected the typo here: 'eamil' is now 'email'
      body: JSON.stringify({ username: usuario, password: contraseña }),
    });

    const data = await response.json(); 

    // We'll add a check here before calling .json() to avoid a different error.
    if (response.ok) {
    
      
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh);
 
     // Nota: El rol NO viene en esta respuesta. Asumimos que el usuario está logueado.
      setMessage(`Inicio de sesión exitoso. Redirigiendo...`);
      navigate('/dashboard');

    } else {
         // Manejar errores específicos de la API (ej. 401 Credenciales Inválidas)
        if (data.detail) {
         setMessage('Error: ' + data.detail); // Muestra el mensaje de error de Django
        } else {
         setMessage('Error de credenciales. Intenta nuevamente.');
        }
      }
  } catch (error) {
      // Manejar errores de red (servidor caído o CORS)
      setMessage('Error de conexión con el servidor. Verifica que Django esté corriendo.');
      console.error('Error de red:', error);
    }
  };

    

    
    
 


/*
   const handleLogin = () => {
    if (!usuario || !contraseña) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    // Validación básica de usuario/contraseña
    const usuariosSimulados = [
      { email: 'admin@notiene.com', password: '1234', rol: 'admin' },
      { email: 'vendedor@notiene.com', password: '5678', rol: 'vendedor' },

];
    const usuarioEncontrado = usuariosSimulados.find(
      (u) => u.email === usuario && u.password === contraseña
  );

  if (usuarioEncontrado) {
    localStorage.setItem('rol', usuarioEncontrado.rol);
    setMessage(`Inicio de sesión exitoso. Bienvenido ${usuarioEncontrado.rol}`);
    navigate('/Dashboard');
  } else {
    setMessage('Credenciales incorrectas. Intenta nuevamente.');
  }
}
*/


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <StocklyXLogo width={300} height={100} alt="Logo de StocklyX" />
        </div>
        <h2>Welcome back!</h2>
        <p>Sign in to your account</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="button" onClick={handleLogin}>Sign in</button>
        </form>

        {message && <p className="message-text">{message}</p>}

        <div className="links">
          <a href="#">Forgot password?</a>
          <p>
            New to StocklyX? <a href="#">Create account</a>
          </p>
        </div>
      </div>
      <div className="login-image">
        <img src="/Bodega.png" alt="Crecimiento en ventas" />
        <div className="growth-overlay">
          <div className="growth-text">📦 Gestión eficiente, crecimiento constante</div>
        </div>
      </div>
    </div>
  );
};

export default Login;