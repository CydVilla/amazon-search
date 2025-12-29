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

// Generate a stylish product summary based on the search query
const generateProductSummary = (searchQuery) => {
  const query = searchQuery.trim();
  const words = query.split(/\s+/);
  const productName = query;
  
  // Check for size/dimension keywords
  const sizeKeywords = words.filter(w => 
    /\d+/.test(w) || 
    ['inch', 'inches', 'ft', 'feet', 'cm', 'mm', 'small', 'medium', 'large', 'xl', 'xxl'].some(size => 
      w.toLowerCase().includes(size)
    )
  );
  
  // Check for descriptive keywords
  const descriptiveWords = words.filter(w => 
    ['portable', 'wireless', 'smart', 'digital', 'pro', 'ultra', 'mini', 'premium', 
     'professional', 'deluxe', 'compact', 'lightweight', 'bluetooth', 'usb', 'hdmi',
     'waterproof', 'durable', 'rechargeable', 'adjustable', 'foldable'].some(desc => 
      w.toLowerCase().includes(desc)
    )
  );
  
  // Detect product categories
  const categories = {
    electronics: ['headphones', 'laptop', 'phone', 'tablet', 'camera', 'speaker', 'monitor', 'keyboard', 'mouse'],
    clothing: ['shirt', 'pants', 'shoes', 'jacket', 'dress', 'hat', 'socks', 'sweater'],
    home: ['furniture', 'lamp', 'chair', 'desk', 'bed', 'table', 'sofa', 'rug'],
    fitness: ['dumbbell', 'yoga', 'treadmill', 'bike', 'weights', 'mat', 'resistance'],
    kitchen: ['blender', 'mixer', 'pan', 'pot', 'knife', 'cutting', 'coffee', 'toaster']
  };
  
  let detectedCategory = '';
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => query.toLowerCase().includes(keyword))) {
      detectedCategory = category;
      break;
    }
  }
  
  // Build the summary
  let summary = `✨ **${productName}**\n\n`;
  
  // Add product description
  summary += `🔍 What it is: `;
  if (detectedCategory) {
    const categoryLabels = {
      electronics: 'An electronic device',
      clothing: 'A clothing item',
      home: 'A home furnishing',
      fitness: 'Fitness equipment',
      kitchen: 'A kitchen appliance'
    };
    summary += `${categoryLabels[detectedCategory]} `;
  } else {
    summary += `A product `;
  }
  summary += `that matches your search criteria\n\n`;
  
  // Helper function to capitalize words
  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);
  
  // Add features if found
  if (descriptiveWords.length > 0) {
    summary += `⚡ Key Features: ${descriptiveWords.map(capitalizeWord).join(', ')}\n\n`;
  }
  
  // Add size/dimensions if found
  if (sizeKeywords.length > 0) {
    summary += `📏 Size & Dimensions: ${sizeKeywords.join(' ')}\n\n`;
  }
  
  summary += `🛍️ Searching Amazon for the best deals and options...`;
  
  return summary;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchUrl, setSearchUrl] = useState(null);
  const [productSummary, setProductSummary] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const url = generateAmazonLink(searchQuery.trim());
      const summary = generateProductSummary(searchQuery.trim());
      setSearchUrl(url);
      setProductSummary(summary);
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

        {productSummary && (
          <div className="product-summary">
            <div className="summary-content">
              {productSummary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="summary-paragraph">
                  {paragraph.split('\n').map((line, lineIndex) => {
                    // Parse markdown-style bold text with ** delimiters
                    const parts = line.split('**');
                    return (
                      <span key={lineIndex}>
                        {parts.map((part, partIndex) => {
                          // Only apply bold formatting if we have a matching pair
                          const isBold = partIndex % 2 === 1 && parts.length > partIndex;
                          return isBold ? <strong key={partIndex}>{part}</strong> : part;
                        })}
                        {lineIndex < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        )}

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

