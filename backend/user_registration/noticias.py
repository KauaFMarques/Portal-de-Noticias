import psycopg2
from flask import Blueprint, jsonify, request

# Criação do Blueprint
noticias_bp = Blueprint('noticias', __name__)

# Conexão com o banco de dados
conn = psycopg2.connect(
    dbname="portalDeNoticias",
    user="postgres",
    password="mk875",
    host="localhost",
    port='5432'
)
cur = conn.cursor()


# Rota para listar todas as notícias de um site específico
@noticias_bp.route('/sites/<int:site_id>/noticias', methods=['GET'])
def get_site_noticias(site_id):
    print("Debug: Entrando na rota /sites/<int:site_id>/noticias")
    cur.execute("SELECT * FROM Sites_noticias WHERE site_id = %s", (site_id,))
    noticias = cur.fetchall()
    print("Debug: Notícias recuperadas:")
    return jsonify(noticias)


# Rota para listar todas as notícias de uma categoria específica
@noticias_bp.route('/categorias/<int:categoria_id>/noticias', methods=['GET'])
def get_categoria_noticias(categoria_id):
    print("Debug: Entrando na rota /categorias/<int:categoria_id>/noticias")
    
    # Executar a consulta para recuperar as notícias da categoria especificada
    cur.execute("SELECT id, foto, titulo, subtitulo, noticia, categoria_id, jornalista_id FROM Sites_noticias WHERE categoria_id = %s", (categoria_id,))
    noticias = cur.fetchall()
    
    print("Debug: Notícias recuperadas:")
    print(noticias)
    
    # Transformar os resultados em um array de objetos JSON
    noticias_list = []
    for noticia in noticias:
        noticia_dict = {
            'id': noticia[0],
            'foto': noticia[1],
            'titulo': noticia[2],
            'subtitulo': noticia[3],
            'noticia': noticia[4],
            'categoria_id': noticia[5],
            'jornalista_id': noticia[6]
        }
        noticias_list.append(noticia_dict)
    
    return jsonify(noticias_list)

# Rota para listar todas as notícias de todos os sites
@noticias_bp.route('/noticias-todos-sites', methods=['GET'])
def get_todas_noticias_sites():
    print("Debug: Entrando na rota /noticias-todos-sites")

    # Executar a consulta para recuperar todas as notícias
    cur.execute(
        "SELECT id, foto, titulo, subtitulo, noticia, categoria_id, jornalista_id FROM Sites_noticias")
    todas_noticias = cur.fetchall()

    print("Debug: Todas as notícias recuperadas:")
    print(todas_noticias)

    # Transformar os resultados em um array de objetos JSON
    noticias_list = []
    for noticia in todas_noticias:
        noticia_dict = {
            'id': noticia[0],
            'foto': noticia[1],
            'titulo': noticia[2],
            'subtitulo': noticia[3],
            'noticia': noticia[4],
            'categoria_id': noticia[5],
            'jornalista_id': noticia[6]
        }
        noticias_list.append(noticia_dict)

    return jsonify(noticias_list)