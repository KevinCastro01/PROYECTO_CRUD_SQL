CREATE DATABASE PROYECTO_04_11

USE PROYECTO_04_11

IF OBJECT_ID('ASIGNATURAS')IS NOT NULL
DROP TABLE ASIGNATURAS
GO
CREATE TABLE ASIGNATURAS(
ID INT IDENTITY,
CODIGO_A VARCHAR(10)NOT NULL,
NOMBRE_A VARCHAR(30),
CREDITOS_A TINYINT,
CONSTRAINT PK_01_ASIGNATURAS PRIMARY KEY(CODIGO_A)
)


IF OBJECT_ID('DOCENTES')IS NOT NULL
DROP TABLE DOCENTES
GO
CREATE TABLE DOCENTES(
ID INT IDENTITY,
CODIGO_D VARCHAR(10)NOT NULL,
NOMBRE_D VARCHAR(30),
APELLIDO_D VARCHAR(30),
CONSTRAINT PK_01_DOCENTES PRIMARY KEY(CODIGO_D),
CODIGO_ASIGNATURA VARCHAR(10) CONSTRAINT FK_ASIGNATURAS_01 
FOREIGN KEY REFERENCES ASIGNATURAS (CODIGO_A)
ON UPDATE CASCADE
)

IF OBJECT_ID('ESTUDIANTES')IS NOT NULL
DROP TABLE ESTUDIANTES
GO
CREATE TABLE ESTUDIANTES(
ID INT IDENTITY,
CODIGO_E VARCHAR(10)NOT NULL,
NOMBRE_E VARCHAR(30),
APELLIDO_E VARCHAR(30),
SEMESTRE VARCHAR(20),
CARRERA VARCHAR(20),
CONSTRAINT PK_01_ESTUDIANTES PRIMARY KEY(CODIGO_E),
CODIGO_ASIGNATURA VARCHAR(10) CONSTRAINT FK_ASIGNATURA_01 
FOREIGN KEY REFERENCES ASIGNATURAS(CODIGO_A)
ON UPDATE CASCADE
)

IF OBJECT_ID('RECORD_ACADEMICO')IS NOT NULL
DROP TABLE RECORD_ACADEMICO
GO
CREATE TABLE RECORD_ACADEMICO(
ID INT IDENTITY,
CODIGO_R VARCHAR(10)PRIMARY KEY NOT NULL,
FECHA DATE DEFAULT GETDATE (),
PERIODO VARCHAR(30),
NOTA1 DECIMAL(3,2),
NOTA2 DECIMAL(3,2),
PROMEDIO AS (NOTA1+NOTA2)/2,
CODIGO_DOCENTE VARCHAR(10) CONSTRAINT FK_DOCENTE_01 
FOREIGN KEY REFERENCES DOCENTES(CODIGO_D)
ON UPDATE CASCADE,
CODIGO_ESTUDIANTE VARCHAR(10) CONSTRAINT FK_ESTUDIANTE_01 
FOREIGN KEY REFERENCES ESTUDIANTES(CODIGO_E)
)



INSERT INTO [dbo].[ASIGNATURAS] (CODIGO_A,NOMBRE_A,CREDITOS_A)
VALUES('COD_A_01','KEVIN',5),
      ('COD_A_02','DINER',3),
	  ('COD_A_03','SOFIA',2)


INSERT INTO [dbo].[ESTUDIANTES] (CODIGO_E,NOMBRE_E,APELLIDO_E,SEMESTRE,CARRERA,CODIGO_ASIGNATURA)
VALUES('COD_E_01','ESTU01','APELLIDO01','PRIMER SEMESTRE','ING DE SISTEMAS','COD_A_01'),
      ('COD_E_02','ESTU02','APELLIDO02','SEGUNDO SEMESTRE','ING DE SISTEMAS','COD_A_02'),
      ('COD_E_03','ESTU03','APELLIDO03','TERCER SEMESTRE','ING DE SISTEMAS','COD_A_03')

