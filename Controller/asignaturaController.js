var config = require('../dbconfig');
const sql = require('mssql');
const Asignatura = require('../Class/Asignaturas')

//Traer todos los registros
async function getAsignaturas() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .query('SELECT ID,CODIGO_A, NOMBRE_A, CREDITOS_A FROM ASIGNATURAS order by ID')
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Buscar por ID
async function getAsignaturasbyId(ID) {
    try {
        let pool = await sql.connect(config);        
        let products = await pool.request()
        .input('ID', sql.Int,ID)
        .query("SELECT * FROM ASIGNATURAS WHERE ID = @ID");
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Crear nueva asignatura
async function post(Asignaturas) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('CODIGO', sql.NVarChar,Asignaturas.CODIGO_A)
        .input('NOMBRE', sql.NVarChar, Asignaturas.NOMBRE_A)
        .input('CREDITOS', sql.TinyInt, Asignaturas.CREDITOS_A)
        .execute('SP_INSERT_ASIG');
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar por ID
async function put(Asignaturas,ID) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('ID', sql.Int, Asignaturas.ID)
        .input('CODIGO', sql.NVarChar,Asignaturas.CODIGO_A)
        .input('NOMBRE', sql.NVarChar,Asignaturas.NOMBRE_A)
        .input('CREDITOS', sql.TinyInt,Asignaturas.CREDITOS_A)
        .query("UPDATE ASIGNATURAS SET CODIGO_A = @CODIGO, NOMBRE_A = @NOMBRE, CREDITOS_A = @CREDITOS WHERE ID = @ID")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar por ID
async function deleteXId(Asignaturas,ID) {
    try {
        let pool = await sql.connect(config);
        
        let deleteProducts = await pool.request()
        .input('ID', sql.Int,Asignaturas.ID)
        .query("DELETE ASIGNATURAS WHERE ID = @ID")
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getAsignaturas: getAsignaturas,
    getAsignaturasbyId: getAsignaturasbyId,
    post:post,
    put : put,
    deleteXId: deleteXId
    };