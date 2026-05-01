CREATE DATABASE IF NOT EXISTS monitoramento;
USE monitoramento;

CREATE TABLE tipo_usuario (
  id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(45) NOT NULL UNIQUE,
  nivel_acesso VARCHAR(45) NULL,
  descricao VARCHAR(45) NULL
);

CREATE TABLE empresa (
  id_empresa INT AUTO_INCREMENT PRIMARY KEY,
  nome_fantasia VARCHAR(100) NOT NULL,
  cnpj VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(15) NULL,
  email VARCHAR(100) NULL UNIQUE
);

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  fk_tipo_usuario INT NOT NULL,
  fk_usuario_empresa INT NOT NULL,
  CONSTRAINT fk_usuario_tipo_usuario 
    FOREIGN KEY (fk_tipo_usuario) REFERENCES tipo_usuario (id_tipo_usuario),
  CONSTRAINT usuario_empresa 
    FOREIGN KEY (fk_usuario_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE componente (
  id_componente INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(45) NOT NULL,
  unidade VARCHAR(10) NOT NULL,
  descricao VARCHAR(200) NULL
);

CREATE TABLE regiao (
  id_regiao INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(20) NOT NULL,
  pais VARCHAR(45) NOT NULL,
  estado VARCHAR(45) NOT NULL,
  cidade VARCHAR(45) NOT NULL
);

CREATE TABLE zona_disponibilidade (
  id_zona_disponibilidade INT AUTO_INCREMENT PRIMARY KEY,
  codigo_zona VARCHAR(20) NOT NULL,
  fk_regiao INT NOT NULL,
  FOREIGN KEY (fk_regiao) REFERENCES regiao(id_regiao)
);


CREATE TABLE datacenter (
  id_datacenter INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  proprietario VARCHAR(45) NOT NULL,
  cep VARCHAR(12) NOT NULL,
  fk_zona_disponibilidade INT NOT NULL,
  FOREIGN KEY (fk_zona_disponibilidade) REFERENCES zona_disponibilidade(id_zona_disponibilidade)
);

CREATE TABLE servidor (
  id_servidor INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  endereco_ip VARCHAR(45) NOT NULL UNIQUE,
  tipo VARCHAR(45) NULL,
  status VARCHAR(45) NULL,
  mac_address VARCHAR(45) NOT NULL UNIQUE,
  fk_id_empresa INT NOT NULL,
  fk_datacenter INT NOT NULL,
  FOREIGN KEY (fk_id_empresa) REFERENCES empresa (id_empresa),
  FOREIGN KEY (fk_datacenter) REFERENCES datacenter(id_datacenter)
);

CREATE TABLE componente_servidor (
  fk_id_servidor INT NOT NULL,
  fk_id_componente INT NOT NULL,
  capacidade_limite INT NULL,
  limite_alerta INT NULL,
  PRIMARY KEY (fk_id_servidor, fk_id_componente),
  CONSTRAINT fk_comp_serv_servidorrr 
    FOREIGN KEY (fk_id_servidor) REFERENCES servidor (id_servidor) , -- ON DELETE CASCADE
  CONSTRAINT fk_comp_serv_componenteee 
    FOREIGN KEY (fk_id_componente) REFERENCES componente (id_componente)
);

CREATE TABLE responsavel (
  fk_id_usuario INT NOT NULL,
  fk_id_servidor INT NOT NULL,
  turno VARCHAR(45) NULL,
  PRIMARY KEY (fk_id_usuario, fk_id_servidor),
  CONSTRAINT fk_resp_usuario 
    FOREIGN KEY (fk_id_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_resp_servidor 
    FOREIGN KEY (fk_id_servidor) REFERENCES servidor (id_servidor)
);

INSERT INTO tipo_usuario (tipo) VALUES ('adm'), ('user');

INSERT INTO empresa (nome_fantasia, cnpj, telefone, email) VALUES 
('Tiktok', '1289657564', '123456789', 'tiktok@corporation.com');

INSERT INTO componente (id_componente, tipo, unidade, descricao) VALUES
(1, 'CPU', 'Ghz', 'Unidade Central de Processamento'),
(2, 'RAM', 'Mb', 'Memoria RAM'),
(3, 'Disco', 'Gb', 'Armazenamento de Disco'),
(4, 'Rede', 'Mb', 'Componente de Rede');


INSERT INTO regiao (nome, pais, estado, cidade) VALUES 
('sa-east-1', 'Brasil', 'São Paulo', 'São Paulo'),
('us-east-1', 'EUA', 'Virgínia', 'Ashburn'),
('ap-southeast-1', 'Singapura', 'Singapura', 'Singapura');

INSERT INTO zona_disponibilidade (codigo_zona, fk_regiao) VALUES 
('sa-east-1a', 1), 
('sa-east-1b', 1), 
('us-east-1a', 2), 
('us-east-1b', 2), 
('ap-southeast-1a', 3); 


INSERT INTO datacenter (nome, proprietario, cep, fk_zona_disponibilidade) VALUES 
('DC-SP-01', 'AWS', '01100-000', 1),  
('DC-SP-02', 'ByteDance', '06454-000', 2),
('DC-VA-ORACLE', 'Oracle Cloud', '20147', 3),       
('DC-SG-01', 'ByteDance', '188067', 5);   

ALTER TABLE componente_servidor 
ADD CONSTRAINT fk_comp_serv_servidor 
FOREIGN KEY (fk_id_servidor) 
REFERENCES servidor (id_servidor) 
ON DELETE CASCADE;