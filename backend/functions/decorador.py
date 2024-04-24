from auth import validate_token
from functools import wraps
from flask import jsonify


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')  # Obtém o token do cabeçalho Authorization

        if not token:
            return jsonify({'error': 'Token necessário'}), 401  # Se não houver token, retorna 401 Unauthorized

        decoded_token = validate_token(token)  # Valida o token usando a função validate_token

        if isinstance(decoded_token, dict) and 'error' in decoded_token:
            return decoded_token  # Se houver um erro na validação do token, retorna o erro

        # Adicione o token decodificado aos argumentos da função
        kwargs['decoded_token'] = decoded_token

        return f(*args, **kwargs)

    return decorated_function