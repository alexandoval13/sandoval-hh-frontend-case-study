## Requirments

It’s the year 2028, and your task is to build a temperature control system for Hippo’s nationwide network of production facilities, which are distributed around the United States. The system is a relatively simple one, that lets the facilities coordinator view some aspects of the weather at each location, and set the target temperature for that facility.

The goals for this project are to demonstrate your ability to:

- Interact with a backend API
- Display data and support interactions around that data
- Design an intuitive UI that supports your target use cases

## Features

The app includes:

- **Viewing Weather Information** for each facility
- **Setting and Managing Target Temperature** for each facility
- **Facility Forms** for adding facilities
- **Interactive UI**: A clean, user-friendly interface to view, add, and adjust facility data
- **Facility Sorting and Searching**: Allows the user to filter or sort facilities based on input or selection criteria

## Technologies Used

- **React**: Used for building the user interface and managing the component-based architecture.
- **TypeScript**: Ensures type safety and improves development experience with strong typing in JavaScript.
- **Redux**: State management library to handle and centralize the application state.
- **Tailwind CSS**: A utility-first CSS framework for styling, providing quick and customizable UI elements.
- **OpenWeatherMap API**: Provides weather data for the facilities based on their locations.
- **Figma**: Used for designing the UI/UX of the application and creating the overall visual structure.
- **Formik**: A library for building forms in React, providing features such as form validation, error handling, and managing form state efficiently.

## Suggestions for Further Development

### 1. **Weather Forecast**

- Implement a feature to display a 5-7 day weather forecast using OpenWeatherMap's bulk weather data. This would allow users to see upcoming weather trends and make more informed decisions about temperature settings for each facility.
- **Use case**: A facilities coordinator can plan ahead and adjust target temperatures for upcoming weather patterns.

### 2. **Custom Weather Alerts**

- Introduce custom alerts for specific weather conditions (e.g., high temperatures, severe weather events, rain, or snow). Alerts could trigger based on user-set parameters like temperature changes, weather events, or even rapid shifts in conditions.
- **Use case**: A user could receive a notification or an on-screen alert when a facility's weather conditions cross a predefined threshold (e.g., if the temperature exceeds a certain degree or a storm is expected).

### 3. **Grouping Data on Dashboard**

- Allow users to group facilities based on common weather patterns, location, or temperature ranges. This feature could be useful for managing multiple facilities in similar climates and adjusting them in bulk.
- **Use case**: A user could group facilities by temperature or location and then adjust them together to save time and ensure consistency across multiple sites.

### 4. **Bulk Selection**

- Implement bulk selection features for facilities, so users can select multiple facilities at once and perform actions like adjusting target temperatures or archiving records.
- **Use case**: A user could quickly adjust the target temperature for all facilities within a certain temperature range or select multiple facilities to archive at once.

### 5. **Edit/Archive/Remove Facility Records**

- Add functionality for users to edit, archive, or remove facility records from the system. This would allow for better management of facility data, especially when facilities are no longer in use or need adjustments to their data.
- **Use case**: A user could archive a facility that is no longer operational, or edit a facility's details if there are changes (e.g., address change, facility reorganization).

### Further Design Details

- [Figma Design File](https://www.figma.com/design/38OqjaVePbSyMsCmIX6NeO/HH-Frontend-Case-Study?node-id=1-2&t=9A7oRQLst2sspaQS-0)
- [Design Documentation](https://docs.google.com/document/d/11vwRmybwjb2FkywiK5DRqf80JeKW2V-4XbDjGnBSCsw/edit?usp=sharing)

## Getting Started

### Installation

Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Install the latest version of node:

```bash
nvm install --lts
nvm use --lts
```

Install the dependencies:

```bash
npm ci
```

### Add Api Key

Create a .env file in the in this directory.

```bash
# ./.env
VITE_REACT_APP_OPENWEATHERMAP_API_KEY=<paste-api-key-here>
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build into a docker image:

```bash
./build_and_run.sh
```

You can review the production build at <http://localhost:3000>
