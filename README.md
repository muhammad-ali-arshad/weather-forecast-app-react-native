# Weather Forecast App — React Native

A cross-platform mobile weather application built with **React Native** and **Expo**. It delivers real-time weather data and 7-day forecasts for any city, with a modern UI and local persistence of the last viewed location.

---

## Purpose

This app provides:

- **Current weather** — Temperature, condition, wind speed, humidity, and sunrise
- **7-day forecast** — Daily outlook with conditions and average temperature
- **City search** — Find and switch between locations worldwide
- **Offline memory** — Remembers your last selected city via local storage

It is designed as a portfolio-ready mobile project demonstrating React Native, Expo, third-party APIs, and production-style structure (navigation, theming, and utilities).

---

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | React Native 0.81 | Cross-platform (iOS, Android, Web) |
| **Tooling** | Expo (SDK 54) | Build, run, and deploy without native project setup |
| **Routing** | Expo Router | File-based routing and layout (Stack) |
| **Navigation** | React Navigation (Native Stack) | Screen transitions and navigation |
| **Styling** | NativeWind (Tailwind CSS) | Utility-first, responsive UI |
| **HTTP** | Axios | Requests to Weather API |
| **Persistence** | `@react-native-async-storage/async-storage` | Store last selected city |
| **API** | [WeatherAPI.com](https://www.weatherapi.com/) | Forecast, current weather, and location search |
| **Utilities** | Lodash (debounce) | Throttled search while typing |
| **UI** | `expo-image`, `react-native-progress`, `@expo/vector-icons` | Images, loading, icons |

---

## Project Structure

```
weather-forecast-app-react-native/
├── client/                 # React Native (Expo) application
│   ├── app/                 # Expo Router: _layout, index
│   ├── api/                 # weather.js — WeatherAPI calls (forecast, locations)
│   ├── assets/              # Icons and weather/UI images
│   ├── constants/           # weatherImages mapping, app constants
│   ├── navigation/          # appNavigation.jsx — Stack navigator
│   ├── screens/             # Homescreen.js — main weather UI
│   ├── theme/               # Theming (e.g. bgWhite)
│   ├── utils/               # asyncStorage helpers (getData, storeData)
│   ├── global.css           # NativeWind / Tailwind entry
│   ├── tailwind.config.js
│   ├── package.json
│   └── app.json             # Expo config
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- [Expo Go](https://expo.dev/go) on a device, or iOS Simulator / Android Emulator

### 1. Clone and install

```bash
git clone https://github.com/muhammad-ali-arshad/weather-forecast-app-mern.git
cd weather-forecast-app-mern
cd client
npm install
```

### 2. API key (WeatherAPI.com)

1. Sign up at [weatherapi.com](https://www.weatherapi.com/) and get an API key.
2. Create a `.env` in the `client/` folder (or set in your environment):

   ```
   EXPO_PUBLIC_WEATHER_API=your_api_key_here
   ```

3. Restart the Expo dev server after changing env vars.

### 3. Run the app

```bash
cd client
npx expo start
```

Then:

- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Or scan the QR code with Expo Go on a physical device

---

## Available Scripts (client/)

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run in the browser |
| `npm run lint` | Run ESLint |

---

## How It’s Built

- **Weather data**: `api/weather.js` calls WeatherAPI’s `forecast.json` (current + 7 days) and `search.json` (city search). `EXPO_PUBLIC_WEATHER_API` is used so the key is available in the app at runtime.
- **Search**: Search input uses Lodash `debounce` (200 ms) to limit API calls while typing. Results come from `search.json`; selecting a city triggers a forecast request and saves the city in AsyncStorage.
- **Persistence**: On launch, the app reads the last city from AsyncStorage; if none exists, it defaults to `Islamabad`. After each city selection, the choice is stored for the next session.
- **UI**: `Homescreen` shows current weather, condition image (from `constants/`), wind, humidity, sunrise, and a horizontal list of 7-day forecast cards. Styling uses NativeWind classes and a shared `theme` for colors and transparency.
- **Navigation**: Expo Router handles `app/` entry and `_layout`; `appNavigation.jsx` defines a Stack with `Home` as the only screen (header hidden for a full-screen weather layout).

---

## Author

**Muhammad Ali Arshad**

---

## License

This project is for portfolio and learning purposes.
