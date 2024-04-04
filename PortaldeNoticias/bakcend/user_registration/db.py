import psycopg2

# Função para conectar ao banco de dados PostgreSQL


def connect_db():
    conn = psycopg2.connect(
        dbname="nome_do_seu_banco_de_dados",
        user="seu_usuario",
        password="sua_senha",
        host="localhost"
    )
    return conn
