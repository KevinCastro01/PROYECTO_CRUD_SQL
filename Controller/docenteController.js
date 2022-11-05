var config = require('../dbconfig');
const sql = require('mssql');
const Docente = require('../Class/Docentes')

//Traer todos los registros
async function getDocentes() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .query('SELECT ID,CODIGO_D, NOMBRE_D, APELLIDO_D, CODIGO_ASIGNATURA FROM DOCENTES order by ID')
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Buscar por ID
async function getDocentesbyId(ID) {
    try {
        let pool = await sql.connect(config);        
        let products = await pool.request()
        .input('ID', sql.Int,ID)
        .query("SELECT * FROM DOCENTES WHERE ID = @ID");
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Crear nueva DOCENTES
async function post(Docentes) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('CODIGO', sql.NVarChar,Docentes.CODIGO_D)
        .input('NOMBRE', sql.NVarChar, Docentes.NOMBRE_D)
        .input('APELLIDO', sql.NVarChar, Docentes.APELLIDO_D)
        .input('CODASIGNATURA', sql.NVarChar, Docentes.CODIGO_ASIGNATURA)
        .execute('SP_INSERT_DOCEN');
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar por ID
async function put(Docentes,ID) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('ID', sql.Int, Docentes.ID)
        .input('CODIGO', sql.NVarChar,Docentes.CODIGO_D)
        .input('NOMBRE', sql.NVarChar,Docentes.NOMBRE_D)
        .input('APELLIDO', sql.NVarChar,Docentes.APELLIDO_D)
        .input('CODASIGNATURA', sql.NVarChar,Docentes.CODIGO_ASIGNATURA)
        .query("UPDATE DOCENTES SET CODIGO_D = @CODIGO, NOMBRE_D = @NOMBRE, APELLIDO_D = @APELLIDO, CODIGO_ASIGNATURA=@CODASIGNATURA  WHERE ID = @ID")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar por ID
async function deleteXId(Docentes,ID) {
    try {
        let pool = await sql.connect(config);
        
        let deleteProducts = await pool.request()
        .input('ID', sql.Int,Docentes.ID)
        .query("DELETE DOCENTES WHERE ID = @ID")
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getDocentes: getDocentes,
    getDocentesbyId: getDocentesbyId,
    post:post,
    put : put,
    deleteXId: deleteXId
    };