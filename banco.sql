CREATE TABLE Funcionario (
    NumCarteiraT NUMERIC PRIMARY KEY,
    Telefone NUMERIC,
    datanasc DATE NOT NULL,
    fk_Turno_s__Turno_s__PK INT DEFAULT 1,
    Salario NUMERIC NOT NULL DEFAULT 0,
    Endereco VARCHAR,
    RG NUMERIC,
    HorasExtras INT,
    Aumento INT,
    Faltas_mes INT,
    ValeTransporte NUMERIC,
    id uuid,
    Foto VARCHAR,
    NumDependente INT DEFAULT 0,
    eGerente BOOLEAN DEFAULT false
);

CREATE TABLE Curriculo (
    nome VARCHAR,
    RG NUMERIC PRIMARY KEY,
    Telefone NUMERIC,
    NumCarteira NUMERIC
);

CREATE TABLE Contrata (
    DataContratamento DATE,
    RGpessoa NUMERIC,
    NumCarteira NUMERIC
);
CREATE TABLE Fornecedor (
    nome VARCHAR,
    telefone NUMERIC,
    Endereco VARCHAR,
    CNPJ NUMERIC PRIMARY KEY,
    id NUMERIC
);
CREATE TABLE Produto (
    codigo INT PRIMARY KEY,
    nome VARCHAR,
    precoProduto NUMERIC
);
CREATE TABLE Prato (
    nomeprato VARCHAR,
    preco NUMERIC,
    numero INT PRIMARY KEY
);

CREATE TABLE CriarPrato (fk_Produto_codigo INT, fk_Prato_numero INT);

CREATE TABLE CLTBeneficios (
    Vale_refeicao NUMERIC,
    PisoSalarial NUMERIC,
    ReajusteSalarial NUMERIC,
    MaxHorasExtras INT,
    Categoria VARCHAR PRIMARY KEY,
    fk_Funcionario_NumCarteiraT NUMERIC
);
CREATE TABLE Possui (
    fk_Funcionario_NumCarteiraT NUMERIC,
    fk_CLTBeneficios_Categoria VARCHAR
);
CREATE TABLE Caixa_Diario (id INT PRIMARY KEY, data DATE);
CREATE TABLE Dependente (
    nome VARCHAR,
    telefone NUMERIC,
    parentesco VARCHAR,
    Idade INT,
    DtNascimento DATE,
    fk_Funcionario_NumCarteiraT NUMERIC
);
CREATE TABLE FolhaPagamento (
    cod SERIAL PRIMARY KEY,
    total_mensal NUMERIC,
    Mes_Ano DATE
);
CREATE TABLE Turnos (
    Turno_s__PK INT NOT NULL PRIMARY KEY,
    Turnos VARCHAR
);
CREATE TABLE Fornece (
    fk_Fornecedor_CNPJ NUMERIC,
    fk_Produto_codigo INT,
    Quantidade INT,
    Data_pagamento DATE,
    PrecoCompra NUMERIC,
    Data_Pedido DATE,
    FormaPagamento VARCHAR
);
CREATE TABLE Tipo_pagamento (
    cod int PRIMARY KEY,
    Tipo VARCHAR,
    Desconto NUMERIC,
    dataRecebimento DATE
);
CREATE TABLE forma_pagamento (
    codtipo int,
    fk_Caixa_Diario_id INT,
    Valor NUMERIC
);
CREATE TABLE CustoMensal (
    id INT PRIMARY KEY,
    data DATE,
    valor NUMERIC
);

create table foto_funcionario (
  id serial primary key,
  func_id numeric references funcionario,
  foto bytea
);
/*O "ON DELETE CASCADE" está sendo usado para permitir a exclusão em
 cascata dos funcionarios
 excluindo todas as entradas correspondentes em "Turno"*/
ALTER TABLE Funcionario
ADD CONSTRAINT FK_Funcionario_2 FOREIGN KEY (fk_Turno_s__Turno_s__PK) REFERENCES Turnos (Turno_s__PK) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE SET NULL" está sendo usado para definir um valor nulo
 quando
 o funcionario for excluído "O UPDATE ON CASCATE" */
