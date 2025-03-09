self.onmessage = async (e) => {
  const { interval, locations, apiKey } = e.data;

  const fetchWeatherData = async () => {
    if (!locations || locations.length === 0) return;

    try {
      const weatherPromises = locations.map(async (location) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${apiKey}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        return { locationId: location.id, weather: data };
      });

      const weatherData = await Promise.all(weatherPromises);
      postMessage({ type: 'weatherData', payload: weatherData });
    } catch (error) {
      postMessage({ type: 'error', payload: error.message });
    }
  };

  setInterval(fetchWeatherData, interval);
};
