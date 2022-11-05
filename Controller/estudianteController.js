var config = require('../dbconfig');
const sql = require('mssql');
const Estudiante = require('../Class/Estudiantes')

//Traer todos los registros
async function getEstudiantes() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .query('SELECT ID,CODIGO_E, NOMBRE_E, APELLIDO_E,SEMESTRE,CARRERA,CODIGO_ASIGNATURA FROM ESTUDIANTES order by ID')
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Buscar por ID
async function getEstudiantesbyId(ID) {
    try {
        let pool = await sql.connect(config);        
        let products = await pool.request()
        .input('ID', sql.Int,ID)
        .query("SELECT * FROM ESTUDIANTES WHERE ID = @ID");
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Crear nuevo estudiante
async function post(Estudiantes) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('CODIGO', sql.NVarChar,Estudiantes.CODIGO_E)
        .input('NOMBRE', sql.NVarChar, Estudiantes.NOMBRE_E)
        .input('APELLIDO', sql.NVarChar, Estudiantes.APELLIDO_E)
        .input('SEMESTRE', sql.NVarChar, Estudiantes.SEMESTRE)
        .input('CARRERA', sql.NVarChar, Estudiantes.CARRERA)
        .input('CODASIGNATURA', sql.NVarChar, Estudiantes.CODIGO_ASIGNATURA)
        .execute('SP_INSERT_ESTU');
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar por ID
async function put(Estudiantes,ID) {
    try {
        let pool = await sql.connect(config);
        let updateProducts = await pool.request()
        .input('ID', sql.Int, Estudiantes.ID)
        .input('CODIGO', sql.NVarChar,Estudiantes.CODIGO_E)
        .input('NOMBRE', sql.NVarChar,Estudiantes.NOMBRE_E)
        .input('APELLIDO', sql.NVarChar,Estudiantes.APELLIDO_E)
        .input('SEMESTRE', sql.NVarChar,Estudiantes.SEMESTRE)
        .input('CARRERA', sql.NVarChar,Estudiantes.CARRERA)
        .input('CODASIGNATURA', sql.NVarChar,Estudiantes.CODIGO_ASIGNATURA)
        .query("UPDATE ESTUDIANTES SET CODIGO_E = @CODIGO, NOMBRE_E = @NOMBRE, APELLIDO_E = @APELLIDO, SEMESTRE=@SEMESTRE, CARRERA=@CARRERA, CODIGO_ASIGNATURA=@CODASIGNATURA WHERE ID = @ID")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar por ID
async function deleteXId(Estudiantes,ID) {
    try {
        let pool = await sql.connect(config);
        
        let deleteProducts = await pool.request()
        .input('ID', sql.Int,Estudiantes.ID)
        .query("DELETE ESTUDIANTES WHERE ID = @ID")
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getEstudiantes: getEstudiantes, 
getEstudiantesbyId:getEstudiantesbyId,
post:post,
put:put,
deleteXId: deleteXId
};