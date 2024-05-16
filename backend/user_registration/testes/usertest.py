import unittest
import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))  # Adiciona o diretório pai ao caminho de pesquisa de módulos
from user import *
from app import app 


class TestApp(unittest.TestCase):

        
    # Carregar a chave pública
    try:
        with open('public_key.pem', 'r') as f:
            public_key = f.read()
    except FileNotFoundError:
        print("Arquivo public_key.pem não encontrado.")
    except Exception as e:
        print("Erro ao ler o arquivo public_key.pem:", e)

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
    
    # Configuração inicial para cada teste
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    # Teste para a rota '/'
    def test_hello_world(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode(), 'hello')

    # Teste para a rota de cadastro de usuário
    def test_register_user(self):
        # Dados de exemplo para o teste
        user_data = {
            'username': 'test_user1',
            'email': 'test1@example.com',
            'password': 'password',
            'confirm_password': 'password'
        }
        response = self.app.post('/register', json=user_data)
        self.assertEqual(response.status_code, 201)
        # Você pode adicionar mais verificações aqui, como verificar se o usuário foi realmente inserido no banco de dados

    # Teste para a rota de login de usuário
    def test_login(self):
        # Dados de exemplo para o teste
        login_data = {
            'username': 'test_user',
            'password': 'password'
        }
        response = self.app.post('/login', json=login_data)
        self.assertEqual(response.status_code, 200)
        # Você pode adicionar mais verificações aqui, como verificar se o token de autenticação foi retornado

    # Teste para a rota de logout de usuário
    def test_logout(self):
        response = self.app.post('/logout')
        self.assertEqual(response.status_code, 200)
        # Você pode adicionar mais verificações aqui, se desejar

    # Teste para a rota de perfil de usuário
    def test_profile(self):
        response = self.app.get('/profile')
        self.assertEqual(response.status_code, 401)
        # Este teste deve falhar, pois você não está autenticado

if __name__ == '__main__':
    unittest.main()
