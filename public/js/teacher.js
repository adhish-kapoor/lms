let app=new Vue({
    el:"#teacherlinks",
    data:{
        TeacherName:'',
        TeacherEmail:'',
        TeacherMobile:'',
        teacherId:'',
        teacherarr:[],
        TeacherDetail : ''
    },
    methods:{
        getAllTeachers(){            
            axios.get('/teachers')
            .then((response)=>{
                app.teacherarr = response.data.teachers;
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addnewTeacher(){
            axios.post('/teachers/addteacher', {
                name: app.TeacherName,
                email: app.TeacherEmail,
                mobile:app.TeacherMobile
            })

            .then((res)=>{
                if(res.data.success)
                alert("added to db")

                app.getAllTeachers();
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        getBatchesOfTeacher(){
            let teacherId = app.teacherId;
            axios.get('/teachers/' + teacherId + "/batches")
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })            
        }
    }
})
