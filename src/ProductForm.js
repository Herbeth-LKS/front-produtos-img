import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:8000/create/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Necessário para enviar FormData com arquivos
                }
            });
            console.log("oi");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Descrição:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                </label>
                <label>
                    Preço:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                </label>
                <label>
                    Quantidade:
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                </label>
                <label>
                    Imagem:
                    <input type="file" onChange={e => setImage(e.target.files[0])} required />
                </label>
                <button type="submit">Cadastrar Produto</button>
            </form>
            <Link className="btn-listar" to="/listar">Listar Produtos</Link> {/* Botão Listar que redireciona para /listar */}
        </div>
    );
};

export default ProductForm;
