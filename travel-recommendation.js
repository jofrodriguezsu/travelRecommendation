// Simulación de la carga del archivo JSON adjunto
const travelData = {
  "countries": [
    {
      "id": 1,
      "name": "Australia",
      "cities": [
        {
          "name": "Sydney, Australia",
          "imageUrl": "/travelRecommendation/images/sydney.jpg", // Placeholder for Sydney
          "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
        },
        {
          "name": "Melbourne, Australia",
          "imageUrl": "/travelRecommendation/images/Melbourne.jpg", // Placeholder for Melbourne
          "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
        }
      ]
    },
    {
      "id": 2,
      "name": "Japan",
      "cities": [
        {
          "name": "Tokyo, Japan",
          "imageUrl": "/travelRecommendation/images/Tokio.jpg", // Placeholder for Tokyo
          "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
        },
        {
          "name": "Kyoto, Japan",
          "imageUrl": "/travelRecommendation/images/Kyoto.jpg", // Placeholder for Kyoto
          "description": "Known for its historic temples, gardens, and traditional tea houses."
        }
      ]
    },
    {
      "id": 3,
      "name": "Brazil",
      "cities": [
        {
          "name": "Rio de Janeiro, Brazil",
          "imageUrl": "/travelRecommendation/images/Rio de Janeiro.jpg", // Placeholder for Rio
          "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
        },
        {
          "name": "São Paulo, Brazil",
          "imageUrl": "/travelRecommendation/images/Sao Pablo.jpg", // Placeholder for Sao Paulo
          "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
        }
      ]
    }
  ],
  "temples": [
    {
      "id": 1,
      "name": "Angkor Wat, Cambodia",
      "imageUrl": "/travelRecommendation/images/Angkor Wat.jpg", // Placeholder for Angkor Wat
      "description": "A UNESCO World Heritage site and the largest religious monument in the world."
    },
    {
      "id": 2,
      "name": "Taj Mahal, India",
      "imageUrl": "/travelRecommendation/images/Taj Mahal.jpg", // Placeholder for Taj Mahal
      "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
    }
  ],
  "beaches": [
    {
      "id": 1,
      "name": "Bora Bora, French Polynesia",
      "imageUrl": "/travelRecommendation/images/Bora Bora.jpg", // Placeholder for Bora Bora
      "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
    },
    {
      "id": 2,
      "name": "Copacabana Beach, Brazil",
      "imageUrl": "/travelRecommendation/images/Copacabana.jpg", // Placeholder for Copacabana
      "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
    }
  ]
};

const container = document.getElementById('recommendationsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

/**
 * Función para crear el HTML de una tarjeta de recomendación.
 * @param {string} imageUrl 
 * @param {string} name 
 * @param {string} description 
 * @returns {string} 
 */
function createCardHTML(imageUrl, name, description) {
    return `
        <div class="recommendation-card">
            <img src="${imageUrl}" alt="${name}">
            <div class="card-content">
                <h3>${name}</h3>
                <p>${description}</p>
                <button class="visit-button">Visit</button>
            </div>
        </div>
    `;
}

/**
 * Renderiza un array de recomendaciones en el contenedor principal.
 * @param {Array<Object>} items
 */
function renderRecommendations(items) {
    container.innerHTML = ''; 
    if (items.length === 0) {
        container.innerHTML = '<p>No recommendations found for your search.</p>';
        return;
    }
    
    const itemsToRender = items.slice(0, 2); 
    
    itemsToRender.forEach(item => {
        let name, imageUrl, description;

        if (item.cities) {
            item.cities.forEach(city => {
                container.innerHTML += createCardHTML(city.imageUrl, city.name, city.description);
            });
        } else {
            container.innerHTML += createCardHTML(item.imageUrl, item.name, item.description);
        }
    });
}


function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let results = [];

    if (query === 'beach' || query === 'beaches') {
        results = travelData.beaches;
    } else if (query === 'temple' || query === 'temples') {
        results = travelData.temples;
    } else {
        travelData.countries.forEach(country => {
            if (country.name.toLowerCase().includes(query)) {
              country.cities.forEach(city => results.push(city));
            }
        });
    }

    renderRecommendations(results);
}

function renderDefaultRecommendations() {
    const defaultCountries = travelData.countries.slice(0, 2); 
    let defaultItems = [];
    
    defaultCountries.forEach(country => {
      defaultItems = defaultItems.concat(country.cities);
    });

    renderRecommendations(defaultItems.slice(0, 2));
}

function handleReset() {
    searchInput.value = ''; 
    renderDefaultRecommendations(); 
}


searchBtn.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);

document.addEventListener('DOMContentLoaded', renderDefaultRecommendations);