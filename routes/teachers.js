const express = require("express")
const route = express.Router();
const Teacher = require("../database/db").Teacher;

route.get('/', (req, res) => {
    Teacher.findAll().then((teachers) => {
            res.status(200).send({
                success: true,
                teachers: teachers
            })

        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Teacher found"
            })
        })
})

route.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then((teachers) => {           //finding as http://localhost:3000/teachers/1
            res.status(200).send({
                success: true,
                teachers: teachers
            })
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Teacher found"
            })
        })
})

route.post('/addteacher', (req, res) => {
    Teacher.create(req.body)
        .then((teacher) => {
            res.status(200).send({
                    success: true
                })
                
        })
        .catch(function (err) {
            res.status(500).send({
                success: false
            })
        })
})

// route.get('/:id/batches', (req, res) => {
//     console.log(req.params.id)
//     Teacher.findById(req.params.id)
//     .then((teacher)=>{
//         console.log("teacher is ", teacher);
//     })
//     .catch((err)=>{
//         res.status(500).send({
//             success:false,
//             message:"Error in database access!"
        
//         })
//     })
// })



route.get('/:id/batches', (req, res) => {    
    Teacher.findAll({
        where:{
            id:req.params.id
        }
    })
    .then((teachers)=>{
        console.log("teacher is ", teachers);
        res.status(200).send({
            success:true,
            teacher:teachers
        })
    })
    .catch((err)=>{
        res.status(500).send({
            success:false,
            message:"Error in database access!"
        
        })
    })
})




module.exports = route;