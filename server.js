const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`DB Connection successful ${con.connection.host}`)
  })
  .catch((err) => {
    console.log(err)
  })
mongoose.set('debug', true)
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server has started listening on port ${port}`)
})
