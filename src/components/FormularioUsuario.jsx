import React, { useState, useEffect } from 'react';
import { crearUsuario, actualizarUsuario, eliminarUsuario } from '../services/usuarios';

function FormularioUsuario({ usuarioSeleccionado, onUsuarioActualizado }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    rol: 'vendedor',
  });

  // Cargar datos si se va a editar
  useEffect(() => {
    if (usuarioSeleccionado) {
      setFormData({
        username: usuarioSeleccionado.username || '',
        password: '',
        first_name: usuarioSeleccionado.first_name || '',
        last_name: usuarioSeleccionado.last_name || '',
        email: usuarioSeleccionado.email || '',
        rol: usuarioSeleccionado.rol || 'vendedor',
      });
    } else {
      limpiarFormulario();
    }
  }, [usuarioSeleccionado]);

  const limpiarFormulario = () => {
    setFormData({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      rol: 'vendedor',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioSeleccionado) {
      actualizarUsuario(usuarioSeleccionado.id, formData)
        .then(() => {
          alert('Usuario actualizado exitosamente');
          limpiarFormulario();
          if (onUsuarioActualizado) onUsuarioActualizado();
        })
        .catch(err => {
          console.error(err);
          alert('Error al actualizar usuario');
        });
    } else {
      crearUsuario(formData)
        .then(() => {
          alert('Usuario creado exitosamente');
          limpiarFormulario();
          if (onUsuarioActualizado) onUsuarioActualizado();
        })
        .catch(err => {
          console.error(err);
          alert('Error al crear usuario');
        });
    }
  };

  const handleEliminar = () => {
    if (usuarioSeleccionado) {
      if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        eliminarUsuario(usuarioSeleccionado.id)
          .then(() => {
            alert('Usuario eliminado exitosamente');
            limpiarFormulario();
            if (onUsuarioActualizado) onUsuarioActualizado();
          })
          .catch(err => {
            console.error(err);
            alert('Error al eliminar usuario');
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{usuarioSeleccionado ? 'Editar Usuario' : 'Crear Usuario'}</h3>
      <input name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required={!usuarioSeleccionado} />
      <input name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} />
      <input name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} />
      <input name="email" type="email" placeholder="Correo" value={formData.email} onChange={handleChange} />
      <select name="rol" value={formData.rol} onChange={handleChange}>
        <option value="vendedor">Vendedor</option>
        <option value="administrador">Administrador</option>
      </select>
      <button type="submit">{usuarioSeleccionado ? 'Actualizar' : 'Registrar'}</button>
      {usuarioSeleccionado && (
        <button type="button" onClick={handleEliminar} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          Eliminar
        </button>
      )}
    </form>
  );
}

export default FormularioUsuario;