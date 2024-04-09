import psycopg2

# Função para conectar ao banco de dados PostgreSQL


def connect_db():
    conn = psycopg2.connect(
        dbname="portalNoticia",
        user="postgres",
        password="06012002",
        host="localhost"
    )
    return conn