ALTER TABLE Contrata
ADD CONSTRAINT FK_Contratata_2 FOREIGN KEY (RGpessoa) REFERENCES Curriculo(RG) ON DELETE
SET NULL ON UPDATE CASCADE;
/*O "ON DELETE SET NULL" está sendo usado para definir um valor nulo
 quando
 o funcionario for excluído*/
ALTER TABLE Contrata
ADD CONSTRAINT FK_ContratataFUNC_2 FOREIGN KEY (NumCarteira) REFERENCES Funcionario (NumCarteiraT) ON DELETE
SET NULL ON UPDATE CASCADE;
/*O "ON DELETE CASCADE " está sendo usado para permitir a exclusão em
 cascata dos funcionarios
 excluindo todas as entradas correspondentes em beneficios e o "ON UPDATE
 CASCADE" para caso o funcinario receba alguma atualizacao*/
ALTER TABLE CLTBeneficios
ADD CONSTRAINT FK_CLTBeneficios_2 FOREIGN KEY (fk_Funcionario_NumCarteiraT) REFERENCES Funcionario (NumCarteiraT) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE CASCADE " está sendo usado para permitir a exclusão em
 cascata dos funcionarios
 excluindo todas as entradas correspondentes em dependentes e o "ON
 UPDATE
 CASCADE" para caso o funcinario receba alguma atualizacao*/
ALTER TABLE Dependente
ADD CONSTRAINT FK_Dependente_1 FOREIGN KEY (fk_Funcionario_NumCarteiraT) REFERENCES Funcionario (NumCarteiraT) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE CASCADE " está sendo usado para permitir a exclusão em
 cascata dos funcionarios
 excluindo todas as entradas correspondentes em possuir beneficio e o "ON
 UPDATE
 CASCADE" para caso o funcinario receba alguma atualizacao*/
ALTER TABLE Possui
ADD CONSTRAINT FK_Possui_1 FOREIGN KEY (fk_Funcionario_NumCarteiraT) REFERENCES Funcionario (NumCarteiraT) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE CASCADE " está sendo usado para permitir a exclusão em
 cascata dos funcionarios
 excluindo todas as entradas correspondentes em possuir beneficio e o "ON
 UPDATE
 CASCADE" para caso o beneficios receba alguma atualizacao*/
ALTER TABLE Possui
ADD CONSTRAINT FK_Possui_2 FOREIGN KEY (fk_CLTBeneficios_Categoria) REFERENCES CLTBeneficios (Categoria) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE RESTRICT" é usado para impedir a exclusão de um
 fornecedor
 "ON UPDATE CASCADE" para caso o fornecedor receba alguma atualizacao*/
ALTER TABLE Fornece
ADD CONSTRAINT FK_Fornece_1 FOREIGN KEY (fk_Fornecedor_CNPJ) REFERENCES Fornecedor (CNPJ) ON DELETE RESTRICT ON UPDATE CASCADE;
/*O "ON DELETE CASCADE " está sendo usado para permitir a exclusão em
 cascata do fornece
 excluindo todas as entradas correspondentes em possuir beneficio e o "ON
 UPDATE
 CASCADE" para caso o Produtos receba alguma atualizacao*/
ALTER TABLE Fornece
ADD CONSTRAINT FK_Fornece_2 FOREIGN KEY (fk_Produto_codigo) REFERENCES Produto (codigo) ON DELETE CASCADE ON UPDATE CASCADE;
/*O "ON DELETE RESTRICT" pois é necessário que as informações de um
 produto
 estejam disponiveis para efetuar o a criacao do prato*/
ALTER TABLE CriarPrato
ADD CONSTRAINT FK_CriarPrato_1 FOREIGN KEY (fk_Produto_codigo) REFERENCES Produto (codigo) ON DELETE RESTRICT ON UPDATE CASCADE;
/*O "ON DELETE RESTRICT" pois é necessário que as informações do um
 prato
 estejam disponiveis para a criacao do prato*/
ALTER TABLE CriarPrato
ADD CONSTRAINT FK_CriarPrato_2 FOREIGN KEY (fk_Prato_numero) REFERENCES Prato (numero) ON DELETE RESTRICT ON UPDATE CASCADE;
/*O "ON DELETE RESTRICT" pois é necessário que as informações do um
 caixa
 estejam disponiveis para a forma de pagamento*/
