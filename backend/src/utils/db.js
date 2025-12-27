import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, '../../data')

export const readData = (filename) => {
  const filePath = path.join(dataDir, filename)
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message)
    return null
  }
}

export const writeData = (filename, data) => {
  const filePath = path.join(dataDir, filename)
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filename}:`, error.message)
    return false
  }
}
