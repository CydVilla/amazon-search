import React, { useState } from 'react';
import './App.css';

// Generate Amazon affiliate link for a search query
const generateAmazonLink = (searchQuery) => {
  const storeId = process.env.REACT_APP_AMAZON_STORE_ID;
  if (!storeId) {
    console.warn('REACT_APP_AMAZON_STORE_ID not set in environment variables');
    // Fallback to regular Amazon search without affiliate tag
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.amazon.com/s?k=${encodedQuery}`;
  }
  
  const encodedQuery = encodeURIComponent(searchQuery);
  return `https://www.amazon.com/s?k=${encodedQuery}&tag=${storeId}`;
};

// Featured games with images
const featuredGames = [
  {
    name: "STAR WARS: Battlefront Classic Collection Standard",
    searchQuery: "STAR WARS Battlefront Classic Collection Standard",
    image: "https://media.gamestop.com/i/gamestop/20011284/STAR-WARS-Battlefront-Classic-Collection?w=768&h=768&fmt=auto"
  },
  {
    name: "No More Heroes 3",
    searchQuery: "No More Heroes 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EE_16W7FdUWfoDc5lVewJm17GYi1Lh2Xhw&s"
  },
  {
    name: "DRAGON QUEST I & II HD-2D Remake",
    searchQuery: "DRAGON QUEST I II HD-2D Remake",
    image: "https://images.nintendolife.com/55b5141b05944/dragon-quest-i-and-ii-hd-2d-remake-cover.cover_large.jpg"
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = generateAmazonLink(searchQuery.trim());
      setSearchUrl(url);
      // Open in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGameClick = (game) => {
    const url = generateAmazonLink(game.searchQuery);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrevious = () => {
    setActiveCardIndex((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1 className="app-title">Looking for something else?</h1>
        
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Search for anything on Amazon..."
                value={searchQuery}
                onChange={handleInputChange}
                autoFocus
              />
              <button type="submit" className="search-button">
                <span className="search-icon">🔍</span>
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="featured-games-section">
          <h2 className="featured-title">Featured Games</h2>
          <div className="carousel-container">
            <button 
              className="carousel-arrow carousel-arrow-left"
              onClick={handlePrevious}
              aria-label="Previous game"
            >
              ‹
            </button>
            <div className="carousel-wrapper">
              {featuredGames.map((game, index) => {
                const isActive = index === activeCardIndex;
                const offset = index - activeCardIndex;
                const absOffset = Math.abs(offset);
                const translateX = offset * 50;
                const translateZ = offset * -35;
                const scale = 1 - absOffset * 0.15;
                const rotateY = offset * 15;
                const opacity = 1 - absOffset * 0.3;
                const zIndex = featuredGames.length - absOffset;
                
                return (
                  <div
                    key={index}
                    className={`featured-game-card ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity: opacity,
                      zIndex: zIndex
                    }}
                    onClick={() => handleGameClick(game)}
                  >
                    <div className="game-image-container">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="game-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/667eea/ffffff?text=' + encodeURIComponent(game.name.substring(0, 20));
                        }}
                      />
                      <div className="game-overlay">
                        <span className="game-buy-text">View on Amazon</span>
                      </div>
                    </div>
                    <h3 className="game-name">{game.name}</h3>
                  </div>
                );
              })}
            </div>
            <button 
              className="carousel-arrow carousel-arrow-right"
              onClick={handleNext}
              aria-label="Next game"
            >
              ›
            </button>
          </div>
        </div>

        {searchUrl && (
          <div className="search-result">
            <p className="result-label">Last search URL:</p>
            <a 
              href={searchUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="result-link"
            >
              {searchUrl}
            </a>
          </div>
        )}

        <div className="info-section">
          <p className="info-text">
            Click on featured games or search for anything to support through affiliate links.
          </p>
          {!process.env.REACT_APP_AMAZON_STORE_ID && (
            <p className="warning-text">
              ⚠️ REACT_APP_AMAZON_STORE_ID not configured. Add it to your .env file.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

