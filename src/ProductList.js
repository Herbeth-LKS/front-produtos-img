import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './ProductList.css';

Modal.setAppElement('#root');

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (pageNumber) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/list/products?page=${pageNumber}`);
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <Link to="/cadastro" className="btn-cadastrar">Cadastrar Produto</Link>
      {products.map(product => (
        <div className="product" key={product.id} onClick={() => handleProductClick(product)}>
          <h2>{product.name}</h2>
          <p>Preço: {product.price}</p>
        </div>
      ))}
      <Modal isOpen={modalIsOpen} onRequestClose={handleClose}>
        {selectedProduct && (
          <div>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Preço: {selectedProduct.price}</p>
            <img src={`http://127.0.0.1:8000/storage/${selectedProduct.image}`} alt={selectedProduct.name} style={{ maxWidth: '60%', height: 'auto' }} />
            <button onClick={handleClose}>Fechar</button>
          </div>
        )}
      </Modal>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default ProductList;
