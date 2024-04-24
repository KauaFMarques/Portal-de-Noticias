import secrets

# Gera uma chave secreta de 32 bytes (256 bits)
secret_key = secrets.token_hex(32)
print("Chave Secreta:", secret_key)