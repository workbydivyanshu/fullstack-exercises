const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://divyanshuganeshwani_db_user:${password}@course.68ohiz6.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=course`

console.log('Connecting to MongoDB...')

mongoose.set('strictQuery', false)

mongoose.connect(url, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('Connected!'))
  .catch(err => {
    console.log('Connection error:', err.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// If only password is given, list all entries
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  // If name and number are given, add new entry
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Usage: node mongo.js <password> [name] [number]')
  mongoose.connection.close()
  process.exit(1)
}
