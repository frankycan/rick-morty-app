// database connection file to MongoDB
import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await connect(process.env.DB_URL, {})
    console.log(`db connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB