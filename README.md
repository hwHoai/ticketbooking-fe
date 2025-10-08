# Tickking (Frontend) 🚀

This is a personal side project built to translate frontend engineering theory into practice. It focuses on security-first design, performance optimization, and clean, maintainable code. The codebase demonstrates secure auth handling, a centralized API layer, and a modular structure designed for easy reviews and future feature expansion — making it practical for teams who value reliability, scalability, and clear engineering practices.

## Outline 🗂️

- [Key Highlights](#key-highlights)
- [Project Structure](#project-structure)
- [Backend Repository](#backend-repository)
- [Core Concepts](#core-concepts)
- [Local Development](#local-development)

## Key Highlights

- **Modern Stack**: React, Vite, and Tailwind CSS.
- **Predictable Architecture**: A clear separation between UI (`components`/`screen`), infrastructure (`config`), services (`service`), and utilities (`util`).
- **Centralized API Layer**: A single `axios` instance and request wrapper (`src/util/request.js`) for consistent API interactions.
- **Organized Routing**: Separate route definitions for public and private areas of the application (`src/route/PublicRoute.jsx`, `src/route/PrivateRoute.jsx`).
- **Global State Management**: Redux is configured for managing application-wide state (`src/config/redux.store.config.js`).
- **Internationalization**: i18n is set up for multi-language support (`src/config/i18n.js`).

## Project Structure

```
src ── assets/       (fonts, images)
    ├─ components/  (common/, layout/, provider/)
    ├─ config/      (axios.config.js, i18n.js, oauth.config.js, redux.store.config.js, locale/)
    ├─ constant/    (common.js, error.code.js, routePath.jsx, selectOptions.js, selectStyles.js)
    ├─ context/
    ├─ data/        (tickets.js)
    ├─ hooks/       (draw_tools/)
    ├─ lib/         (redux/)
    ├─ route/       (PublicRoute.jsx, PrivateRoute.jsx)
    ├─ screen/      (Auth-Callback.jsx, CommingSoon.jsx, NotFound.jsx, account/, create_event/, home/, ticket_detail/, ticket_list/)
    ├─ service/     (user/)
    └─ util/        (cookie.util.js, logger.js, request.js)
```

(Above tree is horizontal at the top level under `src` and shows key folders and notable files present in the repository.)

## Core Concepts

### Routing

The application uses a declarative routing pattern. Routes are defined as arrays of objects in `src/route/PublicRoute.jsx` and `src/route/PrivateRoute.jsx`. This makes it easy to see all available paths and manage access control. Route paths are managed in `src/constant/routePath.jsx` to prevent magic strings.

### API Service Layer

All HTTP requests are managed through a central `axios` instance defined in `src/config/axios.config.js`. A wrapper function at `src/util/request.js` is used by all services to ensure that requests are consistent and that logging or error handling can be managed globally.

### State Management

Global state, such as user authentication status, is handled by Redux. The store and its configuration can be found in `src/config/redux.store.config.js`.

## Local Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Create a `.env` file in the root directory and add the necessary environment variables (e.g., `VITE_API_URL`).
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Open the application**:
    Navigate to `http://localhost:5173`.

## Backend Repository

The backend implementation that this frontend consumes is available at:

https://github.com/hwHoai/ticketbooking-be

The backend provides the REST APIs for authentication, ticket data, and booking flows used by this project.
