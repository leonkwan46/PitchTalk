# PitchTalk

## Overview

PitchTalk is a React Native application designed to enhance communication between teachers, parents, and students through a comprehensive chat system.

## Features

- **Real-time Messaging**: Facilitates instant communication between teachers, parents, and students.
- **Profile Management**: Allows users to manage their profiles and display role-based profile pictures.
- **Role-Based Access**: Restricts certain functionalities to specific user roles (e.g., only teachers can create rooms).
- **Invitation System**: Enables sending invitation codes via email for account creation.

## Getting Started

To get started with PitchTalk, please follow the appropriate instructions for your operating system:

- [macOS Users](README-macOS.md)
- [Windows Users](README-Windows.md)
- [Linux Users](README-Linux.md)

**Note:** If you do not have an Expo account or prefer not to use Expo, you can use `npx react-native` commands to run the app:

- For iOS: `npx react-native run-ios`
- For Android: `npx react-native run-android`

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
