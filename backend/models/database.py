import psycopg2
from flask_bcrypt import Bcrypt

def get_connection():
    return psycopg2.connect(
        dbname='portalDeNoticias',
        user='postgres',
        password='mk875',
        host='localhost',
        port='5432'
    )
    
def get_user_password(username):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password FROM users WHERE username = %s", (username,))
    password = cur.fetchone()
    conn.close()
    if password:
        return password[0]  # Retorna a senha do usuário
    return None

def verify_password(username, input_password):
    hashed_password = get_user_password(username)
    if hashed_password:
        bcrypt = Bcrypt()
        return bcrypt.check_password_hash(hashed_password, input_password)
    return False