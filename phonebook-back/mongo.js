const mongoose = require('mongoose')

//conection
if (process.argv.length < 3) {
  console.log("Introduce password")
  process.exit(1)
}
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@fullstackopen.q7nmcil.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

//schema
const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Phone = mongoose.model('Phone', phoneSchema)

//parameters
if (process.argv.length < 4) {
  Phone.find({}).then(result => {
    result.forEach(phone => {
      console.log(phone)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const phone = new Phone({
    name, number
  })

  //save
  phone.save().then(result => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}

