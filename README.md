# 🏥 Ayomama Frontend

> **Maternal Health Tracking App for African Mothers**

![Ayomama Banner]
## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack-)
- [Project Structure](#project-structure-)
- [Features](#features-)
- [Installation](#installation-)
- [Development](#development-)
- [Testing](#testing-)
- [Contributing](#contributing-)

## 🎯 Overview

Ayomama is a **maternal health tracking app** designed specifically for Nigerian and African mothers. This frontend repository contains the user interface and client-side logic built to support pregnant women and community health workers in **low-connectivity environments**.

**Key Focus Areas:**

- 🤰 Mother-centered design
- 📱 Offline-first functionality
- 🎧 Multi-language audio support
- 🏥 Emergency response features
- 👩‍⚕️ CHW integration

## 🛠 Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| **Framework**        | React Native
| **State Management** | Redux Toolkit                |
| **Navigation**       | React Navigation             |
| **Offline Storage**  | AsyncStorage + Redux Persist |
| **Languages**        | TypeScript, JavaScript       |
| **Styling**          | Styled Components            |
| **Icons**            | React Native Vector Icons    |

## 📁 Project Structure

src/
├── 📦 components/ # Reusable UI components
│ ├── common/ # Buttons, inputs, modals
│ ├── mothers/ # Mother-specific components
│ └── chw/ # CHW-specific components
├── 🖥 screens/ # App screens
│ ├── mothers/ # Mother user flows
│ ├── chw/ # CHW dashboard flows
│ └── auth/ # Authentication flows
├── 🧭 navigation/ # Navigation configuration
├── 🗃 store/ # Redux store and slices
├── 🔌 services/ # API calls and external services
├── 🛠 utils/ # Helper functions
├── 🎨 assets/ # Images, icons, audio files
├── ⚙️ constants/ # App constants
└── 📝 types/ # TypeScript type definitions

text

## ✨ Features

### 🎯 Must-Have (MVP)

| Feature                     | Status | Description                                |
| --------------------------- | ------ | ------------------------------------------ |
| **Antenatal Visit Tracker** | ✅     | Smart reminders via push, SMS, voice notes |
| **Pregnancy Milestones**    | ✅     | Local context with visual references       |
| **Emergency SOS Button**    | ✅     | Offline capability with GPS                |
| **Medication Tracker**      | ✅     | Audio prompts for low literacy             |
| **Local Language Audio**    | ✅     | Yoruba, Igbo, Hausa, English               |
| **CHW Dashboard**           | ✅     | Risk flag system (🟢/🟡/🔴)                |
| **Offline-First**           | ✅     | Data sync when online                      |

### 🔄 Secondary Features

| Feature                    | Status | Description                          |
| -------------------------- | ------ | ------------------------------------ |
| Community Mother Circles   | 🚧     | Language-based discussion spaces     |
| Emergency Facility Mapping | 🚧     | Offline maps with hospital locations |
| Symptom Checker            | 🚧     | Red flag alerts system               |
| Partner/Family Mode        | 🚧     | Shared responsibility features       |

## 🚀 Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development)

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/ayomama/frontend.git
cd ayomama-frontend

# 2. Install dependencies
npm install

# 3. Install iOS dependencies (if developing for iOS)
cd ios && pod install && cd ..

# 4. Start the development server
npm start

# 5. Run on Android
npm run android

# 6. Run on iOS
npm run ios
Environment Configuration
Create a .env file in the root directory:

env
# API Configuration
API_BASE_URL=your_api_url
SMS_API_KEY=your_sms_service_key

# Maps & Location
MAPS_API_KEY=your_maps_api_key
EMERGENCY_HOTLINE=+234-XXX-XXXX

# App Settings
SYNC_INTERVAL=300000
DEFAULT_LANGUAGE=en
💻 Development
Code Style Guidelines
✅ Use TypeScript for type safety

✅ Follow React Native best practices

✅ Implement proper error boundaries

✅ Write descriptive component names

✅ Use functional components with hooks

Accessibility Standards
🎯 Large, touch-friendly buttons (min 44px)

🎯 High contrast color schemes

🎯 Voice-over and screen reader support

🎯 Audio alternatives for text content

🎯 Simple, recognizable icons

Offline-First Example
typescript
// Example: Offline-first data sync
const syncVisits = async (visits: Visit[]) => {
  try {
    // 1. Store locally first
    await AsyncStorage.setItem('pending_visits', JSON.stringify(visits));

    // 2. Attempt server sync
    const response = await api.syncVisits(visits);

    // 3. Clear local storage on success
    if (response.success) {
      await AsyncStorage.removeItem('pending_visits');
    }
  } catch (error) {
    // 4. Data remains available offline
    console.log('Sync failed - data stored locally for offline access');
  }
};
🧪 Testing
bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test accessibility
npm run test:accessibility

# Test offline functionality
npm run test:offline

# Run all tests with coverage
npm run test:coverage
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit your changes: git commit -m 'Add amazing feature'

Push to the branch: git push origin feature/amazing-feature

Open a Pull Request

Branch Naming Convention
feature/ - for new features

fix/ - for bug fixes

docs/ - for documentation updates

refactor/ - for code refactoring

🆘 Support
Channel	Contact
GitHub Issues	Create an issue
Email	dev-support@ayomama.org
Slack	#ayomama-frontend
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Nigerian Ministry of Health

Partner NGOs and healthcare organizations

Community health workers and mothers

Open source healthcare technology community
```
