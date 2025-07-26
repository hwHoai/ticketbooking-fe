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

// Function to get caller info from stack trace
function getCallerInfo() {
  const errStack = new Error().stack;
  if (!errStack) return { file: 'unknown', line: 'unknown' };

  const stackLines = errStack.split('\n');
  // Skip current function, log method, and convenience method
  const callerLine = stackLines[4] || stackLines[3] || stackLines[2];

  if (!callerLine) return { file: 'unknown', line: 'unknown' };

  // Extract file path and line from stack trace
  const callerPathArr = callerLine.split('/');
  const file = callerPathArr[callerPathArr.length - 1].split('?')[0];
  const line = callerLine.match(/:(\d+):(\d+)/)[0];

  return { file, line };
}

// Create logger object
export const logger = {
  // Generic log method
  log(message, level = 'debug', context = 'General', ...args) {
    if (LOG_LEVELS[level].priority <= LOG_LEVELS[currentLevel].priority) {
      const timestamp = dayjs().format('DD-MM-YYYY HH:mm:ss');
      const caller = getCallerInfo();

      console.log(
        `%c${level.toUpperCase()}%c ${timestamp} - [${currentLevel === 'debug' ? `${caller.file}${caller.line}` : context}]`,
        LOG_LEVELS[level].style,
        '',
        message,
        ...args
      );
    }
  },

  // Convenience methods for each log level
  error(message, context = 'Error', ...args) {
    this.log(message, 'error', context, ...args);
  },

  warn(message, context = 'Warning', ...args) {
    this.log(message, 'warn', context, ...args);
  },

  info(message, context = 'Info', ...args) {
    this.log(message, 'info', context, ...args);
  },

  debug(message, context = 'Debug', ...args) {
    this.log(message, 'debug', context, ...args);
  },

  trace(message, context = 'Trace', ...args) {
    this.log(message, 'trace', context, ...args);
  }
};

// Enable debug logs in development
if (import.meta.env.DEV) {
  console.info('Logger initialized in development mode with debug level');
} else {
  console.info('Logger initialized in production mode with info level');
}
