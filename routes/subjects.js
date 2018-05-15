const express = require("express")
const route = express.Router();
const Subject = require("../database/db").Subject;
const Teacher = require("../database/db").Teacher;

route.get('/', (req, res) => {
    Subject.findAll().then((subjects) => {
            res.status(200).send({
                success: true,
                subjects: subjects
            })

        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Subject found"
            })
        })
})

route.get('/:id', (req, res) => {
    Subject.findById(req.params.id)
        .then((subjects) => {             //finding as http://localhost:3000/subjects/3
            res.status(200).send({
                success: true,
                subjects: subjects
            })
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Subject found"
            })
        })
})

route.get('/:id/teachers', (req, res) => {
    let subjectId = req.params.id;        //getting subjectid
    Teacher.findAll({
        where: {
            subjectId: subjectId
        }
    })
    .then((teachers)=>{
        res.status(200).send({
            success:true,
            teachers: teachers
        })
    })
    .error((error)=>{
        res.status(500).send({
            success:false,
            message: "Error!"
        })
    })
})

route.post('/addsubject', (req, res) => {
    Subject.create(req.body)
        .then((subject) => {
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
module.exports = route;