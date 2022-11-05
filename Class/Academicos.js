class Academicos {
    constructor(ID,CODIGOR,FECHA, PERIODO,NOTA1,NOTA2,PROMEDIO,CODIGO_DOCENTE,CODIGO_ESTUDIANTE){
        this.ID = ID,
        this.CODIGOR = CODIGOR,
        this.FECHA = FECHA,
        this.PERIODO = PERIODO,
        this.NOTA1 = NOTA1,
        this.NOTA2 = NOTA2,
        this.PROMEDIO = PROMEDIO
        this.CODIGO_DOCENTE = CODIGO_DOCENTE,
        this.CODIGO_ESTUDIANTE = CODIGO_ESTUDIANTE
    }
}

module.exports = Academicos;