//Adhish Kapoor

const express=require("express")
const path=require("path")
//const bodyParser = require('body-parser');
const {Student} = require("./database/db")

const app=express()
app.use('/',express.static(path.join(__dirname,'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const routes={
//     courses:require('./routes/courses'),
//     students:require('./routes/students'),
//     subjects:require('./routes/subjects'),
//     teachers:require('./routes/teachers')
// }

app.use('/courses',require('./routes/courses'))

app.use('/students',require('./routes/students'))

app.use('/subjects',require('./routes/subjects'))

app.use('/teachers',require('./routes/teachers'))

app.listen(process.env.PORT || 5000);