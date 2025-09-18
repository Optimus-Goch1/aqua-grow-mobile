# Aqua Grow - Smart Irrigation System

A React Native mobile application for managing smart irrigation systems using IoT sensors and automated controls.

## Overview

Aqua Grow is a mobile application that allows users to monitor and control irrigation systems remotely. The app connects to IoT devices (ESP32) to read sensor data (temperature, moisture) and provides both manual and automatic irrigation control based on configurable thresholds.

## Features

- **User Authentication**: Secure login and signup functionality
- **Farm Management**: Create, update, and delete farm configurations
- **Real-time Monitoring**: View live sensor data (temperature, moisture levels)
- **Manual Control**: Toggle irrigation systems on/off manually
- **Automatic Control**: Set moisture and temperature thresholds for automated irrigation
- **Multi-farm Support**: Manage multiple farms/irrigation systems
- **Cross-platform**: Runs on iOS, Android, and Web

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 7.x
- **State Management**: React Context API
- **HTTP Client**: Axios
- **UI Components**: React Native built-in components with custom styling
- **Icons**: Expo Vector Icons
- **Storage**: AsyncStorage for local data persistence

## Architecture

The application follows a microservices architecture with three main backend services:
- **User Service**: Handles authentication and farm management
- **Monitoring Service**: Manages sensor data collection
- **Irrigation Service**: Controls irrigation system operations

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `app.json` under the `extra` section:
   - `API_KEY`: Authentication key for services
   - `USER_SERVICE_URL`: Backend URL for user management
   - `MONITORING_SERVICE_URL`: Backend URL for sensor data
   - `IRRIGATION_SERVICE_URL`: Backend URL for irrigation control

4. Start the development server:
   ```bash
   npm start
   ```

## Running the Application

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

## Key Components

### Authentication
- Login and signup screens with JWT token management
- Secure token storage using AsyncStorage

### Farm Management
- Create and configure new farms
- Edit farm settings and thresholds
- Delete existing farms

### Irrigation Control
- Manual irrigation toggle
- Automatic threshold configuration for:
  - Moisture levels (min/max thresholds)
  - Temperature levels (min/max thresholds)
- Real-time sensor data monitoring

### Navigation
- Tab-based navigation for main features
- Stack navigation for detailed screens
- Authentication flow management

## API Integration

The app integrates with three backend services:

1. **User Service** (`/user/user/`)
   - Authentication endpoints
   - Farm CRUD operations
   - Threshold management

2. **Monitoring Service** (`/sensor/sensor/`)
   - Sensor data retrieval
   - Real-time monitoring

3. **Irrigation Service** (`/irrigation/irrigation/`)
   - Irrigation control
   - System status management

## Configuration

### Environment Variables
The application uses environment variables defined in `app.json`:
- Service URLs for different backend services
- API keys for authentication
- Project configuration for Expo

### Styling
- Custom StyleSheet components for consistent UI
- Responsive design for multiple screen sizes
- Theme colors and typography using Nunito font family

## Project Structure
