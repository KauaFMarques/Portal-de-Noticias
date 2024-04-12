from flask import Blueprint, jsonify
from models.database import get_connection

noticias_bp = Blueprint('noticias', __name__)

@noticias_bp.route('/noticias/<categoria>')
def noticias(categoria):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM noticias WHERE categoria = %s", (categoria,))
    noticias = cursor.fetchall()
    cursor.close()
    conn.close()
    # Retorna um JSON com as notícias
    return jsonify(noticias)
