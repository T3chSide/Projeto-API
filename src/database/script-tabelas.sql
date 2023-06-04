CREATE DATABASE nuvem;
USE nuvem;

-- Tabela Empresa
CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY auto_increment,
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
 tipo varchar(45),
  constraint chkStatus CHECK (tipo in ('Padrão','Supervisor','Administrador')),
 cpf char(14),
 constraint fkEmpresaUser foreign key (fkEmpresa) references empresa(idEmpresa)
 );
 
-- Tabela Sensor
CREATE TABLE sensor (
idSensor INT PRIMARY KEY auto_increment,
statusSensor VARCHAR(20),
constraint chkStatus CHECK (statusSensor in ('Ativo','Inativo'))
);

-- Tabela RegistroSensor
CREATE TABLE registroSensor(
idRegistro INT PRIMARY KEY auto_increment,
temperatura FLOAT,
dtHora  DATETIME default current_timestamp,
fkSensor INT,
foreign key (fkSensor) references sensor(idSensor)
);

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
    
select*from registroSensor;
select*from sensor;
select*from container;
select*from usuario;
select*from empresa;