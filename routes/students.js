const express = require("express")
const route = express.Router();
const Student = require("../database/db").Student;

route.get('/', (req, res) => {
    Student.findAll().then((students) => {
            res.status(200).send({
                success: true,
                students: students
            })

        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No student found"
            })
        })
})

route.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then((students) => { //finding as http://localhost:3000/students/1
            res.status(200).send({
                success: true,
                students: students
            })
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No student found"
            })
        })
})

route.post('/addstudent',(req,res)=>{
    Student.create(req.body)
    .then((student)=>{
        res.status(200).send({
            success:true
        })
        
    })
    .catch(function (err){
        res.status(500).send({
            success: false
        })
    } )
})
route.get('/:id/batches', (req, res) => {
    let studentId = req.params.id;        //studentid
    Batch.findAll({                       //batches with requested studentId
        where:{
            studentId:studentId
        }

    })
    .then((batches)=>{
        res.status(200).send({
            success:true,
            batches: batches
        })
    })
    .catch((error)=>{
        res.status(500).send({
            success:false,
            message: "Error!"
        })
    })
})


module.exports = route;