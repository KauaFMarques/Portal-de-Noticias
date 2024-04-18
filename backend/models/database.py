import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname='portalDeNoticias',
        user='postgres',
        password='mk875',
        host='localhost',
        port='5432'
    )