ALTER TABLE forma_pagamento
ADD CONSTRAINT FK_forma_pagamento_1 FOREIGN KEY (fk_Caixa_Diario_id) REFERENCES Caixa_Diario (id) ON DELETE RESTRICT ON UPDATE CASCADE;
/*O "ON DELETE RESTRICT" pois é necessário que as informações da forma
 pagamento
 estejam disponiveis para a forma de pagamento*/
ALTER TABLE forma_pagamento
ADD CONSTRAINT FK_forma_pagamento_2 FOREIGN KEY (codtipo) REFERENCES Tipo_pagamento (cod) ON DELETE RESTRICT ON UPDATE CASCADE;

alter table funcionario
add constraint conecta_usuario FOREIGN KEY (id) references auth.users ON DELETE CASCADE;

INSERT INTO Funcionario (
        Telefone,
        datanasc,
        Salario,
        Endereco,
        RG,
        NumCarteiraT,
        HorasExtras,
        Aumento,
        Faltas_mes,
        ValeTransporte,
        Foto
    )
VALUES (
        '1234567890',
        '1990-01-01',
        2000.00,
        'Rua A, 123',
        123456789,
        1,
        10,
        0.05,
        2,
        120,
        'foto1.jpg'
    ),
    (
        '9876543210',
        '1985-05-15',
        2500.00,
        'Rua B, 456',
        987654321,
        2,
        5,
        0.02,
        3,
        120,
        'foto2.jpg'
    ),
    (
        '5555555555',
        '1992-09-30',
        1800.00,
        'Rua C, 789',
        555555555,
        3,
        8,
        0.03,
        1,
        120,
        'foto3.jpg'
    ),
    (
        '9999999999',
        '1988-12-10',
        3000.00,
        'Rua D, 987',
        999999999,
        4,
        12,
        0.1,
        0,
        120,
        'foto4.jpg'
    ),
    (
        '1111111111',
        '1995-07-20',
        2200.00,
        'Rua E, 654',
        111111111,
        5,
        6,
        0.04,
        2,
        120,
        'foto5.jpg'
    );
INSERT INTO turnos (turnos, Turno_s__PK)
VALUES ('Manhã', 1),
    ('Tarde', 2),
    ('Noite', 3),
    ('Manhã', 4),
    ('Tarde', 5);
INSERT INTO Fornecedor (nome, telefone, Endereco, CNPJ, id)
VALUES ('Fornecedor A', 1234567890, 'Rua X, 123', 001, 1),
    ('Fornecedor B', 9876543210, 'Rua Y, 456', 002, 2),
    ('Fornecedor C', 5555555555, 'Rua Z, 789', 003, 3),
    ('Fornecedor D', 9999999999, 'Rua W, 987', 004, 4),
    ('Fornecedor E', 1111111111, 'Rua V, 654', 005, 5);
INSERT INTO Produto (codigo, nome, precoProduto)
VALUES (1, 'Produto A', 10.99),
    (2, 'Produto B', 20.99),
    (3, 'Produto C', 15.99),
    (4, 'Produto D', 8.99),
    (5, 'Produto E', 12.99);
INSERT INTO CLTBeneficios (
        Vale_refeicao,
        PisoSalarial,
        ReajusteSalarial,
        MaxHorasExtras,
        Categoria
    )
VALUES (150.00, 2000.00, 0.05, 10, 'Categoria A'),
    (200.00, 1800.00, 0.03, 8, 'Categoria B'),
    (100.00, 2200.00, 0.04, 12, 'Categoria C'),
    (120.00, 2500.00, 0.02, 6, 'Categoria D'),
    (180.00, 1900.00, 0.06, 14, 'Categoria E');
INSERT INTO Caixa_Diario (id, data)
VALUES (1, '2015-05-02'),
    (2, '2012-02-12'),
    (3, '2022-03-05'),
    (4, '2018-02-10'),
    (5, '2023-05-09');
INSERT INTO Dependente (
        nome,
        telefone,
        parentesco,
        Idade,
        DtNascimento,
        fk_Funcionario_NumCarteiraT
    )
