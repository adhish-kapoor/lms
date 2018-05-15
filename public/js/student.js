let app=new Vue({
    el:"#studentlinks",
    data:{
        studentName:'',
        studentEmail:'',
        studentMobile:'',
        studentId:'',
        studentarr:[],
        batcharr:[],
        studentDetail : '',
        studId:''
    },
    methods:{
        getAllStudents(){            
            axios.get('/students')
            .then((response)=>{
                app.studentarr = response.data.students;
                //console.log(app.coursearr)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addnewStudent(){

            axios.post('/students/addstudent', {
                name: app.studentName,
                email: app.studentEmail,
                mobile:app.studentMobile
            })

            .then((res)=>{
                if(res.data.success)
                alert("added to db")

                app.getAllStudents();
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        getStudentById(){
            axios.get('/students/'+ app.studentId)
            .then((response)=>{
                app.studentDetail = response.data.students;
                //console.log(app.studentDetail)
            })  
        },
        getBatchesofStudent(stud){
            axios.get('/students/'+stud+'/batches')
            .then((response)=>{
                // app.batcharr=response.data.batches;
                console.log(response)
            })
            .catch((error)=>{
                console.log("Error")
            })
        }
    }
})