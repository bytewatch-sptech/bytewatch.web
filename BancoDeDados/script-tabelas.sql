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
	id_componente_servidor INT auto_increment,
	  fk_id_servidor INT NOT NULL,
	  fk_id_componente INT NOT NULL,
	  capacidade_limite INT NULL,
	  limite_alerta INT NULL,
	  PRIMARY KEY (id_componente_servidor, fk_id_servidor, fk_id_componente),
	  CONSTRAINT fk_comp_serv_servidorrr 
		FOREIGN KEY (fk_id_servidor) REFERENCES servidor (id_servidor) ON DELETE CASCADE, -- ON DELETE CASCADE
	  CONSTRAINT fk_comp_serv_componenteee 
		FOREIGN KEY (fk_id_componente) REFERENCES componente (id_componente)
	);

	CREATE TABLE historico_alertas (
		id_alerta INT PRIMARY KEY AUTO_INCREMENT,
		valor_leitura DECIMAL(5,2) NOT NULL,
		status_alerta VARCHAR(15) NOT NULL, 
		data_abertura DATETIME NOT NULL,
		data_resolucao DATETIME NULL,
		fk_usuario INT NOT NULL,
		fk_id_componente_servidor INT NOT NULL,
		jira_key VARCHAR(10) NULL,
		CONSTRAINT fk_historico_alerta_usuario
			FOREIGN KEY (fk_usuario) 
			REFERENCES usuario (id_usuario),
		CONSTRAINT fk_historico_alerta_componente_servidor
			FOREIGN KEY (fk_id_componente_servidor)
			REFERENCES componente_servidor (id_componente_servidor)
	);

	CREATE TABLE responsavel (
	  fk_id_usuario INT NOT NULL,
	  fk_id_servidor INT NOT NULL,
	  turno VARCHAR(45) NULL,
	  PRIMARY KEY (fk_id_usuario, fk_id_servidor),
	  CONSTRAINT fk_resp_usuario 
		FOREIGN KEY (fk_id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE,
	  CONSTRAINT fk_resp_servidor 
		FOREIGN KEY (fk_id_servidor) REFERENCES servidor (id_servidor) ON DELETE CASCADE
	);
    
SELECT id_alerta, valor_leitura, status_alerta, data_abertura, data_resolucao, jira_key 
FROM historico_alertas WHERE jira_key = 'KAN-25';

	INSERT INTO tipo_usuario (tipo) VALUES ('Analista'), ('Gestor');

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
    
    INSERT INTO servidor(nome, endereco_ip, tipo, status, mac_address, fk_id_empresa, fk_datacenter) VALUES 
    ("Iada", "5.11.11.5", "Database", "Ativo", "8c:b0:e9:c2:04:27", 1, 1),
    ("Beatriz", "179.60.192.36", "DNS", "Ativo", "38-14-28-4e-8b-6a", 1, 2),
    ("Mendes", "41.77.112.61", "WEB", "Ativo", "71-b5-e8-fc-b5-fa", 1, 3),
    ("Cordeiro", "61.9.133.193", "Backup", "Ativo", "VAZIO", 1, 4),
    ("Luis - Idea", "203.50.2.71", "Proxy", "Ativo", "24:fe:9a:06:99:2f", 1, 1),
    ("Tiktok - Xeon", "94.140.14.14", "Machine Learning", "Ativo", "22:09:4d:12:44:ac", 1, 2),
    ("Luis - TK", "195.46.39.39", "API REST", "Ativo", "00:2b:67:e7:9f:72", 1, 3),
    ("Ryan", "64.6.64.6", "Security", "Ativo", "VAZIO2", 1, 4);
    
    INSERT INTO usuario (nome, senha, email, cpf, fk_tipo_usuario, fk_usuario_empresa) 
    VALUES ('Bruna', 'bruna123','bruna@email.com', '12345678901', 2, 1);

	select * from servidor;
    

CREATE USER 'bytewatch'@'%' IDENTIFIED BY '@Bytewatch2026';
GRANT ALL PRIVILEGES ON *.* TO 'bytewatch'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

# DROP USER 'bytewatch'@'%';
# FLUSH PRIVILEGES;