VALUES (
        'Dependente A',
        1234567890,
        'Filho',
        10,
        '2012-05-01',
        1
    ),
    (
        'Dependente B',
        9876543210,
        'Cônjuge',
        35,
        '1988-02-15',
        2
    ),
    (
        'Dependente C',
        5555555555,
        'Filho',
        8,
        '2014-11-10',
        3
    ),
    (
        'Dependente D',
        9999999999,
        'Filho',
        15,
        '2008-08-20',
        4
    ),
    (
        'Dependente E',
        1111111111,
        'Cônjuge',
        42,
        '1981-06-05',
        5
    );
INSERT INTO Curriculo (nome, RG, Telefone, NumCarteira)
VALUES ('Curriculo A', 123456789, 9876543210, 001),
    ('Curriculo B', 987654321, 5555555555, 002),
    ('Curriculo C', 555555555, 9999999999, 003),
    ('Curriculo D', 999999999, 1111111111, 004),
    ('Curriculo E', 111111111, 1234567890, 005);
INSERT INTO FolhaPagamento (total_mensal, mes_ano)
VALUES (2000.00, '2023-05-01'),
    (2500.00, '2023-05-02'),
    (1800.00, '2023-05-03'),
    (3000.00, '2023-05-04'),
    (2200.00, '2023-05-05');
INSERT INTO Possui (
        fk_Funcionario_NumCarteiraT,
        fk_CLTBeneficios_Categoria
    )
VALUES (1, 'Categoria A'),
    (2, 'Categoria B'),
    (3, 'Categoria C'),
    (4, 'Categoria D'),
    (5, 'Categoria E');
INSERT INTO Prato (nomeprato, preco, numero)
VALUES ('PRATO A', 10, 1),
    ('PRATO B', 12, 2),
    ('PRATO C', 13, 3),
    ('PRATO D', 14, 4),
    ('PRATO E', 15, 5);
INSERT INTO CriarPrato (fk_Produto_codigo, fk_Prato_numero)
VALUES (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);
INSERT INTO Fornece (
        fk_Fornecedor_CNPJ,
        fk_Produto_codigo,
        Quantidade,
        Data_pagamento,
        PrecoCompra,
        Data_Pedido,
        FormaPagamento
    )
VALUES (
        001,
        1,
        10,
        '2023-05-01',
        100.00,
        '2023-04-28',
        'Cartão de Crédito'
    ),
    (
        002,
        2,
        5,
        '2023-05-02',
        50.00,
        '2023-04-29',
        'Dinheiro'
    ),
    (
        003,
        3,
        8,
        '2023-05-03',
        80.00,
        '2023-04-30',
        'Cartão de Débito'
    ),
    (
        004,
        4,
        3,
        '2023-05-04',
        30.00,
        '2023-05-01',
        'Pix'
    ),
    (
        005,
        5,
        6,
        '2023-05-05',
        60.00,
        '2023-05-02',
        'Cheque'
    );
INSERT INTO Contrata (NumCarteira, RGpessoa, DataContratamento)
VALUES (001, 123456789, '2023-01-01'),
    (002, 987654321, '2023-02-01'),
    (003, 555555555, '2023-03-01'),
    (004, 999999999, '2023-04-01'),
    (005, 111111111, '2023-05-01');
INSERT INTO Tipo_pagamento (cod, Tipo, Desconto, dataRecebimento)
VALUES (1, 'CARTAO CREDITO', 3, '2023-05-01'),
    (2, 'DEBITO', 2, '2023-05-01'),
    (3, 'DINHEIRO', 1, '2023-05-01'),
    (4, 'DEBITO', 0, '2023-05-01'),
    (5, 'DEBITO', 0, '2023-05-01');
INSERT INTO forma_pagamento(fk_Caixa_Diario_id, valor)
VALUES (1, 10),
    (2, 22),
    (3, 33),
    (4, 48),
    (5, 15);
INSERT INTO Contrata (NumCarteira, RGpessoa, DataContratamento)
VALUES (001, 123456789, '2023-05-01'),
    (002, 987654321, '2023-05-01'),
    (003, 555555555, '2023-05-01'),
    (004, 111111111, '2023-05-01'),
    (005, 999999999, '2023-05-01');
INSERT INTO CustoMensal (id, data, valor)
VALUES (1, '2023-05-01', 2300),
    (2, '2023-05-01', 4562),
    (3, '2023-05-01', 4512),
    (4, '2023-05-01', 1232),
    (5, '2023-05-01', 1235600);
