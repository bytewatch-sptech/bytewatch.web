CREATE DATABASE IF NOT EXISTS monitoramento;
USE monitoramento;

-- CONTROLE DE ACESSO

CREATE TABLE tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
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
        REFERENCES tipo_usuario(id_tipo_usuario)
);

-- MONITORAMENTO

CREATE TABLE servidor (
    id_servidor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    endereco_ip VARCHAR(45) NOT NULL,
    sistema_operacional VARCHAR(45) NOT NULL,
    localizacao VARCHAR(100),
    ambiente ENUM('producao', 'homologacao', 'dev') NOT NULL
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