// Weather API Configuration
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Get free key from openweathermap.org
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// State Management
let selectedLocations = [];
const MAX_LOCATIONS = 4;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const addBtn = document.getElementById('addBtn');
const suggestionsDiv = document.getElementById('suggestions');
const weatherCardsContainer = document.getElementById('weatherCardsContainer');
const comparisonSection = document.getElementById('comparisonSection');
const infoMessage = document.getElementById('infoMessage');

// Event Listeners
searchInput.addEventListener('input', handleSearchInput);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddLocation();
});
addBtn.addEventListener('click', handleAddLocation);

// Handle search input with debouncing
let searchTimeout;
function handleSearchInput(e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();

    if (query.length < 2) {
        suggestionsDiv.classList.remove('show');
        return;
    }

    searchTimeout = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 300);
}

// Fetch city suggestions from API
async function fetchCitySuggestions(query) {
    try {
        const response = await fetch(
            `${GEO_API_URL}?name=${query}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.length === 0) {
            showNoResults();
            return;
        }

        displaySuggestions(data);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        showSuggestionError();
    }
}

// Display city suggestions
function displaySuggestions(cities) {
    suggestionsDiv.innerHTML = '';

    cities.forEach((city) => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
        div.onclick = () => selectSuggestion(city);
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.classList.add('show');
}

// Handle suggestion selection
function selectSuggestion(city) {
    searchInput.value = `${city.name}, ${city.country}`;
    suggestionsDiv.classList.remove('show');
    suggestionsDiv.innerHTML = '';
}

// Handle add location button
function handleAddLocation() {
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a city name');
        return;
    }

    if (selectedLocations.some(loc => loc.name.toLowerCase() === query.toLowerCase())) {
        alert('This location is already added');
        return;
    }

    if (selectedLocations.length >= MAX_LOCATIONS) {
        alert(`Maximum ${MAX_LOCATIONS} locations allowed`);
        return;
    }

    fetchWeatherByCity(query);
}

// Fetch weather data by city name
async function fetchWeatherByCity(cityName) {
    try {
        const response = await fetch(
            `${API_BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                alert('City not found. Please check the spelling and try again.');
            } else {
                alert('Error fetching weather data');
            }
            return;
        }

        const data = await response.json();
        addLocationToList(data);
        searchInput.value = '';
        suggestionsDiv.classList.remove('show');
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Add location to the list
function addLocationToList(weatherData) {
    const location = {
        id: Date.now(),
        name: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        description: weatherData.weather[0].main,
        icon: getWeatherIcon(weatherData.weather[0].main),
        pressure: weatherData.main.pressure,
        visibility: (weatherData.visibility / 1000).toFixed(1),
    };

    selectedLocations.push(location);
    updateUI();
}

// Get weather emoji based on condition
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️',
    };
    return icons[condition] || '🌤️';
}

// Remove location from list
function removeLocation(id) {
    selectedLocations = selectedLocations.filter(loc => loc.id !== id);
    updateUI();
}

// Update UI - render cards and comparison
function updateUI() {
    renderWeatherCards();
    updateInfoMessage();
    if (selectedLocations.length > 1) {
        renderComparison();
        comparisonSection.style.display = 'block';
    } else {
        comparisonSection.style.display = 'none';
    }
}

// Render weather cards
function renderWeatherCards() {
    weatherCardsContainer.innerHTML = '';

    selectedLocations.forEach((location) => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="location-name">${location.name}, ${location.country}</div>
                </div>
                <button class="remove-btn" onclick="removeLocation(${location.id})">×</button>
            </div>
            <div class="weather-main">
                <div class="weather-icon">${location.icon}</div>
                <div class="temperature-display">
                    <div class="temp">${location.temp}°C</div>
                    <div class="description">${location.description}</div>
                </div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${location.feelsLike}°C</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${location.humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${location.windSpeed} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${location.pressure} hPa</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Visibility</div>
                    <div class="detail-value">${location.visibility} km</div>
                </div>
            </div>
        `;
        weatherCardsContainer.appendChild(card);
    });
}

// Update info message
function updateInfoMessage() {
    const remaining = MAX_LOCATIONS - selectedLocations.length;
    if (selectedLocations.length === 0) {
        infoMessage.textContent = 'Add up to 4 locations to compare their weather';
        infoMessage.style.display = 'block';
    } else if (remaining > 0) {
        infoMessage.textContent = `${remaining} more location${remaining !== 1 ? 's' : ''} can be added`;
        infoMessage.style.display = 'block';
    } else {
        infoMessage.textContent = 'Maximum locations reached';
        infoMessage.style.display = 'block';
    }
}

// Render comparison section
function renderComparison() {
    renderComparisonChart('tempComparison', 'Temperature', 'temp', '°C', -50, 50);
    renderComparisonChart('humidityComparison', 'Humidity', 'humidity', '%', 0, 100);
    renderComparisonChart('windComparison', 'Wind Speed', 'windSpeed', ' km/h', 0, Math.max(...selectedLocations.map(l => l.windSpeed)) + 10);
    renderComparisonChart('feelsLikeComparison', 'Feels Like', 'feelsLike', '°C', -50, 50);
}

// Render individual comparison chart
function renderComparisonChart(containerId, label, dataKey, unit, minScale, maxScale) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const scale = maxScale - minScale;

    selectedLocations.forEach((location) => {
        const value = location[dataKey];
        const percentage = ((value - minScale) / scale) * 100;

        const barDiv = document.createElement('div');
        barDiv.className = 'comparison-bar';
        barDiv.innerHTML = `
            <div class="bar-label">${location.name}</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${Math.max(0, Math.min(100, percentage))}%">
                    ${percentage > 5 ? `${value}${unit}` : ''}
                </div>
            </div>
            <div class="bar-value">${value}${unit}</div>
        `;
        container.appendChild(barDiv);
    });
}

// Error handling helpers
function showNoResults() {
    suggestionsDiv.innerHTML = '<div class="suggestion-item" style="color: #999;">No cities found</div>';
    suggestionsDiv.classList.add('show');
}

function showSuggestionError() {
    suggestionsDiv.innerHTML = '<div class="suggestion-item" style="color: #999;">Error fetching suggestions</div>';
    suggestionsDiv.classList.add('show');
}

// Initialize
console.log('Weather App initialized. Remember to add your OpenWeatherMap API key!');
