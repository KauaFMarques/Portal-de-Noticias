import psycopg2

# Função para conectar ao banco de dados PostgreSQL


def connect_db():
    conn = psycopg2.connect(
        dbname="portalDeNoticias",
        user="postgres",
        password="mk785",
        host="localhost",
        port='5432'
    )
    return conn
