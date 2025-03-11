import { useEffect } from 'react';
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, type AppDispatch, type RootState } from './redux/store';
import { fetchFacilitiesData, fetchLocationsData } from './redux/dataSlice';
import { fetchWeatherData } from './redux/weatherSlice';
import { fetchForecastData } from './redux/forecastSlice';
import { processFacilities } from './redux/formattedFacilityWeatherSlice';

import Footer from './components/Footer';

import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Hippo Harvest Front Case Study</title>
      </head>
      <body className="h-screen flex flex-col min-h-screen lg:px-48 md:px-24">
        <Provider store={store}>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  const locations = useSelector(
    (state: RootState) => state.databaseData.locations.data
  );
  const facilities = useSelector(
    (state: RootState) => state.databaseData.facilities.data
  );

  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchForecastData());
    dispatch(fetchLocationsData());
    dispatch(fetchFacilitiesData());
  }, [dispatch]);

  useEffect(() => {
    if (locations.length) {
      dispatch(fetchWeatherData());
    }
  }, [locations, dispatch]);

  useEffect(() => {
    if (
      weather.status === 'succeeded' &&
      facilities.length &&
      locations.length
    ) {
      dispatch(
        processFacilities({
          facilities: facilities,
          locations: locations,
          weather,
        })
      );
    }
  }, [locations, facilities, weather.status, dispatch]);
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
