const express = require("express")
const route = express.Router();
const {
    Course
} = require('../database/db');
const {
    Batch
} = require('../database/db')

route.get('/', (req, res) => {
    Course.findAll().then((courses) => {
            res.status(200).send({
                success: true,
                courses: courses
            })

        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Course found"
            })
        })
})
route.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then((courses) => { //finding as http://localhost:3000/courses/1
            res.status(200).send({
                success: true,
                courses: courses
            })
        })
        .catch((err) => {
            res.status(501).send({
                success: false,
                message: "No Course found"
            })
        })
})

route.get('/:id/batches', (req, res) => {
    let courseId = req.params.id; //getting courseid
    Batch.findAll({
            where: {
                courseId: courseId
            }
        })
        .then((batches) => {
            res.status(200).send({
                success: true,
                batches: batches
            })
        })
        .error((error) => {
            res.status(500).send({
                success: false,
                message: "Error!"
            })
        })
})

route.get('/:id/batches/:bid', (req, res) => {
    let courseId = req.params.id; //getting courseid
    Batch.findOne({
            where: {
                courseId: courseId,
                id: req.params.bid //getting batchid
            }
        })
        .then((batch) => {
            res.status(200).send({
                success: true,
                batch: batch
            })
        })
        .error((error) => {
            res.status(500).send({
                success: false,
                message: "Error!"
            })
        })
})

route.post('/addcourse', (req, res) => {
    Course.create(req.body)
        .then((course) => {
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

route.get('/:id/batches', (req, res) => {
    Batch.findAll({
        where:{
            courseId: req.params.id
        }
    })
    .then((res)=>{
       // console.log("res ",res);
        res.status(200).send({
            success:true,
            batches: res.data
        })
    })
    .catch((error)=>{
        res.status(500).send({
            success:false
        })
    })
})


module.exports = route;