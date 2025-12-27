/**
 * Environment variables validation
 * Run this on startup to ensure all required env vars are set
 */

const requiredEnvVars = [
  'PORT',
  'JWT_SECRET',
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID'
]

const optionalEnvVars = [
  'NODE_ENV',
  'MONGODB_URI',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS',
  'ALLOWED_ORIGINS',
  'ENCRYPTION_KEY'
]

export const checkEnvironment = () => {
  const missing = []
  const warnings = []
  const critical = []

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  })

  // Check JWT secret strength
  if (process.env.JWT_SECRET) {
    if (process.env.JWT_SECRET.length < 32) {
      critical.push('JWT_SECRET must be at least 32 characters long for security')
    }
    if (process.env.JWT_SECRET === 'play-kids-secret-key') {
      critical.push('JWT_SECRET is using default value - CHANGE IT IMMEDIATELY!')
    }
  }

  // Check if using default/example values
  if (process.env.JWT_SECRET?.includes('your_super_secret')) {
    critical.push('JWT_SECRET appears to be using example value')
  }

  if (process.env.TELEGRAM_BOT_TOKEN?.includes('your_bot_token')) {
    warnings.push('TELEGRAM_BOT_TOKEN appears to be using example value')
  }

  // Validate PORT
  const port = parseInt(process.env.PORT)
  if (isNaN(port) || port < 1 || port > 65535) {
    warnings.push('PORT should be a valid port number (1-65535)')
  }

  // Validate rate limit values
  if (process.env.RATE_LIMIT_WINDOW_MS) {
    const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS)
    if (isNaN(windowMs) || windowMs < 1000) {
      warnings.push('RATE_LIMIT_WINDOW_MS should be at least 1000ms')
    }
  }

  if (process.env.RATE_LIMIT_MAX_REQUESTS) {
    const maxReq = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
    if (isNaN(maxReq) || maxReq < 1) {
      warnings.push('RATE_LIMIT_MAX_REQUESTS should be a positive number')
    }
  }

  // Validate Telegram chat ID format
  if (process.env.TELEGRAM_CHAT_ID && !/^-?\d+$/.test(process.env.TELEGRAM_CHAT_ID)) {
    warnings.push('TELEGRAM_CHAT_ID should be a numeric value')
  }

  // Check ALLOWED_ORIGINS format
  if (process.env.ALLOWED_ORIGINS) {
    const origins = process.env.ALLOWED_ORIGINS.split(',')
    origins.forEach(origin => {
      const trimmed = origin.trim()
      if (trimmed && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
        warnings.push(`Invalid origin format: ${trimmed}. Should start with http:// or https://`)
      }
    })
  }

  // Report critical issues
  if (critical.length > 0) {
    console.error('🚨 CRITICAL SECURITY ISSUES:')
    critical.forEach(c => console.error(`   - ${c}`))
    if (process.env.NODE_ENV === 'production') {
      console.error('\n❌ Cannot start in production with critical security issues!')
      process.exit(1)
    }
  }

  // Report results
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach(v => console.error(`   - ${v}`))
    console.error('\nPlease check your .env file and backend/.env.example')
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:')
    warnings.forEach(w => console.warn(`   - ${w}`))
  }

  console.log('✅ Environment variables validated')
  
  // Log optional missing vars in development
  if (process.env.NODE_ENV === 'development') {
    const missingOptional = optionalEnvVars.filter(v => !process.env[v])
    if (missingOptional.length > 0) {
      console.log('ℹ️  Optional environment variables not set:')
      missingOptional.forEach(v => console.log(`   - ${v}`))
    }
  }
}

// Validate specific values
export const validateEnvValue = (name, value, type = 'string') => {
  if (!value) return false
  
  switch (type) {
    case 'number':
      return !isNaN(parseInt(value))
    case 'boolean':
      return value === 'true' || value === 'false'
    case 'url':
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    default:
      return typeof value === 'string' && value.length > 0
  }
}
