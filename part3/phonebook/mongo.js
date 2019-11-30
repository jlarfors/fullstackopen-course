
const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const dbName = 'phonebook-db'
const password = process.argv[2]

const url =
  `mongodb+srv://jlarfors:${password}@cluster0-55fjo.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', new mongoose.Schema({
  name: String,
  number: String
}))

if (process.argv.length == 5) {
  // then we should add new user...
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number,
  })
  
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // list people in the database
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
