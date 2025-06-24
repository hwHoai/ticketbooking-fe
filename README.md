# React + Vite + Tailwind Starter Template

A comprehensive, production-ready React starter template with modern tooling and best practices. This template provides a solid foundation for building scalable React applications with essential features pre-configured.

## 🚀 Features

### Core Technologies

- **React 19** - Latest React with modern features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **TypeScript Support** - Type-safe development (configured)

### Pre-configured Services & Utilities

#### 🌐 HTTP Client & API Management

- **Axios** - HTTP client with interceptors for services and error handling
- **Service Architecture** - Organized API calls in service classes
- **Token Management** - Automatic token refresh and validation
- **Cookie Service** - Browser cookie management utilities
- **Request Utility** - Utility function for enhanced API calls

#### 🌍 Internationalization (i18n)

- **React i18next** - Complete i18n solution for switching through several languages
- **Multi-language Support** - English and Vietnamese pre-configured
- **Dynamic Language Switching** - Runtime language changes
- **Organized Translation Files** - JSON-based translation management

#### 📝 Logging System

- **Multiple Log Levels** - Error, Warn, Info, Debug, Trace
- **Styled Console Output** - Color-coded logs with timestamps
- **Environment-based Logging** - Different log levels for dev/prod

#### 🎨 UI & Styling

- **Custom Font Integration** - OpenSans font family included
- **Tailwind PostCSS** - Latest Tailwind with PostCSS integration
- **Responsive Design Ready** - Mobile-first approach
- **CSS Variables** - Custom color scheme with CSS custom properties

#### 🔐 Authentication & Security

- **JWT Token Handling** - Access and refresh token management
- **Token Expiration Check** - Automatic token validation
- **Private/Public Routes** - Route protection based on authentication
- **Secure Cookie Storage** - HTTPOnly cookie support

#### 🛠 Development Tools

- **ESLint** - Code linting with React-specific rules
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for code quality
- **Hot Module Replacement** - Instant updates during development

## 📁 Project Structure

```
src/
├── assets/                    # Static assets
│   └── fonts/                # Font files (OpenSans variants)
├── component/                # Reusable components
│   └── common/               # Common components
├── config/                   # Configuration files
│   ├── axios.config.js       # Axios instance and interceptors
│   ├── i18n.js              # Internationalization setup
│   └── locale/              # Translation files
│       ├── en.json          # English translations
│       └── vi.json          # Vietnamese translations
├── constant/                 # Application constants
│   ├── error.code.js        # Error code definitions
│   └── routePath.jsx        # Route path constants
├── route/                   # Routing configuration
│   ├── PrivateRoute.jsx    # Protected routes (Need authentication)
│   └── PublicRoute.jsx     # Public routes
├── screen/                  # Page components
│   ├── auth/               # Authentication pages
│   │   ├── LoginPage.jsx       # Login page
│   │   └── RegisterPage.jsx    # Registration page
│   └── home/               # Home page
│       └── HomePage.jsx        # Main home page
├── service/                # Business logic services
│   ├── common/             # Common utilities
│   │   ├── cookie.service.js    # Cookie management
│   │   └── token.service.js     # JWT token utilities
│   └── user/               # User-related services
│       └── auth/           # Authentication services
│           ├── user.authentication.service.js  # Auth service
│           ├── user.login.service.js           # Login service
│           └── user.register.service.js        # Register service
├── util/                   # Utility functions
│   ├── logger.js          # Browser logging utility
│   └── request.js         # HTTP request utility
├── App.jsx                # Main application component
├── index.css              # Global styles and Tailwind imports
└── main.jsx               # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone or use this template**

   ```bash
   git clone <repository-url>
   cd react-vite-tailwind
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_ENVIRONMENT=dev
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📚 Usage Guide

### HTTP Requests

Use service classes for API calls. Create service classes that utilize the `request` utility function:

```javascript
// Example: service/user/auth/user.login.service.js
import { request } from '../../../util/request';

export class UserLoginService {
  static async loginByEmailAndPassword({ email, password }) {
    return await request(
      {
        method: 'POST',
        url: '/auth/login'
      },
      {
        email,
        password
      }
    );
  }
}

// Usage in components
import { UserLoginService } from '../service/user/auth/login.service';

const MyComponent = () => {
  const handleLogin = async () => {
    try {
      const email = example@gmail.com;
      const password = 123456;
      const response = await UserLoginService.loginByEmailAndPassword({
        email,
        password
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return <button onClick={handleLogin}>Log in</button>;
};
```

### Service Architecture

Organize your API calls using service classes. Each service should handle related API endpoints using the `request` utility:

```javascript
// Example: PostService.js
import { request } from '../util/request';

export class PostService {
  static async getAllPosts() {
    return await request({
      method: 'GET',
      url: '/posts'
    });
  }

  static async getPostById(id) {
    return await request({
      method: 'GET',
      url: `/posts/${id}`
    });
  }

  static async createPost(postData) {
    return await request(
      {
        method: 'POST',
        url: '/posts'
      },
      postData
    );
  }

  static async updatePost(id, postData) {
    return await request(
      {
        method: 'PUT',
        url: `/posts/${id}`
      },
      postData
    );
  }

  static async deletePost(id) {
    return await request({
      method: 'DELETE',
      url: `/posts/${id}`
    });
  }
}
```

### Internationalization

Switch languages and use translations:

```javascript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
    </div>
  );
};
```

### Logging

Use the logger utility throughout your application:

```javascript
import { logger } from './util/logger';

// Different log levels
logger.info('User logged in', 'Authentication');
logger.error('API call failed', 'HTTP Request', error);
logger.debug('Component rendered', 'React');
```

### Route Management

Add new routes to the appropriate route files:

```javascript
// For public routes (PublicRoute.jsx)
export const publicRoute = [
  {
    id: 'new-page',
    path: '/new-page',
    element: <NewPageComponent />,
    index: false
  }
];
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run prettier` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🛠 Built With

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Axios](https://axios-http.com/) - HTTP Client
- [React Router](https://reactrouter.com/) - Routing
- [React i18next](https://react.i18next.com/) - Internationalization

---

**Happy coding! 🎉**

_This template is designed to jumpstart your React projects with modern best practices and essential features pre-configured._
