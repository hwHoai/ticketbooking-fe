// Browser-friendly logger implementation

import dayjs from 'dayjs';

// Define log levels with corresponding styles
const LOG_LEVELS = {
  error: { priority: 0, style: 'color: darkRed; background-color: orangeRed; padding: 2px 4px; border-radius: 2px;' },
  warn: { priority: 1, style: 'color: darkOrange; background-color: yellow; padding: 2px 4px; border-radius: 2px;' },
  info: {
    priority: 2,
    style: 'color: forestGreen; background-color: lightGreen; padding: 2px 4px; border-radius: 2px;'
  },
  debug: {
    priority: 3,
    style: 'color: midnightBlue; background-color: dodgerBlue; padding: 2px 4px; border-radius: 2px;'
  },
  trace: { priority: 4, style: 'color: fireBrick; background-color: orange; padding: 2px 4px; border-radius: 2px;' }
};

// Current log level - can be adjusted based on environment
const currentLevel = import.meta.env.VITE_ENVIRONMENT === 'dev' ? 'debug' : 'info';

// Create logger object
export const logger = {
  // Generic log method
  log(message, level = 'debug', context = 'General', ...args) {
    if (LOG_LEVELS[level].priority <= LOG_LEVELS[currentLevel].priority) {
      const timestamp = dayjs().format('DD-MM-YYYY HH:mm:ss');
      console.log(
        `%c${level.toUpperCase()}%c ${timestamp} - [${context}]`,
        LOG_LEVELS[level].style,
        '',
        message,
        ...args
      );
    }
  },

  // Convenience methods for each log level
  error(message, ...args) {
    this.log(message, 'error', ...args);
  },

  warn(message, ...args) {
    this.log(message, 'warn', ...args);
  },

  info(message, ...args) {
    this.log(message, 'info', ...args);
  },

  debug(message, ...args) {
    this.log(message, 'debug', ...args);
  },

  trace(message, ...args) {
    this.log(message, 'trace', ...args);
  }
};

// Enable debug logs in development
if (import.meta.env.DEV) {
  console.info('Logger initialized in development mode with debug level');
} else {
  console.info('Logger initialized in production mode with info level');
}
