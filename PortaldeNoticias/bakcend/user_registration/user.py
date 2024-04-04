from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Função para conectar ao banco de dados PostgreSQL


def connect_db():
    conn = psycopg2.connect(
        dbname="portalNoticia",
        user="postgres",
        password="06012002",
        host="localhost"
    )
    return conn

# Rota para cadastro de usuário


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    required_fields = ['username', 'email',
                       'password', 'confirm_password', 'user_type']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400

    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    user_type = data['user_type']

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    conn = connect_db()
    cursor = conn.cursor()

    # Verifica se o usuário já existe no banco de dados
    cursor.execute(
        "SELECT * FROM users WHERE username=%s OR email=%s", (username, email))
    if cursor.fetchone() is not None:
        return jsonify({'error': 'Username or email already exists'}), 400

    # Insere o novo usuário no banco de dados
    cursor.execute("INSERT INTO users (username, email, password, user_type) VALUES (%s, %s, %s, %s)",
                   (username, email, password, user_type))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': 'User registered successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)
