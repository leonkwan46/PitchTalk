
# PitchTalk - Windows Setup
## Prerequisites

- **Node.js (version 18.x or later)**
- **npm** (comes with Node.js)
- **Expo** CLI (for development and testing)
- **Android Studio** (for Android development)

&nbsp;

### Installing Node.js and npm with Homebrew
- Download the Node.js installer from the [official website](https://nodejs.org/en).
- Run the installer and follow the prompts to install Node.js and npm.

### Installing Expo CLI
- Open Command Prompt or PowerShell.
- Install Expo CLI globally using npm:
```bash
npm install -g expo-cli
```

&nbsp;
### Installing Android Studio

1. Go to the [Android Studio download page](https://developer.android.com/studio).
2. Click "Download Android Studio" and follow the instructions for Windows.
3. Run the downloaded installer and follow the setup wizard to complete the installation.

### Setting Up Android Emulator

1. Open Android Studio.
2. Go to **Configure** > **AVD Manager**.
3. Click **Create Virtual Device** and follow the prompts to set up an emulator.

&nbsp;

## Getting Started
### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash
npm start
```
&nbsp;
### Run the app on an Android emulator:
#### If you have an Expo account:
For Android:

```bash
npm run android
```

&nbsp;
#### If you prefer not to use Expo:
For Android:

```bash
npx react-native run-android
```
&nbsp;


## Running Tests

### Unit Tests

To run unit tests, use the following command:

```bash
npm test
```

### End-to-End (e2e) Tests
To run end-to-end tests using Maestro, use the following command:

```bash
npx maestro test 
```

&nbsp;

## Troubleshooting
If you encounter issues with the Android emulator, ensure you have the latest version of Android Studio and SDK tools. You might need to update or install additional SDK components via the SDK Manager in Android Studio.
