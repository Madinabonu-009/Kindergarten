/**
 * Logger utility for consistent logging across the application
 * Automatically disables console logs in production
 */

const isDev = process.env.NODE_ENV === 'development'

const logger = {
  info: (...args) => {
    if (isDev) {
      console.log('[INFO]', ...args)
    }
  },

  error: (...args) => {
    // Always log errors, but format differently
    if (isDev) {
      console.error('[ERROR]', ...args)
    } else {
      // In production, log to error tracking service
      console.error('[ERROR]', args[0]) // Only log message, not full stack
    }
  },

  warn: (...args) => {
    if (isDev) {
      console.warn('[WARN]', ...args)
    }
  },

  debug: (...args) => {
    if (isDev) {
      console.debug('[DEBUG]', ...args)
    }
  },

  success: (...args) => {
    if (isDev) {
      console.log('[SUCCESS]', ...args)
    }
  }
}

export default logger
