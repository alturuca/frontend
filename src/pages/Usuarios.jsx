import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../services/usuarios';
import FormularioUsuario from '../components/FormularioUsuario';
import BotonCerrarSesion from '../components/BotonCerrarSesion';


function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const cargarUsuarios = () => {
    getUsuarios()
      .then(res => setUsuarios(res.data))
      .catch(err => {
        console.error(err);
        alert('Error al cargar usuarios');
      });
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleActualizar = () => {
    setUsuarioEditando(null);
    cargarUsuarios();
  };

  const handleCerrarSesion = () => {

    // eslint-disable-next-line no-undef
    navigate('/');

  };

  const handleIrTablero = () => {
    // eslint-disable-next-line no-undef
    navigate('/dashboard');

  }

  return (    

    <div>
      <section className='header-container-botones'>
            <BotonCerrarSesion texto="TABLERO" onClick={handleIrTablero} />
            <BotonCerrarSesion texto="CERRAR SESION" onClick={handleCerrarSesion} />
      </section>
      <FormularioUsuario
        usuarioSeleccionado={usuarioEditando}
        onUsuarioActualizado={handleActualizar}
      />

      <h3>Lista de Usuarios</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.first_name} {usuario.last_name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleEditar(usuario)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;