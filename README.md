# 🌍 Weather Comparison App

A beautiful, responsive weather application with a green theme that allows you to compare weather conditions across different locations.

## ✨ Features

- 🔍 **City Search & Autocomplete** - Type a city name and get instant suggestions
- 📍 **Add Multiple Locations** - Compare weather for up to 4 different cities simultaneously
- 📊 **Visual Comparison Charts** - Bar charts for temperature, humidity, wind speed, and feels-like temperature
- 🎨 **Green Theme** - Beautiful gradient background and intuitive UI
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🌐 **Real-time Weather Data** - Powered by OpenWeatherMap API
- 💨 **Detailed Weather Info** - Temperature, humidity, wind speed, pressure, visibility, and coordinates

## 🚀 Quick Start

### 1. Get an API Key
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Generate an API key from your account dashboard

### 2. Setup the App
- Clone or download this repository
- Open `script.js` and replace `YOUR_OPENWEATHERMAP_API_KEY` with your actual API key:
```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the App
Using Python (3.x):
```bash
python -m http.server 8000
```

Using Python 2.x:
```bash
python -m SimpleHTTPServer 8000
```

Using Node.js (http-server):
```bash
npx http-server
```

Then open your browser and navigate to `http://localhost:8000`

## 📖 How to Use

1. **Search for a City** - Type a city name in the search box
2. **Add Location** - Click "Add Location" or press Enter
3. **View Weather Card** - See detailed weather information for the selected city
4. **Compare Multiple Cities** - Add up to 4 cities to see comparison charts
5. **Remove Location** - Click the × button on any card to remove it

## 🎨 Customization

### Change the Theme Color
Edit the color values in `styles.css`:

```css
/* Primary green color */
--primary-green: #2db87a;

/* Dark green */
--dark-green: #0f5f3f;

/* Medium green */
--medium-green: #1a8f5f;
```

### Modify Maximum Locations
In `script.js`, change the `MAX_LOCATIONS` constant:
```javascript
const MAX_LOCATIONS = 4; // Change to any number
```

## 📊 Weather Data Displayed

### Per Location Card:
- Current temperature (°C)
- Feels-like temperature
- Weather description with emoji icon
- Humidity percentage
- Wind speed (m/s)
- Atmospheric pressure (hPa)
- Visibility (km)
- Geographic coordinates (latitude, longitude)

### Comparison Charts (2+ locations):
- Temperature comparison
- Humidity levels
- Wind speed
- Feels-like temperature

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, flexbox, and CSS Grid
- **Vanilla JavaScript** - No frameworks, pure JS
- **OpenWeatherMap API** - Real-time weather data

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 API Rate Limits

The free OpenWeatherMap API tier includes:
- 60 calls per minute
- 1,000,000 calls per month

For production use, consider upgrading to a paid plan.

## 🐛 Troubleshooting

### "City not found" error
- Check spelling of the city name
- Try using a different city
- Ensure you have internet connectivity

### Empty comparison charts
- Add at least 2 locations to see comparison charts
- Wait for weather data to load

### API key error
- Verify your API key is correct
- Ensure your OpenWeatherMap account is active
- Check that API calls haven't exceeded the rate limit

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Enjoy exploring weather around the world! 🌎⛅**
