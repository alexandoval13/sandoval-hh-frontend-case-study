import { System, systemDefinition } from 'db/facilities';
import type { CurrentWeather } from '~/types/weather';

type WeatherCardProps = {
  weather: CurrentWeather;
  city?: string;
  state?: string;
};

const WeatherCard = (props: WeatherCardProps) => {
  const { weather, city, state } = props;
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="py-3 px-4 flex justify-between items-center border-b border-gray-200">
          <h4 className="text-sm">
            {city || weather.name}
            {state ? `, ${state}` : ''}
          </h4>
        </div>

        <div className="p-4 flex items-center gap-3">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-14 h-14"
          />
          <div>
            <h6 className="text-lg font-medium">
              {weather.main.temp}
              {systemDefinition[System.FARENHEIT].label}
            </h6>
            <h6 className="text-sm capitalize">
              {weather.weather[0].description}
            </h6>
          </div>
        </div>

        <div className="flex px-4 pb-4 gap-y-2 text-sm justify-between">
          <div>
            <div className="flex justify-between gap-2">
              <h6>High:</h6>
              <h6>
                {weather.main.temp_max}
                {systemDefinition[System.FARENHEIT].label}
              </h6>
            </div>
            <div className="flex justify-between gap-2">
              <h6>Low:</h6>
              <h6>
                {weather.main.temp_min}
                {systemDefinition[System.FARENHEIT].label}
              </h6>
            </div>
          </div>
          <div>
            <div className="flex justify-between gap-2">
              <h6>Lat:</h6>
              <h6>{weather.coord.lat}</h6>
            </div>
            <div className="flex justify-between gap-2">
              <h6>Lon:</h6>
              <h6>{weather.coord.lon}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