INSERT INTO FolhaPagamento (total_mensal, MEs_Ano)
VALUES (10000, '2023-01-01'),
    (20000, '2023-02-01'),
    (13000, '2023-03-01'),
    (12000, '2023-04-01'),
    (11000, '2023-05-01');
INSERT INTO Fornece (
        fk_Fornecedor_CNPJ,
        fk_Produto_codigo,
        Quantidade,
        Data_pagamento,
        PrecoCompra,
        Data_Pedido,
        FormaPagamento
    )
VALUES (
        001,
        1,
        10,
        '2023-05-01',
        100.00,
        '2023-04-28',
        'Cartão de Crédito'
    ),
    (
        002,
        2,
        5,
        '2023-05-02',
        50.00,
        '2023-04-29',
        'Dinheiro'
    ),
    (
        003,
        3,
        8,
        '2023-05-03',
        80.00,
        '2023-04-30',
        'Cartão de Débito'
    ),
    (
        004,
        4,
        3,
        '2023-05-04',
        30.00,
        '2023-05-01',
        'Pix'
    ),
    (
        005,
        5,
        6,
        '2023-05-05',
        60.00,
        '2023-05-02',
        'Cheque'
    );

/*Quando a função "calculofolhapagamento" é executada, ela calcula o valor
 total dos salários dos funcionários e o valor total dos pagamentos a
 fornecedores no mês anterior, e insere um novo registro na tabela
 "folhapagamento" com o total mensal e a data atual. Essa função pode ser
 chamada periodicamente para manter o registro das folhas de pagamento
 atualizadas*/
CREATE OR REPLACE FUNCTION calculofolhapagamento() RETURNS VOID AS $$
DECLARE salariof numeric;
pagamentoforn numeric := 0;
total numeric := 0;
BEGIN
SELECT INTO salariof SUM(Salario)
FROM Funcionario;
SELECT INTO pagamentoforn SUM(precocompra)
FROM Fornece
WHERE data_pagamento < now()
    AND EXTRACT(
        MONTH
        FROM data_pagamento
    ) >= EXTRACT(
        MONTH
        FROM NOW()
    ) -1
    AND EXTRACT(
        YEAR
        FROM data_pagamento
    ) = EXTRACT(
        YEAR
        FROM NOW()
    );
total := salariof + pagamentoforn;
INSERT INTO folhapagamento(total_mensal, mes_ano)
VALUES (total, now());
END;
$$language plpgsql;
SELECT *
FROM calculofolhapagamento();
SELECT *
FROM folhapagamento;

/* A função verifica o tipo de operação e obtém o número da carteira de
 trabalho do funcionário afetado pela operação. Em seguida, conta o número
 total de dependentes desse funcionário e atualiza o campo
 "numdependente" na tabela "Funcionario" com o valor obtido. O gatilho
 "calculodep" é associado à tabela "Dependente" e é acionado
 automaticamente após uma operação de atualização, inserção ou exclusão
 na tabela. Ele chama a função "calculodep()" para realizar o cálculo e a
 atualização do número de dependentes do funcionário afetado. */
CREATE OR REPLACE FUNCTION calculodep() RETURNS TRIGGER 
AS $$
DECLARE
     numF numeric;
    total int;
BEGIN 
    IF (TG_OP = 'DELETE') THEN 
        numF = OLD.fk_Funcionario_NumCarteiraT;
    ELSE 
        numF = NEW.fk_Funcionario_NumCarteiraT;
    END IF;

    SELECT INTO total count(*)
        FROM Dependente
        WHERE fk_Funcionario_NumCarteiraT = numF;
        UPDATE Funcionario
        SET numdependente = total
        WHERE numcarteirat = numF;

    return null;
END;
$$language plpgsql;


CREATE OR REPLACE TRIGGER calculodep
AFTER
UPDATE
    OR
INSERT
    OR DELETE ON Dependente FOR EACH ROW EXECUTE PROCEDURE calculodep();
INSERT INTO Dependente
VALUES (
        'Dependente
G',
        8745632,
        'Cônjuge',
        10,
        '2013-01-02',
        1
    );
