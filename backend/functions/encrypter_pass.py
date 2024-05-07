from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

# hashear uma senha

hashed_password = bcrypt.generate_password_hash('senha123').decode('utf-8')
print(hashed_password)

# Verificação de senha
check = bcrypt.check_password_hash(hashed_password, 'senha123')
print(check)  # Isso deve imprimir True

check = bcrypt.check_password_hash(hashed_password, 'senha123')
print(check)  # Isso deve imprimir False
