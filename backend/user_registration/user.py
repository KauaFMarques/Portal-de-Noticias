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
        if field not in data or not data[field]:
            return jsonify({'error': f'Campo {field} ausente ou vazio!'}), 400

    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']

    # Verificar se o endereço de e-mail tem o domínio "@gmail.com"
    if not data['email'].endswith('@gmail.com'):
        return jsonify({'error': 'O endereço de e-mail deve ser do domínio "@gmail.com"'}), 400

    # Verifica se antes do "@gmai.com" há pelo menos quatro caracteres
    if len(data['email'].split('@')[0]) < 4:
        return jsonify({'error': 'O nome de usuário no e-mail deve ter pelo menos 4 caracteres antes do "@"'}), 400

    # Valida a força da senha (exemplo básico)
    if len(data['password']) < 8:
        return jsonify({'error': 'A senha deve ter pelo menos oito caracteres'}), 400

    # Valida se o campo "name" tem pelo menos dois caracteres
    if len(data['username']) < 4:
        return jsonify({'error': 'O nome deve ter pelo menos dois caracteres'}), 400

    # Verifica se a senha fornecida e a confirmação dela estão corretas, se não, retorna erro
    if password != confirm_password:
        return jsonify({'error': 'As senhas inseridas não coincidem'}), 400

    #Verifica se a senha fornecida e a confimação dela estão corretas, se não, retorna erro
    if password != confirm_password:
        return jsonify({'error': 'As senhas inseridas não coincidem!'}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Verifica se o nome e email do usuário já existem no banco de dados, se não retorna erro
        cursor.execute("SELECT * FROM users WHERE username=%s OR email=%s", (username, email))
        if cursor.fetchone() is not None:
            return jsonify({'error': 'Nome de usuário ou email já existe!'}), 400

        # Insere o novo usuário no banco de dados
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                       (username, email, password))
        conn.commit()
    except Exception as e:
        #Em caso de erro, retorna uma resposta com erro
        return jsonify({'error': str(e)}), 500
    finally:
        #Certifique-se de fechar a conexão, independente do resultado
        if 'conn' in locals():
            conn.close()
    return jsonify({'sucess': True, 'message': 'Usuário cadastrado com sucesso!'}), 201


@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    print("Consultando banco de dados para o usuário:",
          username)  # Print antes da execução da consulta

    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Faz uma consulta no banco de dados para verificar se os dados de usuário fornecidos existem no
        # banco, esse resultado é armazenado na variável user
        cursor.execute(
            "SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()

        print("Consulta ao banco de dados concluída para o usuário:",
              username, ", senha:", password)  # Print após a execução da consulta

        # Se o usuário existir no banco de dados, define a variável de sessão logged_in
        # como True e retorna uma resposta JSON indicando o sucesso do login.
        # Caso contrário, retorna um erro
        if user:
            user_data = {
                'username': user[1],
                'email': user[2],
                'id': user[0]
            }
            session['logged_in'] = True
            respose_data = {
                'success': True,
                'message': 'Login efetuado com sucesso!',
                'user': user_data
            }
            return jsonify(respose_data)
        else:
            cursor.execute(
                "SELECT * FROM users WHERE username=%s", (username,))
            existing_user = cursor.fetchone()
            if existing_user:
                return jsonify({'error': 'Senha inválida!'}), 401
            else:
                return jsonify({'error': 'Nome de usuário inválido!'}), 401
    except Exception as e:
        # Em caso de erro, retorna uma resposta com o erro
        return jsonify({'error': 'Erro ao efetuar login!'}), 500
    finally:
        # Certifique-se de fechar a conexão, independentemente do resultado
        if 'conn' in locals():
            conn.close()

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
