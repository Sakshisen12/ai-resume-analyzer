import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '../../.env') })

// Export config so other files can import it
export const config = {
  mongoUri:     process.env.MONGODB_URI,
  jwtSecret:    process.env.JWT_SECRET,
  openaiKey:    process.env.OPENAI_API_KEY,
  port:         process.env.PORT || 5000,
  nodeEnv:      process.env.NODE_ENV || 'development',
  frontendUrl:  process.env.FRONTEND_URL,
}