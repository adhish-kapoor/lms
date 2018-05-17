const Sequelize=require('sequelize')

const db= new Sequelize('lms','root','root',{
    host:'localhost',
    dialect:'sqlite',
    storage: './sms.db'  
})

const Course=db.define('courses',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{timestamps:false})
const Batch=db.define('batches',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{timestamps:false})
Batch.belongsTo(Course)

const Subject=db.define('subjects',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{timestamps:false})
Subject.belongsTo(Course)

const Teacher=db.define('teachers',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mobile:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    }
},{timestamps:false})
Teacher.belongsTo(Subject)

const Lecture=db.define('lectures',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{timestamps:false})
Lecture.belongsTo(Batch)
Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)
Lecture.belongsTo(Course)

const Student=db.define('students',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mobile:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    }
},{timestamps:false})
Student.belongsTo(Batch)

Batch.belongsToMany(Student,{through:"BatchStudent"}); //many to many relation
Student.belongsToMany(Batch,{through:"BatchStudent"});

db.sync()
.then(()=>console.log("Database synced"))
.catch((err)=>console.log("error"))

module.exports={
    Course,
    Batch,
    Teacher,
    Subject,
    Student,
    Lecture
}




