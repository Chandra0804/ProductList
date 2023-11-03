import React, { useState } from 'react';
import styled from 'styled-components';
import products from './data';
import './App.css';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const ProductItemContainer = styled.div`
  border-radius: 30px;
  box-shadow: 0 0 5px #787878;
  padding: 20px;
  width: 100%; /* Updated width for responsiveness */
  text-align: center;
  transition: transform 0.2s;
  
  @media (min-width: 481px) {
    width: 20%; /* Adjust for larger screens */
  }
`;


const CarouselContainer = styled.div`
  width: 100%; /* Updated width for responsiveness */
  overflow: hidden;
  
  @media (min-width: 768px) {
    width: 17rem;
  }
`;

const SortFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const CarouselImages = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const CarouselImage = styled.img`
  max-width: 100%;
  height:auto;
  object-fit: contain;
  border-radius: 20px;
  margin-right: 10px;
`;

const App = () => {
  const [sortType, setSortType] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [carouselTimer, setCarouselTimer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;




  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === 'price-lowest') return a.price - b.price;
    if (sortType === 'price-highest') return b.price - a.price;
    return 0;
  });

  const filteredProducts = categoryFilter
    ? sortedProducts.filter((product) => product.category === categoryFilter)
    : sortedProducts;

  const handleMouseEnter = (product) => {
    setHoveredProductId(product.id);
    startImageCarousel(product);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleMouseLeave = () => {
    setHoveredProductId(null);
    stopImageCarousel();
  };

  const startImageCarousel = (product) => {
    stopImageCarousel(); // Ensure that only one timer is running
    const timer = setInterval(() => {

      setImageIndex((prevIndex) => (prevIndex !== product.imageUrls.length - 1 ? prevIndex + 1 : 0))
    }, 1000); // Change image every 1 second
    setCarouselTimer(timer);
  };

  const stopImageCarousel = () => {
    if (carouselTimer) {
      clearInterval(carouselTimer);
    }
    setImageIndex(0);
  };

  const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };


  const uniqueCategories = new Set();
  products.forEach((product) => uniqueCategories.add(product.category));
  const uniqueCategoriesArray = Array.from(uniqueCategories);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Product List</h1>
      <SortFilterContainer>
        <label>
          Sort by:
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-lowest">Price (Lowest)</option>
            <option value="price-highest">Price (Highest)</option>
          </select>
        </label>
        <label>
          Filter by category:
          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All</option>
            {uniqueCategoriesArray.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </SortFilterContainer>
      <ProductListContainer>
        {productsToDisplay.map((product) => (
          <ProductItemContainer
            key={product.id}
            onMouseEnter={() => handleMouseEnter(product)}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContainer>
              <CarouselImages
                style={{
                  transform: product.id === hoveredProductId ? `translateX(-${imageIndex * 103}%)` : 'translateX(0)',
                }}
              >
                {product.imageUrls.map((image, index) => (
                  <CarouselImage key={index} src={image} alt={product.title} />
                ))}
              </CarouselImages>
            </CarouselContainer>
            <div className="details-container">
              <h3>{product.title}</h3>
              <p className='card-description'>{product.description}</p>
              <div className="price-wrapper">
              <p className='card-price'>${product.price.toFixed(2)}</p>
              </div>
            </div>
          </ProductItemContainer>
        ))}
      </ProductListContainer>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
