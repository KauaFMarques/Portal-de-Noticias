import datetime
import jwt
import json 
import datetime

# Chave Fixa
secret_key = '52d3f853c19f8b63c0918c126422aa2d99b1aef33ec63d41dea4fadf19406e54'

def create_jwt(payload):
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token

def verify_and_decode_jwt(jwt_token):
    try:
        payload = jwt.decode(jwt_token, secret_key, algorithms=['HS256'])
        # Verifica a expiração do token
        if payload.get('exp'):
            unix_time_now = datetime.datetime.now().timestamp()
            if payload['exp'] < unix_time_now:
                return 'Token expirado', 401
        return 'OK'
    except jwt.ExpiredSignatureError:
        return 'Token expirado', 401
    except jwt.InvalidTokenError:
        return 'Token inválido', 401

def iniciandoJWT():
    payload = {
        'userId': '55395427-265a-4166-ac93-da6879edb57a',
        'exp': datetime.datetime.now() + datetime.timedelta(minutes=1),
    }
    jwt_created = create_jwt(payload)
    return jwt_created

def test_create_and_verify_jwt():
    # Criação do token JWT
    payload = {
        'userId': '55395427-265a-4166-ac93-da6879edb57a',
        'exp': (datetime.datetime.now() + datetime.timedelta(minutes=60)).timestamp(),
    }
    jwt_created = create_jwt(payload)
    print("Token gerado:", jwt_created)

    # Verificação do token JWT
    verification_result = verify_and_decode_jwt(jwt_created)
    if verification_result == 'OK':
        print("Token válido")
    else:
        print("Token inválido:", verification_result)

# Execute os testes
if __name__ == "__main__":
    test_create_and_verify_jwt()