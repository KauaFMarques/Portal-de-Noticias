from flask import jsonify
from schema.db import conectar_bd

def configure_routes(app):
    @app.route('/noticias/<categoria>')
    def noticias(categoria):
        conn=conectar_bd()
        cursor = conn.cursor()
        if categoria=="arte":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'arte'")
        elif categoria=="negocios":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'negocios'")
        elif categoria=="saude":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'saude'")
        elif categoria=="politica":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'politica'")
        elif categoria=="ciencia":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'ciencia'")
        elif categoria=="esportes":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'esportes'")
        elif categoria=="tecnologia":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'tecnologia'")
        elif categoria=="mundo":
            cursor.execute("SELECT * FROM noticias WHERE categoria = 'mundo'")
            
        noticias = cursor.fetchall()
        cursor.close()

        # Renderiza um template HTML ou retorna um JSON com as notícias
        return jsonify(noticias)
