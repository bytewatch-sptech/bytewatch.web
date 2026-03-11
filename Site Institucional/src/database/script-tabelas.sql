CREATE DATABASE IF NOT EXISTS monitoramento;
USE monitoramento;

-- CONTROLE DE ACESSO

CREATE TABLE tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
);

CREATE TABLE empresa(
	id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(13) UNIQUE NOT NULL,
    telefone CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL    
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
	email VARCHAR(100) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
    fk_tipo_usuario INT NOT NULL,
    CONSTRAINT fk_usuario_tipo
        FOREIGN KEY (fk_tipo_usuario)
			REFERENCES tipo_usuario(id_tipo_usuario),
	fk_usuario_empresa INT NOT NULL,
    CONSTRAINT fk_empresa
		FOREIGN KEY (fk_usuario_empresa)
			REFERENCES empresa(id_empresa)
);


-- MONITORAMENTO

CREATE TABLE servidor (
    id_servidor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    endereco_ip VARCHAR(45) NOT NULL,
    sistema_operacional VARCHAR(45) NOT NULL,
    localizacao VARCHAR(100),
    ambiente ENUM('producao', 'homologacao', 'dev') NOT NULL,
    fk_servidor_empresa INT NOT NULL,
		FOREIGN KEY (fk_servidor_empresa)
			REFERENCES empresa(id_empresa)
);

CREATE TABLE componente (
    id_componente INT AUTO_INCREMENT PRIMARY KEY,
    fk_servidor INT NOT NULL,
    tipo ENUM('CPU', 'RAM', 'DISCO') NOT NULL,
    unidade VARCHAR(10) NOT NULL,
    descricao VARCHAR(200),
    CONSTRAINT fk_componente_servidor
        FOREIGN KEY (fk_servidor)
			REFERENCES servidor(id_servidor)
);

CREATE TABLE componente_servidor(
	fk_servidor INT,
    fk_empresa_componente INT,
    fk_componente_servidores INT,
		CONSTRAINT pk_componente_servidor
			PRIMARY KEY (fk_servidor, fk_empresa_componente, fk_componente_servidores),
		CONSTRAINT fk_servidor
			FOREIGN KEY (fk_servidor)
				REFERENCES servidor(id_servidor),
		CONSTRAINT fk_empresa_componente
			FOREIGN KEY (fk_empresa_componente)
				REFERENCES empresa(id_empresa),
		CONSTRAINT fk_componente_servidores
			FOREIGN KEY (fk_componente_servidores)
				REFERENCES componente(id_componente)
);

CREATE TABLE registro (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    fk_componente INT NOT NULL,
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    valor DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_registro_componente
        FOREIGN KEY (fk_componente)
        REFERENCES componente(id_componente)
);

CREATE TABLE alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    fk_registro INT NOT NULL,
    fk_componente INT NOT NULL,
    nivel ENUM('Informação', 'Alerta', 'Crítico') NOT NULL,
    mensagem VARCHAR(200) NOT NULL,
    CONSTRAINT fk_alerta_registro
        FOREIGN KEY (fk_registro)
        REFERENCES registro(id_registro),
    CONSTRAINT fk_alerta_componente
        FOREIGN KEY (fk_componente)
        REFERENCES componente(id_componente)
);

insert into tipo_usuario (tipo) values ('adm');
insert into tipo_usuario (tipo) values ('user');

SELECT id_usuario, nome, email, fk_tipo_usuario FROM usuario WHERE email = 'joao.jortiekejr@sptech.school';

SELECT * FROM usuario;
