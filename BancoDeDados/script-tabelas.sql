CREATE DATABASE IF NOT EXISTS monitoramento;
USE monitoramento;

-- CONTROLE DE ACESSO

CREATE TABLE tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
);

CREATE TABLE empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome_fantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(100) UNIQUE
);

INSERT INTO empresa VALUES
(DEFAULT, "Tiktok", "1289657564", "123456789", "tiktok@corporation.com");

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    fk_tipo_usuario INT NOT NULL,
    fk_empresa INT NOT NULL,
    CONSTRAINT fk_usuario_tipo
        FOREIGN KEY (fk_tipo_usuario)
        REFERENCES tipo_usuario(id_tipo_usuario),
    CONSTRAINT fk_usuario_empresa
        FOREIGN KEY (fk_empresa)
        REFERENCES empresa(id_empresa)
);

-- MONITORAMENTO

CREATE TABLE servidor (
    id_servidor INT AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    endereco_ip VARCHAR(45) NOT NULL,
    sistema_operacional VARCHAR(45) NOT NULL,
    localizacao VARCHAR(100),
    ambiente ENUM('producao', 'homologacao', 'dev') NOT NULL,
    fk_empresa INT NOT NULL,
    PRIMARY KEY (id_servidor, fk_empresa),
    CONSTRAINT fk_servidor_empresa
        FOREIGN KEY (fk_empresa) 
        REFERENCES empresa(id_empresa)
);

CREATE TABLE componente (
    id_componente INT AUTO_INCREMENT PRIMARY KEY,
    fk_servidor INT NOT NULL,
    fk_empresa INT NOT NULL,
    tipo ENUM('CPU', 'RAM', 'DISCO') NOT NULL,
    unidade VARCHAR(10) NOT NULL,
    descricao VARCHAR(200),
    CONSTRAINT fk_componente_servidor
        FOREIGN KEY (fk_servidor, fk_empresa)
        REFERENCES servidor(id_servidor, fk_empresa)
);

CREATE TABLE responsavel (
    fk_id_usuario INT NOT NULL,
    fk_id_servidor INT NOT NULL,
    fk_id_empresa INT NOT NULL,
    turno VARCHAR(45),
    PRIMARY KEY (fk_id_usuario, fk_id_servidor, fk_id_empresa),
    CONSTRAINT fk_resp_usuario
        FOREIGN KEY (fk_id_usuario)
        REFERENCES usuario(id_usuario),
    CONSTRAINT fk_resp_servidor
        FOREIGN KEY (fk_id_servidor, fk_id_empresa)
        REFERENCES servidor(id_servidor, fk_empresa)
);

CREATE TABLE parametro_alerta (
    id_parametro_alerta INT AUTO_INCREMENT PRIMARY KEY,
    nivel VARCHAR(45),
    valor_limite INT,
    fk_id_servidor INT NOT NULL,
    fk_id_empresa INT NOT NULL,
    fk_id_componente INT NOT NULL,
    CONSTRAINT fk_param_servidor
        FOREIGN KEY (fk_id_servidor, fk_id_empresa)
        REFERENCES servidor(id_servidor, fk_empresa),
    CONSTRAINT fk_param_componente
        FOREIGN KEY (fk_id_componente)
        REFERENCES componente(id_componente)
);

-- inserts

INSERT INTO tipo_usuario (tipo) VALUES ('adm');
INSERT INTO tipo_usuario (tipo) VALUES ('user');