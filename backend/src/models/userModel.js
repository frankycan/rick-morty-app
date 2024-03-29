import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      // required: true,
      // unique: true,
      default: uuidv4
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    favoriteCharacters: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true,
  }
)

// hash user's password with salt before saving document to db
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User