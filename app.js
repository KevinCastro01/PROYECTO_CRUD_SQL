var asignaturaController = require('./Controller/asignaturaController');
var docenteController = require('./Controller/docenteController');
var estudianteController = require('./Controller/estudianteController');
var academicoController = require('./Controller/academicoController');

var estudiantes = require('./Class/Estudiantes');
var asignaturas = require('./Class/Asignaturas');
var docentes = require('./Class/Docentes');
var academicos = require('./Class/Academicos');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//const { application } = require('express');
//const { connect } = require('mssql');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port '+ port);

router.use((request,response,next) =>{
console.log('Welcome, Time:', Date.now());
next();
});

//PETICIONES ASIGNATURAS--------------------------------------------------------------------
router.route('/asignaturas').get((request, response)=>{
    asignaturaController.getAsignaturas().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/asignaturas/:ID').get((request, response)=>{
    asignaturaController.getAsignaturasbyId(request.params.ID).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/asignaturas').post((request, response)=>{
    let asignaturas = {...request.body}
    asignaturaController.post(asignaturas).then(result =>{
        response.status(201).json(result);        
        console.log(result)
    })
})

router.route('/asignaturas/edit/:ID').put((request, response)=>{
    let asignaturas = {...request.body}
    asignaturaController.put(asignaturas,request.params.ID).then(result =>{
       response.json(result)     
        console.log(result)
       console.log('Creado!!!')
    })
})

router.route('/asignaturas/delete/:ID').delete((request, response)=>{
   let asignaturas = {...request.body}
   asignaturaController.deleteXId(asignaturas,request.params.ID).then(result =>{
       response.json(result)     
       // console.log(result)
       console.log('Eliminado!!!')
    })
})
//FIN PETICIONES ASIGNATURAS---------------------------------------------------------------------


//PETICIONES DOCENTES--------------------------------------------------------------------
router.route('/docentes').get((request, response)=>{
    docenteController.getDocentes().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/docentes/:ID').get((request, response)=>{
    docenteController.getDocentesbyId(request.params.ID).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/docentes').post((request, response)=>{
    let docentes = {...request.body}
    docenteController.post(docentes).then(result =>{
        response.status(201).json(result);        
        console.log(result)
    })
})

router.route('/docente/edit/:ID').put((request, response)=>{
    let docentes = {...request.body}
    docenteController.put(docentes,request.params.ID).then(result =>{
       response.json(result)     
        console.log(result)
       //console.log('Creado!!!')
    })
})

router.route('/docentes/delete/:ID').delete((request, response)=>{
   let docentes = {...request.body}
   docenteController.deleteXId(docentes,request.params.ID).then(result =>{
       response.json(result)     
       // console.log(result)
       console.log('Eliminado!!!')
    })
})
//FIN PETICIONES DOCENTES--------------------------------------------------------


// PRETICIONES ESTUDIANTES--------------------------------------
router.route('/estudiantes').get((request, response)=>{
    estudianteController.getEstudiantes().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/estudiantes/:ID').get((request, response)=>{
    estudianteController.getEstudiantesbyId(request.params.ID).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/estudiantes').post((request, response)=>{
    let estudiantes = {...request.body}
    estudianteController.post(estudiantes).then(result =>{
        response.status(201).json(result);
        console.log(result)
    })
})

router.route('/estudiantes/edit/:ID').put((request, response)=>{
    let estudiantes = {...request.body}
    estudianteController.put(estudiantes,request.params.ID).then(result =>{
       response.json(result)
        console.log(result)
       //console.log('Creado!!!')
    })
})

router.route('/estudiantes/delete/:ID').delete((request, response)=>{
   let estudiantes = {...request.body}
   estudianteController.deleteXId(estudiantes,request.params.ID).then(result =>{
       response.json(result)
       // console.log(result)
       console.log('Eliminado!!!')
    })
})

// FIN PRETICIONES ESTUDIANTES----------------------------------


// PRETICIONES ACADEMICO--------------------------------------
router.route('/academicos').get((request, response)=>{
    academicoController.getAcademicos().then(result =>{
        response.json(result);
        console.log("Tocas Las Tablas")
    })
})

router.route('/academicos1').get((request, response)=>{
    academicoController.getAcademicos1().then(result =>{
        response.json(result);
        console.log("Multitabla")
    })
})

router.route('/academicos/:ID').get((request, response)=>{
    academicoController.getAcademicosbyId(request.params.ID).then(result =>{
        response.json(result);
        console.log("Id")
    })
})

router.route('/academicos').post((request, response)=>{
    let academicos = {...request.body}
    academicoController.post(academicos).then(result =>{
        response.status(201).json(result);
        console.log("Insertado")
    })
})

router.route('/academicos/edit/:ID').put((request, response)=>{
    let academicos = {...request.body}
    academicoController.put(academicos,request.params.ID).then(result =>{
       response.json(result)
        console.log("Editado")
       //console.log('Creado!!!')
    })
})

router.route('/academicos/delete/:ID').delete((request, response)=>{
   let academicos = {...request.body}
   academicoController.deleteXId(academicos,request.params.ID).then(result =>{
       response.json(result)
       // console.log(result)
       console.log('Eliminado!!!')
    })
})

// FIN PRETICIONES ACADEMICO----------------------------------