<div align="center">
  <h1 align="center">Tickking Frontend 🚀</h1>
  <p align="center">
    A feature-rich, security-first frontend for a modern ticketing platform.
  </p>
</div>

---

### 📋 Table of Contents

- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Getting Started](#getting-started)
- [Backend Repository](#backend-repository)

---

### ✨ Key Features

- **🔒 Secure Authentication**: Implemented OAuth 2.0 for secure, token-based user authentication.
- **🌐 Centralized API Layer**: All API interactions are handled through a single, consistent layer, simplifying maintenance and debugging.
- **State Management**: Utilized Redux for predictable and centralized state management.
- **🗺️ Declarative Routing**: Clean and manageable routing with `react-router-dom`, separating public and private routes.
- **🌍 Internationalization (i18n)**: Built-in support for multiple languages to ensure a global reach.
- **🎨 Modern UI**: A responsive and intuitive user interface built with React and styled with Tailwind CSS.
- **🛠️ Custom Hooks**: Reusable custom hooks to encapsulate and share logic across components.
- **⚙️ Environment-Based Configuration**: Different configurations for development and production environments.

---

### 💻 Technology Stack

- **Frontend**: `React` `Vite` `JavaScript (ES6+)` `HTML5` `CSS3`
- **Styling**: `Tailwind CSS`
- **State Management**: `Redux`
- **Routing**: `React Router`
- **API Client**: `Axios`
- **Internationalization**: `i18next`

---

### 📂 Project Structure

The project follows a modular and scalable structure, designed for clarity and maintainability.

```
src
├── assets/         # Static assets like fonts and images
├── components/     # Reusable UI components (common, layout, providers)
├── config/         # Application-wide configurations (Axios, i18n, Redux)
├── constant/       # Application constants (routes, error codes)
├── context/        # React context providers
├── data/           # Mock or static data
├── hooks/          # Custom React hooks
├── lib/            # Third-party libraries or utilities
├── route/          # Route definitions and components
├── screen/         # Top-level screen components
├── service/        # API service layer
└── util/           # Utility functions
```

---

### 🧠 Core Concepts

#### Security-First Design

The application is built with security as a top priority. It uses **OAuth 2.0** for authentication, ensuring that user data is protected. All API requests are sent with a secure token, and the frontend is designed to handle authentication state gracefully.

#### Centralized API Service Layer

To ensure consistency and maintainability, all HTTP requests are managed through a central `axios` instance (`src/config/axios.config.js`). A wrapper function (`src/util/request.js`) is used by all services, providing a single point for logging, error handling, and request modification.

#### Scalable State Management

Global application state, such as user authentication status and user information, is managed by **Redux**. The Redux store is configured in `src/config/redux.store.config.js`, providing a single source of truth and making the application's state predictable and easy to debug.

---

### 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/tickking-fe.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., `VITE_API_URL`).
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open the application**:
    Navigate to `http://localhost:5173`.

---

### 🌐 Backend Repository

The backend for this project can be found at:
[https://github.com/hwHoai/ticketbooking-be](https://github.com/hwHoai/ticketbooking-be)

This backend provides the necessary REST APIs for authentication, ticket management, and booking.
