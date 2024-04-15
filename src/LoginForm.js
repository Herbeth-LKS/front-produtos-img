import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', formData);
      console.log('Login bem-sucedido!', response.data);
      setError('');
      navigate('/listar');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Usuário ou senha incorretos. Por favor, tente novamente.');
      } else {
        setError('Erro ao fazer login. Por favor, tente novamente mais tarde.');
      }
    }
  };

  // Função para lidar com o clique no botão de registro
  const handleRegisterClick = () => {
    navigate('/registrar');
  };

  return (
    <div className="form-container">
      <h2>Formulário de Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterClick}>Registrar</button> {/* Adicione este botão */}
      </form>
    </div>
  );
};

export default LoginForm;
