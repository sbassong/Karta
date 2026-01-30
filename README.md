# Karta - Geospatial Community Platform

<p align="center">
  <h3 align="center">Mobile Application for Rural Service Access</h3>
  <p align="center">
    A geospatial, community-sourced mobile application built with React Native and Expo. Karta aims to improve awareness and access to critical services in rural areas by mapping locations of essential facilities.
    <br />
    <br />
    <a href="#microservices-architecture">View Backend Architecture</a>
  </p>
</p>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#microservices-architecture">Microservices Architecture</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#configuration">Configuration</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project

**Karta** is designed to bridge the information gap in rural communities. By leveraging community-sourced data and geospatial technology, it allows users to locate, view, and contribute information about essential services such as healthcare facilities, water sources, and educational institutions.

The app uses **MapLibre** for rendering interactive maps and integrates with **Firebase** for reliable push notifications regarding service updates or community alerts.

### Key Features

* **Interactive Mapping**: Visualize essential services on a performant, vector-based map using **MapLibre**.
* **Push Notifications**: Receive real-time updates and alerts via **Firebase Cloud Messaging**.
* **Image Contributions**: Users can capture and upload photos of locations using the device camera or gallery.
* **Secure Authentication**: Includes Login and Registration screens backed by secure token storage.
* **Cross-Platform**: Optimized for both Android and iOS devices using **Expo**.

### Built With

* [React Native](https://reactnative.dev/)
* [Expo SDK](https://expo.dev/)
* [MapLibre React Native](https://github.com/maplibre/maplibre-react-native)
* [React Native Firebase](https://rnfirebase.io/)
* [React Navigation](https://reactnavigation.org/)
* [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

## Microservices Architecture

This mobile application serves as the frontend client for a larger distributed system. It interacts with several specialized microservices to handle data processing, authentication, and media management.

You can find the source code for the backend services here:

1.  **Authentication Service**: Handles user identity, JWT generation, and secure session management.
    * [https://github.com/sbassong/auth-service](https://github.com/sbassong/auth-service)
2.  **Notifications Service**: Manages the dispatch of push notifications to user devices via Firebase.
    * [https://github.com/sbassong/notifications-service](https://github.com/sbassong/notifications-service)
3.  **Image Uploader Service**: handles the processing, storage, and retrieval of user-uploaded images.
    * [https://github.com/sbassong/image-uploader-microservice](https://github.com/sbassong/image-uploader-microservice)
4.  **Reporting Service**: Handles user reports on the status of points of interests (locations)
    * [https://github.com/sbassong/reporting-service](https://github.com/sbassong/reporting-service)
5.  **Karta-backend**: Serves as the points of interest source.
    * [https://github.com/sbassong/karta-backend](https://github.com/sbassong/karta-backend)

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **Expo Go** app on your physical device, or an Android/iOS Emulator (I recommend Android Studio).
* **Firebase Account** A google account with access to Firebase cloud services

### Installation

1.  Clone the repo
    ```bash
    git clone https://github.com/sbassong/karta.git
    ```
2.  Navigate into the project directory
    ```bash
    cd karta
    ```
3.  Install dependencies
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root directory. You can use the following template:

```env
# URLs of hosted microservices
EXPO_PUBLIC_AUTH_BASE_URL="https://auth-service-ashy.vercel.app/auth"
EXPO_PUBLIC_NOTIFICATIONS_BASE_URL="https://notifications-service-omega.vercel.app/notifications"
EXPO_PUBLIC_IMAGE_BASE_URL="https://image-uploader-microservice.vercel.app/upload"
EXPO_PUBLIC_REPORTING_BASE_URL="https://reporting-service-theta.vercel.app/reports"

# VAPID key for web push
EXPO_PUBLIC_VAPID_PUBLIC_KEY="Your-vapid-public-key-for-web-based-push-notifications"

# Backend URLs (whether running app from an android device or emulator)
EXPO_PUBLIC_BASE_URL_LOCAL="http://localhost:3001"
EXPO_PUBLIC_BASE_URL_ANDROID="http://10.0.0.28:3001"
```

### Configuration

This project uses `app.config.js` to dynamically generate Google Services configuration files for Firebase. You must set the following environment variables in your `.env` file (or your build environment):

```env
# Base64 encoded string of your google-services.json (Android)
EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES="your-base64-encoded-google-services-json"

# Base64 encoded string of your GoogleService-Info.plist (iOS)
EXPO_PUBLIC_IOS_GOOGLE_SERVICES="your-base64-encoded-google-service-info-plist"
```

The application will automatically write these to the appropriate files (`google-services.json` and `GoogleService-Info.plist`) when the config is loaded.

---

## Usage

### Prebuilding the app
```bash
npx expo prebuild --platform android   
```

### Development Build (Recommended)
This project uses native code (MapLibre, Firebase), so you should use a Development Build instead of the standard Expo Go client for full functionality.

```bash
# Start the development server
npx expo start --dev-client
```

### Run on Android Emulator (Android Studio)
```bash
npx expo run:android
```

---

## Contact

Samuel Bassong – sam.bassong@gmail.com - [linkedin.com/in/sambassong](https://www.linkedin.com/in/sambassong/)