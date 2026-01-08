const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minLength: [8, 'Phone number must be at least 8 characters long'],
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        // Phone number must be in format XX-XXXXXXX or XXX-XXXXXXXX
        // First part: 2 or 3 digits, then hyphen, then rest are digits
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Format should be XX-XXXXXXX or XXX-XXXXXXXX`
    }
  }
})

// Transform _id to id and remove __v field
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
