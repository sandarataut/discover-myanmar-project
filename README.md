# discover-myanmar-project

A Cultural Journey Through Interactive Technology

Explore Myanmar's fascinating cultural and historical heritage with the "Discover Myanmar" mobile app. This interactive tool provides a distinctive learning opportunity, enabling users to delve into Myanmar's language, history, and culture through engaging modules.

## How to Run the Project

Follow these steps to set up and run the project locally on your machine:

### 1. Clone the Repository

First, clone the Discover Myanmar project repository to your local machine using Git. Open your terminal and run the following commands:

```bash
git clone git@github.com:sandarataut/discover-myanmar-project.git
cd discover-mm-project
```

### 2. Install Dependencies and Run the Project

After navigating into the project directory, install all required dependencies using Yarn:

```bash
yarn install
yarn start
```

## Resources

- [Tesseract.js](https://github.com/naptha/tesseract.js#tesseractjs)
- [Text Animation of text drawing](https://github.com/Shopify/react-native-skia/discussions/879)
- [How can I trace letters?](https://github.com/Shopify/react-native-skia/discussions/2184)
- [performance drawing/painting using skia ](https://github.com/Shopify/react-native-skia/discussions/1989)
- [How To Use MVVM in React Using Hooks and TypeScript](https://www.perssondennis.com/articles/how-to-use-mvvm-in-react-using-hooks-and-typescript#user-content-mvvm-overview)
- [React Native Documentation] (https://reactnative.dev/docs/getting-started)
- [Integrating Firebase with React Native] (https://medium.com/@abhishekgarg.dev/integrating-firebase-with-react-native-075f0aca64b8)
- [Add Firebase to your JavaScript Project] (https://firebase.google.com/docs/web/setup)
- [Cloud Firestore Documentation] (https://firebase.google.com/docs/firestore)
- [Firebase Authentication Documentation] (https://firebase.google.com/docs/auth)

## Dependencies

### Core Technologies and Frameworks:

- TypeScript: A statically typed superset of JavaScript improves code maintainability and reduces errors by detecting potential issues early in development.
- React Native: This framework helped create a mobile app that works well on both iOS and Android devices, providing a consistence and smooth user experience.
- Expo: It makes easier to develop React Native apps by providing tools and services that simplify the process of building, deploying and updating the apps. It also gives access to native device features.

### State Management:

- Jotai: Chosen for its simplicity and ease of use in managing the app’s state, a state management library that is lightweight and flexible.

### UI/UX and Styling:

- NativeWind: A styling library that utilizes Tailwind CSS-style utility classes to ensure a consistent and visually appealing user interface on different platforms.
- React Native SVG: It allows the incorporation of scalable vector graphics (SVGs) in the app, offering flexibility and high visual quality for icons and illustrations.
- Tailwind CSS & Tailwind Merge: Tailwind CSS simplifies styling and Tailwind Merge enhances the generated CSS for production builds.

### Form Handling:

- React Hook Form: A tool that makes creating and managing forms in React and handles form state, validation and submission.
- @hookform/resolver: It provides integration between React Hook Form and validation library, Yup.
- Yup: A JavaScript schema builder is used to create validation schemas and validate user input to ensure data integrity.

### Navigation and User Experience:

- Expo Router: A file-based router simplifying navigation and enabling deep linking within Expo projects.
- React Native Gesture Handler: It offers seamless and responsive gesture control for touch-based interactions.
- React Native Reanimated: It improves animations and interactions to make user experience better.
- React Native Screens: It optimizes screen transitions and performance.

### Data Storage and Backend Integration:

- @react-native-async-storage/async-storage: It provides asynchronous key-value storage for persisting data locally on the device.
- Expo Secure Store: It enables secure storage of sensitive data, such as user authentication token.
- Firebase: A platform in the backend that is comprehensive offering authentication, real-time database, cloud messaging, and storage services.

### Development and Testing Tools:

- ESLint and Prettier: These tools make sure code style consistency and automated code formatting, making the code easier to read and reducing the chance of errors.

## Task Checklist

Use the checkboxes below to track the completion of tasks.

- [x] MSD-9 Environment Setup & Skill Lvl Up
  - [x] Config Nativewind(style), Expo router, Fonts, Colors and necessary libs
  - [x] Setup Firebase
  - [x] ESLint and Prettier
- [x] MSD-10 Splash & Onboarding Screens
  - [x] Splash Screen
  - [x] Onboarding - Stepper
  - [x] Onboarding - Get started
  - [x] Onboarding - Three Questions
  - [x] Onboarding - Request Notification Permission
- [] MSD-11 Loading Screen - No need
- [x] MSD-12 Login Screen
- [x] MSD-13 Forget Password Screen
- [x] MSD-14 Registeration Screen
- [x] MSD-15 Registeration Success Screen
- [x] MSD-16 Home Screen
  - [x] App Bottom Tabs
- [x] MSD-20 Notifications Screen ( UI + \_ )
- [x] MSD-21 User Profile Screen
- [x] MSD-22 User Profile Update Screen
- [x] MSD-17 Myanmar Fact Screen
- [x] MSD-18 Myanmar Characters Screens
- [x] MSD-19 Myanmar Numbers Screen
- [x] MSD-23 Leaderboard Screen
- [] MSD-24 Achievement / Progress Screens
