
# PitchTalk - macOS Setup
&nbsp;
## Prerequisites

- **Homebrew**: A package manager for macOS.
- **Node.js (version 18.x or later)**
- **npm** (comes with Node.js)
- **Expo** CLI (for development and testing)
- **nvm** (optional, for managing Node.js versions)
- **Xcode** (for iOS development)
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
### Installing Xcode
For iOS development, you need Xcode. Install it via the Mac App Store:
1. Open the Mac App Store.
2. Search for "Xcode".
3. Click "Get" to download and install Xcode.

Alternatively, install Xcode via Homebrew:
```bash
brew install --cask xcode
```

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
### Clone the repository:

```bash
git clone https://github.com/leonkwan46/PitchTalk.git
cd PitchTalk
```
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
