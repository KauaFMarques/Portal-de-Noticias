import psycopg2

def conectar_bd():
    conn = psycopg2.connect(
        dbname='portalDeNoticias',
        user='postgres',
        password='mk785',
        host='localhost',
        port='5432'
    )
    return conn
