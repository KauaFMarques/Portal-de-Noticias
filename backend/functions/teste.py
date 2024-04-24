# Importe as funções do arquivo auth.py
from auth import  generate_token,validate_token

# Teste da função generate_token
def test_generate_token():
    username = 'exemplo'
    token = generate_token(username)
    print("Token gerado:", token)

# Teste da função validate_token
def test_validate_token():
    token = 'token_jwt_aqui'
    username = validate_token(token)
    if username:
        print("Token válido. Nome de usuário:", username)
    else:
        print("Token inválido ou expirado.")

# Execute os testes
if __name__ == "__main__":
    test_generate_token()
    test_validate_token()
