
# PitchTalk - macOS Setup
## Prerequisites

- **Homebrew**: A package manager for macOS.
- **Node.js (version 18.x or later)**
- **npm** (comes with Node.js)
- **Expo** CLI (for development and testing)
- **nvm** (optional, for managing Node.js versions)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

&nbsp;
### Installing Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
### Installing Node.js and npm with Homebrew
```bash
brew install node
```
### Installing nvm (optional)
```bash
brew install nvm
```
### Installing Expo CLI
```bash
npm install -g expo-cli
```

&nbsp;
### Installing Xcode
For iOS development, you need Xcode. Install it via the Mac App Store:
1. Open the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12).
2. Search for "Xcode".
3. Click "Get" to download and install Xcode.

Alternatively, install Xcode via Homebrew:
```bash
brew install --cask xcode
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
# If using nvm, ensure you are using the correct Node.js version
# nvm use (optional, if you have nvm installed)
npm install
```

### Start the development server:

```bash
npm start
```
&nbsp;
### Run the app on an iOS simulator or Android emulator:
#### If you have an Expo account:

For iOS:

```bash
npm run ios
```
For Android:

```bash
npm run android
```

&nbsp;
#### If you prefer not to use Expo:

For iOS:
```bash
npx react-native run-ios
```
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
If you encounter macOS compatibility or dependency issues with iOS development, please ensure you have CocoaPods installed. You can install CocoaPods using Homebrew with the following command:

```bash
brew install cocoapods
```
After installing CocoaPods, navigate to the ios folder and run:

```bash
cd ios
pod install
```
This command installs the necessary CocoaPods dependencies for iOS development.