INSERT INTO [dbo].[DOCENTES] (CODIGO_D,NOMBRE_D,APELLIDO_D,CODIGO_ASIGNATURA)
VALUES('COD_D_01','DOCEN01','APELLIDO01','COD_A_01'),
      ('COD_D_02','DOCEN02','APELLIDO02','COD_A_02'),
      ('COD_D_03','DOCEN03','APELLIDO03','COD_A_03')

INSERT INTO [dbo].[RECORD_ACADEMICO] (CODIGO_R,PERIODO,NOTA1,NOTA2,CODIGO_DOCENTE,CODIGO_ESTUDIANTE)
VALUES('COD_R_01','PRIMER CORTE',4.5,4.0,'COD_D_01','COD_E_01'),
      ('COD_R_02','SEGUNDO CORTE',4.5,4.0,'COD_D_02','COD_E_02'),
      ('COD_R_03','TERCER CORTE',4.5,4.0,'COD_D_03','COD_E_03')

GO

CREATE PROC SP_INSERT_ASIG(
@CODIGO VARCHAR(10),
@NOMBRE VARCHAR(30),
@CREDITOS TINYINT
)
AS 
	BEGIN 
		INSERT INTO ASIGNATURAS(CODIGO_A,NOMBRE_A,CREDITOS_A)
		VALUES (@CODIGO,@NOMBRE,@CREDITOS)
	END

GO

CREATE PROC INSERT_DOCEN(
@CODIGO VARCHAR(10),
@NOMBRE VARCHAR(30),
@APELLIDO VARCHAR(30),
@CODASIGNATURA VARCHAR(10)
)
AS
	BEGIN
		INSERT INTO DOCENTES(CODIGO_D,NOMBRE_D,APELLIDO_D,CODIGO_ASIGNATURA)
		VALUES(@CODIGO,@NOMBRE,@APELLIDO,@CODASIGNATURA)
	END

GO
CREATE PROC SP_INSERT_ESTU(
@CODIGO VARCHAR(10),
@NOMBRE VARCHAR(30),
@APELLIDO VARCHAR(30),
@SEMESTRE VARCHAR(20),
@CARRERA VARCHAR(20),
@CODASIGNATURA VARCHAR(10)
)
AS
	BEGIN
		INSERT INTO ESTUDIANTES(CODIGO_E,NOMBRE_E,APELLIDO_E,SEMESTRE,CARRERA,CODIGO_ASIGNATURA)
		VALUES(@CODIGO,@NOMBRE,@APELLIDO,@SEMESTRE,@CARRERA,@CODASIGNATURA)
	END


GO

CREATE PROC SP_INSERT_RECORD(
@CODIGO VARCHAR(10),
@PERIODO VARCHAR(30),
@FECHA DATE,
@NOTA1 DECIMAL(3,2),
@NOTA2 DECIMAL(3,2),
@CODDOCENTE VARCHAR(10),
@CODESTUDIANTE VARCHAR(10)
)
AS
	BEGIN
		INSERT INTO RECORD_ACADEMICO(CODIGO_R,PERIODO,FECHA,NOTA1,NOTA2,CODIGO_DOCENTE,CODIGO_ESTUDIANTE)
		VALUES                     (@CODIGO,@PERIODO,@FECHA,@NOTA1,@NOTA2,@CODDOCENTE,@CODESTUDIANTE)
	END
GO

CREATE PROC SP_MULTI
AS
	BEGIN
	       SELECT E.NOMBRE_E, D.NOMBRE_D , A.NOMBRE_A , R.PROMEDIO FROM ASIGNATURAS A
		   INNER JOIN DOCENTES D
		   ON  A.CODIGO_A = D.CODIGO_ASIGNATURA
		   INNER JOIN ESTUDIANTES E
		   ON  A.CODIGO_A = E.CODIGO_ASIGNATURA
		   INNER JOIN RECORD_ACADEMICO R
		   ON  D.CODIGO_D = R.CODIGO_DOCENTE
	END