SELECT *
FROM Dependente;
SELECT *
FROM Funcionario;
/* A view "ViewFuncionario" mostra o número da carteira de trabalho do
 funcionário, o endereço do funcionário, o nome do cargo e o benefício de
 vale-refeição associado ao funcionário. Essa view pode ser consultada
 posteriormente para obter informações consolidadas sobre os funcionários,
 seus cargos e benefícios relacionados, sem a necessidade de escrever a
 consulta complexa repetidamente. */
CREATE VIEW ViewFuncionario AS
SELECT f.NumCarteiraT,
    f.Endereco,
    c.nome AS Cargo,
    b.Vale_refeicao
FROM Funcionario f
    JOIN CLTBeneficios b ON f.NumCarteiraT = b.fk_Funcionario_NumCarteiraT
    JOIN Contrata ct ON f.RG = ct.RGpessoa
    JOIN Curriculo c ON ct.RGpessoa = c.RG;
SELECT *
FROM ViewFuncionario;
/* Essa view chamada "ViewFornecedoresProdutos" é criada para fornecer
 uma visualização dos fornecedores e produtos relacionados. Essa view pode
 ser consultada posteriormente para obter informações consolidadas sobre
 os fornecedores e produtos relacionados, sem a necessidade de escrever a
 consulta complexa repetidamente. */
CREATE VIEW ViewFornecedoresProdutos AS
SELECT f.nome AS nome_fornecedor,
    f.telefone,
    p.nome AS nome_produto,
    p.precoProduto
FROM Fornecedor f
    JOIN Fornece fo ON f.CNPJ = fo.fk_Fornecedor_CNPJ
    JOIN Produto p ON fo.fk_Produto_codigo = p.codigo;
SELECT *
FROM ViewFornecedoresProdutos;
/* Resumindo, essa função e o gatilho têm o objetivo de manter a margem
 de lucro de um prato na tabela "Prato". Se o preço do novo prato for menor
 ou igual ao preço do produto relacionado, o preço do prato será atualizado
 para garantir uma margem de lucro desejada. */
CREATE OR REPLACE FUNCTION manter_margem_lucro() RETURNS TRIGGER AS $$
DECLARE prod_prato Produto;
BEGIN
SELECT * INTO prod_prato
FROM Produto
    JOIN CriarPrato ON Produto.codigo = CriarPrato.fk_Produto_codigo
WHERE CriarPrato.fk_Prato_numero = NEW.numero;
IF NEW.preco <= prod_prato.precoProduto THEN RAISE notice 'Atualizando prec %',
prod_prato.precoProduto;
NEW.preco = prod_prato.precoProduto * 2;
END IF;
return NEW;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE TRIGGER manter_margen_trigger BEFORE
UPDATE
    OR
INSERT on Prato FOR EACH ROW EXECUTE PROCEDURE manter_margem_lucro();
UPDATE Prato
SET preco = 1
WHERE numero = 1;
SELECT *
FROM Prato
WHERE numero = 1;
/* A função AplicarDesconto serve para aplicar um desconto ao valor com
 base no tipo de pagamento fornecido. */
-- Função que aplica o desconto
CREATE OR REPLACE FUNCTION AplicarDesconto(
        IN tipoParam VARCHAR(255),
        IN valorParam NUMERIC,
        IN caixaDiarioParam INT
    ) RETURNS void AS $$
DECLARE descontoParam NUMERIC;
codParam INT;
valorFinal NUMERIC;
BEGIN -- Define o desconto fixo com base no tipo de pagamento
IF tipoParam = 'Dinheiro' THEN descontoParam := 0.1;
-- 10% de desconto
ELSIF tipoParam = 'Crédito' THEN descontoParam := 0.05;
-- 5% de desconto
ELSIF tipoParam = 'Débito' THEN descontoParam := 0.07;
-- 7% de desconto
ELSE descontoParam := 0;
-- Sem desconto para outros tipos
END IF;
-- Calcula o valor final aplicando o desconto
valorFinal := valorParam - (valorParam * descontoParam);
-- Insere o pagamento com desconto na tabela "forma_pagamento"
INSERT INTO forma_pagamento (codtipo, fk_Caixa_Diario_id, Valor)
SELECT cod,
    caixaDiarioParam,
    valorFinal
