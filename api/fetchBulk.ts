export const fetchForecast = async (): Promise<any> => {
  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
  const url = `https://bulk.openweathermap.org/snapshot/hourly1h_zip_us.json.gz?appid=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};
