import psycopg2
from flask import Blueprint, jsonify, request

# Criação do Blueprint
noticias_bp = Blueprint('noticias', __name__)

# Conexão com o banco de dados
conn = psycopg2.connect(
    dbname="portalNoticia",
    user="postgres",
    password="06012002",
    host="localhost"
)
cur = conn.cursor()


# Rota para listar todas as notícias de um site específico
@noticias_bp.route('/sites/<int:site_id>', methods=['GET'])
def get_site_noticias(site_id):
    print("Debug: Entrando na rota /sites/<int:site_id>/noticias")
    cur.execute("SELECT * FROM Sites_noticias WHERE site_id = %s", (site_id,))
    noticias = cur.fetchall()
    print("Debug: Notícias recuperadas:")
    return jsonify(noticias)


# Rota para listar todas as notícias de uma categoria específica
@noticias_bp.route('/categorias/<int:categoria_id>', methods=['GET'])
def get_categoria_noticias(categoria_id):
    print("Debug: Entrando na rota /categorias/<int:categoria_id>/noticias")
    cur.execute(
        "SELECT * FROM Sites_noticias WHERE categoria_id = %s", (categoria_id,))
    noticias = cur.fetchall()
    print("Debug: Notícias recuperadas:")
    return jsonify(noticias)
