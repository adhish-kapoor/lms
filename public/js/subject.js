let app=new Vue({
    el:"#subjectlinks",
    data:{
        subjectName:'',
        subjectarr:[]
    },
    methods:{
        getAllSubjects(){            
            axios.get('/subjects')
            .then((response)=>{
                app.subjectarr = response.data.subjects;
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addnewSubject(){
            axios.post('/subjects/addsubject', {
                name: app.subjectName
            })

            .then((res)=>{
                if(res.data.success)
                alert("added to db")

                app.getAllSubjects();
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
})
