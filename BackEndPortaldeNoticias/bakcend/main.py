from flask import Flask
from flask import jsonify
import psycopg2

app = Flask(__name__)

conn = psycopg2.connect(
        dbname='portalDeNoticias',
        user='postgres',
        password='mk875',
        host='localhost',
        port='5432'
    )

@app.route('/noticias/<categoria>')
def noticias(categoria):
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
        
#Arte Negócios Saúde Politica Ciência Esportes Tecnologia Mundo


if __name__=="__main__":
    app.app_context().push()
    app.run(debug=True)