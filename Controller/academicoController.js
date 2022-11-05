var config = require('../dbconfig');
const sql = require('mssql');
const Academico = require('../Class/Academicos')

async function getAcademicos() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .query('SELECT ID,CODIGOR, FECHA, PERIODO, NOTA1, NOTA2,PROMEDIO,CODIGO_DOCENTE, CODIGO_ESTUDIANTE  FROM RECORD_ACADEMICO order by ID')
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAcademicos1() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
        .execute('SP_MULTI');
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAcademicosbyId(ID) {
    try {
        let pool = await sql.connect(config);        
        let products = await pool.request()
        .input('ID', sql.Int,ID)
        //.input('nombre', sql.NVarChar(30),nombre)
        //.execute('SP_MostrarOrdenesXId')
        .query("SELECT * FROM RECORD_ACADEMICO WHERE ID = @ID");
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//CREAR
async function post(Academicos) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
       .input('CODIGOR', sql.NVarChar,Academicos.CODIGOR)
        .input('PERIODO', sql.NVarChar, Academicos.PERIODO)
        .input('FECHA', sql.Date, Academicos.FECHA)
        .input('NOTA1', sql.Decimal,Academicos.NOTA1)
        .input('NOTA2', sql.Decimal,Academicos.NOTA2)
        .input('CODDOCENTE', sql.NVarChar,Academicos.CODIGO_DOCENTE)
        .input('CODESTUDIANTE', sql.NVarChar,Academicos.CODIGO_ESTUDIANTE)
        .query('INSERT INTO RECORD_ACADEMICO(CODIGOR,PERIODO,FECHA,NOTA1,NOTA2,CODIGO_DOCENTE,CODIGO_ESTUDIANTE) VALUES  (@CODIGOR,@PERIODO,@FECHA,@NOTA1,@NOTA2,@CODDOCENTE,@CODESTUDIANTE)')
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//update
async function put(Academicos,ID) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('ID', sql.Int,Academicos.ID)
        .input('CODIGO', sql.NVarChar,Academicos.CODIGO_R)
        .input('PERIODO', sql.NVarChar, Academicos.PERIODO)
        .input('NOTA1', sql.Decimal,Academicos.NOTA1)
        .input('NOTA2', sql.Decimal,Academicos.NOTA2)
        .input('CODDOCENTE', sql.NVarChar,Academicos.CODIGO_DOCENTE)
        .input('CODESTUDIANTE', sql.NVarChar,Academicos.CODIGO_ESTUDIANTE)
         .query("UPDATE RECORD_ACADEMICO SET CODIGO_R = @CODIGO, PERIODO = @PERIODO, NOTA1 = @NOTA1, NOTA2 = @NOTA2, CODIGO_DOCENTE = @CODDOCENTE, CODIGO_ESTUDIANTE = @CODESTUDIANTE WHERE ID = @ID")
         //.execute();
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
//Eliminar

async function deleteXId(Academicos,ID) {
    try {
        let pool = await sql.connect(config);
        
        let deleteProducts = await pool.request()
        .input('ID', sql.Int,Academicos.ID)
         .query("DELETE RECORD_ACADEMICO WHERE ID = @ID")
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {getAcademicos: getAcademicos,
    getAcademicos1: getAcademicos1,
     getAcademicosbyId: getAcademicosbyId,
    post:post,
    put : put,
    deleteXId: deleteXId
    };