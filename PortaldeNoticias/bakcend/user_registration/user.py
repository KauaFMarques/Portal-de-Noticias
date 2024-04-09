from flask import Flask, request, jsonify, Blueprint, session
import psycopg2

#Cria um blueprint chamado 'user_bp' para organizar as rotas relacionadas ao módulo de usuários.
user_bp = Blueprint('user_bp', __name__)

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
@user_bp.route('/register', methods=['POST'])
def register_user():
    #Extrai os dados json da solicitação HTTp usando o método get_json() do objeto request
    data = request.get_json()
    #Aqui verifica se todos os campos obrigatorios estão preenchidos, se não retorna o erro
    required_fields = ['username', 'email', 'password', 'confirm_password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field}'}), 400

    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    #Verifica se a senha fornecida e a confimação dela estão corretas, se não, retorna erro
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    conn = connect_db()
    cursor = conn.cursor()

    # Verifica se o nome e email do usuário já existem no banco de dados, se não retorna erro
    cursor.execute("SELECT * FROM users WHERE username=%s OR email=%s", (username, email))
    if cursor.fetchone() is not None:
        return jsonify({'error': 'Username or email already exists'}), 400

    # Insere o novo usuário no banco de dados
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                   (username, email, password))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

# Rota para login de usuario
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = connect_db()
    cursor = conn.cursor()

    #Faz uma consulta no banco de dados para verificar se os dados de usuario fornecidos existem no 
    # banco, esse resultado é armazenado na variavel user
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()

    conn.close()

    # Se o usuário existir no banco de dados, define a variável de sessão logged_in 
    # como True e retorna uma resposta JSON indicando o sucesso do login. 
    # Caso contrário, retorna um erro 
    if user:
        session['logged_in'] = True
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Rota para logout de usuario
@user_bp.route('/logout', methods=['POST'])
def logout():
    # Remove a variavel, se existir
    session.pop('logged_in', None)
    return jsonify({'success': True, 'message': 'Logout successful'})

# Rota para exibir o perfil do usuario 
@user_bp.route('/profile', methods=['GET'])
def profile():
    # Verifica se o usuário está autenticado verificando se a variável de sessão logged_in está definida como True. 
    # Se estiver autenticado, retorna uma resposta JSON com os detalhes do perfil do usuário. 
    # Caso contrário, retorna um erro
    if session.get('logged_in'):
        return jsonify({'success': True, 'message': 'User profile retrieved'})
    else:
        return jsonify({'error': 'Unauthorized access'}), 401
