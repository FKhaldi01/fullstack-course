require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

if (!MONGODB_URI) {
  const missingVar = process.env.NODE_ENV === 'test' ? 'TEST_MONGODB_URI' : 'MONGODB_URI'
  throw new Error(`Missing ${missingVar} in .env — refusing to start`)
}

module.exports = { MONGODB_URI, PORT }
