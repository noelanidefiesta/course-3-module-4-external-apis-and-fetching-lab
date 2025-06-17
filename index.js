// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process

// My code below

// Replaced with my own API key from openweathermap.org
const API_KEY = 7ee1fbbe10852aed2402105f3600564a; // <-- PUT YOUR API KEY HERE

// Step 1: Fetch Weather Data
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Step 2: Display Weather Data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-display');
    const errorDiv = document.getElementById('error-message');

    // Clear any previous error
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';

    // Update weather section
    weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
  `;
}

// Step 3: Display Error Message
function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    const weatherDiv = document.getElementById('weather-display');

    // Clear weather info
    weatherDiv.innerHTML = '';

    // Show error message
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Step 4: Handle User Input
document.getElementById('fetch-weather').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();

    if (cityInput === '') {
        displayError('Please enter a city name.');
        return;
    }

    fetchWeatherData(cityInput);
});