FROM Tipo_pagamento
WHERE Tipo ~* tipoParam;
RETURN;
END;
$$ LANGUAGE plpgsql;
select *
from AplicarDesconto('Dinheiro', 123.12, 1);
select *
from forma_pagamento;
-- Procedure que calcula a idade do dependente com base na data inserida
CREATE OR REPLACE FUNCTION calcularIdadeDependente() RETURNS TRIGGER AS $$
DECLARE idade INTEGER;
BEGIN idade := DATE_PART('year', NEW.DtNascimento) - DATE_PART('year', CURRENT_DATE);
IF DATE_PART('month', NEW.DtNascimento) > DATE_PART('month', CURRENT_DATE)
OR (
    DATE_PART('month', NEW.DtNascimento) = DATE_PART('month', CURRENT_DATE)
    AND DATE_PART('day', NEW.DtNascimento) > DATE_PART('day', CURRENT_DATE)
) THEN idade := idade - 1;
END IF;
NEW.Idade := ABS(idade);
-- Para ficar positivo a idade
RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- Trigger que aciona a procedure para calcular a idade do dependente ao
inserir uma nova linha na tabela Dependente
CREATE OR REPLACE TRIGGER trigger_calcular_idade_dependente BEFORE
INSERT ON Dependente FOR EACH ROW EXECUTE FUNCTION calcularIdadeDependente();

INSERT INTO Dependente (nome, telefone, parentesco, DtNascimento)
VALUES ('João', '123456789', 'Filho', '2005-06-10');

CREATE or REPLACE FUNCTION del_user()
RETURNS TRIGGER
SECURITY definer
AS $$
BEGIN
  DELETE FROM auth.users au WHERE au.id = OLD.id;  
  return OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER del_user_trigger AFTER DELETE ON funcionario FOR EACH ROW execute procedure del_user();

CREATE VIEW funcionario_completo AS
select f.*, c.nome, co.datacontratamento from funcionario as f join curriculo as c on f.rg = c.rg join contrata as co on c.RG = co.rgpessoa;


CREATE FUNCTION gerarcustomensal() RETURNS void
    AS $$DECLARE 
	salariof numeric;
	recebimento numeric :=0;
	pagamentoforn numeric:=0;
	total numeric :=0 ;
BEGIN
	SELECT INTO salariof SUM(Salario) FROM funcionario;
	SELECT INTO pagamentoforn SUM(precocompra) FROM fornece 
	WHERE data_pagamento < now() AND EXTRACT(MONTH FROM data_pagamento) >= EXTRACT(MONTH FROM NOW())-1 AND EXTRACT(YEAR FROM data_pagamento) = EXTRACT(YEAR FROM NOW());
	IF pagamentoforn > 0
	THEN
		pagamentoforn:= pagamentoforn;
	ELSE
		pagamentoforn:= 0;
	END IF;
	total := salariof + pagamentoforn;
	SELECT SUM INTO recebimento(valor) FROM (forma_pagamento f INNER JOIN tipo_pagamento t ON  f.codtipo = t.cod)
	WHERE datarecebimento < now() AND EXTRACT(MONTH FROM datarecebimento) >= EXTRACT(MONTH FROM NOW())-1 AND EXTRACT(YEAR FROM datarecebimento) = EXTRACT(YEAR FROM NOW());
	IF recebimento > 0
	THEN
		recebimento:= 0;
	END IF;
	total := recebimento - total;
	INSERT INTO customensal(valor, data) VALUES (total,now());
END;$$; LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION gerarfolhapagamento() RETURNS VOID AS
$$
DECLARE 
	salariof numeric;
	pagamentoforn numeric:=0;
	total numeric :=0 ;
	
BEGIN
	SELECT INTO salariof SUM(Salario) FROM Funcionario;
	SELECT INTO pagamentoforn SUM(precocompra) FROM Fornece
	WHERE data_pagamento < now() AND EXTRACT(MONTH FROM data_pagamento) >= EXTRACT(MONTH FROM NOW())-1 AND EXTRACT(YEAR FROM data_pagamento) = EXTRACT(YEAR FROM NOW());
	total := salariof + pagamentoforn;
	INSERT INTO folhapagamento(total_mensal, mes_ano) VALUES (total,now());
END;$$; LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_email(uuid id) RETURNS text as
BEGIN
  RETURN (SELECT au.email FROM auth.users au WHERE au.id = $1);
END;$$; LANGUAGE plpgsql;

