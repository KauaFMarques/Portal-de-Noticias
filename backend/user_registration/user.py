from flask import Flask, request, jsonify, Blueprint, session
import psycopg2, jwt
from functools import wraps
import time
import bcrypt

#Cria um blueprint chamado 'user_bp' para organizar as rotas relacionadas ao módulo de usuários.
user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/',methods=['GET'])
def teste():
    print("Hello world")
    return "hello"

# Função para conectar ao banco de dados PostgreSQL
def connect_db():
    conn = psycopg2.connect(
        dbname="portalDeNoticias",
        user="postgres",
        password="mk875",
        host="localhost",
        port='5432'
    )
    return conn


# Carregar a chave pública
try:
    with open('public_key.pem', 'r') as f:
        public_key = f.read()
except FileNotFoundError:
    print("Arquivo public_key.pem não encontrado.")
except Exception as e:
    print("Erro ao ler o arquivo public_key.pem:", e)


#função para criar token
def generate_token(username, email, private_key, expiration_time=20):
    payload_data ={
        'username': username,
        'email': email,
        'exp': int(time.time()) + expiration_time
    }
    token = jwt.encode(
        payload=payload_data,
        key=private_key,
        algorithm='RS256',
    )
    return token


# Carregar a chave privada
with open('private_key.pem', 'r') as f:
    private_key = f.read()
def generate_token(payload_data):
    # Gerar o token JWT assinado com a chave privada
    token = jwt.encode(
        payload=payload_data,
        key=private_key,
        algorithm='RS256',
    )
    
    return token
    

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
    if("site" in data):
        site=data['site']

    if password != confirm_password:
        return jsonify({'error': 'As senhas inseridas não coincidem!'}), 400

    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Verifica se o nome e email do usuário já existem no banco de dados, se não retorna erro
        cursor.execute("SELECT * FROM users WHERE username=%s OR email=%s", (username, email))
        if cursor.fetchone() is not None:
            return jsonify({'error': 'Nome de usuário ou email já existe!'}), 400


        #criptografia antes de inserção no banco de dados
        hashed_password = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        
        #criação do token
        token=generate_token(data)

        if("site" in data):
            # Insere o novo usuário no banco de dados
            cursor.execute("INSERT INTO users (username, email, password, token, site) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                        (username, email, hashed_password.decode('utf-8'), token, site))
            
        else:
            # Insere o novo usuário no banco de dados
            cursor.execute("INSERT INTO users (username, email, password, token) VALUES (%s, %s, %s, %s) RETURNING *",
                        (username, email, hashed_password.decode('utf-8'), token))
        
        new_user = cursor.fetchone()
        conn.commit()

        """if new_user:
            user_data = {
                'id': new_user[0],
                'username': new_user[1],
                'email': new_user[2],
                'token': new_user[3]
            }
            
        else:
            return jsonify({'error': 'Erro ao obter dados do usuário após o cadastro!'}), 500"""

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()
    return jsonify({'sucess': True, 'message': 'Usuário cadastrado com sucesso!'}), 201


# Rota para login de usuário
@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Faz uma consulta no banco de dados para verificar se os dados de usuário fornecidos existem no 
        # banco, esse resultado é armazenado na variável user
        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        user = cursor.fetchone()

        # Se o usuário existir no banco de dados, verifica se a senha fornecida corresponde à senha armazenada
        if user:
            hashed_password = user[3]  # Senha criptografada armazenada no banco de dados
            huj=hashed_password
            #print("huj:", huj)
            
            """print("Hashed Password decodificado):", hashed_password.encode())
            print("senha do usuario:", password)
            print("tipo de dados:")
            print(type(password.encode()))
            print(type(hashed_password.encode()))"""
            """print("------")
            hash = bytes.fromhex(hashed_password)
            print(hash) # $2b$12$GBx96IiULJ9Ja3BfSfFwseai8To20fr.xqdhHRv6qegu7hzCYeByu
            verified = bcrypt.checkpw('senha7894'.encode('utf-8'), hash)
            print(verified) # True"""
            #print((bytes.fromhex(hashed_password).decode))
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                user_data = {
                    'token':user[4],
                    'username': user[1],
                    'email': user[2],
                    'id': user[0]
                }
                session['logged_in'] = True
                response_data = {
                    'success': True,
                    'message': 'Login efetuado com sucesso!',
                    'user': user_data
                }
                return jsonify(response_data)
            else:
                return jsonify({'error': 'Senha inválida!'}), 401
        else:
            return jsonify({'error': 'Nome de usuário inválido!'}), 401
    except Exception as e:
        # Em caso de erro, retorna uma resposta de erro
        return jsonify({'error': str(e)}), 500
    finally:
        # Certifica-se de fechar a conexão, independentemente do resultado
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
    

