CREATE DATABASE nuvem;
USE nuvem;

-- Tabela Empresa
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY auto_increment,
 senha VARCHAR(45),
 email VARCHAR (45),
NomeComercial VARCHAR (45),
cnpj CHAR(14)
);

-- Tabela Usuário
 CREATE TABLE usuario(
 idUsuario INT PRIMARY KEY auto_increment,
 nome VARCHAR (45),
 senha VARCHAR(45),
 email VARCHAR (45),
 fkEmpresa INT,
 constraint fkEmpresaUser foreign key (fkEmpresa) references empresa(idEmpresa)
 );
 insert into usuario(nome, senha, email, fkEmpresa)values
 ("Kauã", "12345678", "leal@gmail.com", 1);
SELECT * FROM usuario;


-- Tabela Sensor
CREATE TABLE sensor (
idSensor INT PRIMARY KEY auto_increment,
statusSensor VARCHAR(20),
constraint chkStatus CHECK (statusSensor in ('Ativo','Inativo'))
);

select*from sensor;

insert into sensor values(null, 'ativo');

-- Tabela RegistroSensor
CREATE TABLE registroSensor(
idRegistro INT PRIMARY KEY auto_increment,
temperatura FLOAT,
dtHora  DATETIME default current_timestamp,
fkSensor INT,
foreign key (fkSensor) references sensor(idSensor)
);

select*from registroSensor;

insert into registroSensor values
(null, 5 ,now(), 1
);

ALTER TABLE empresa MODIFY COLUMN cnpj CHAR(18);

SELECT * fROM empresa;
SELECT * FROM empresa;
select*from registroSensor;

-- Tabela endereço
CREATE TABLE endereco (
idEndereco INT PRIMARY KEY auto_increment,
rua VARCHAR(45),
numero VARCHAR(20),
bairro VARCHAR(45),
cep CHAR(9),
cidade VARCHAR(45)
);

 -- Tabela Container
 CREATE TABLE container (
 idContainer INT PRIMARY KEY auto_increment,
 tipoContainer VARCHAR (40),
 qtdvacinas INT,
 constraint chkTipoContainer CHECK (tipoContainer in('caminhao','armazenamento')),
 fkEndereco INT,
 foreign key (fkEndereco) references endereco(idEndereco),
fkEmpresa INT,
foreign key (fkEmpresa) references empresa(idEmpresa),
fkSensor INT,
foreign key (fkSensor) references sensor(idSensor),
dtHoraInicio DATE,
dtFinal DATE
 );
