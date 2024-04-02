from flask import Flask

app = Flask(__name__)

@app.route('/noticias/politica')
def politica():
    noticias_politica = Noticia.query.filter_by(tipo='politica').all()
    return render_template('noticias.html', noticias=noticias_politica)

@app.route('/noticias/esportes')
def esportes():
    noticias_esportes = Noticia.query.filter_by(tipo='politica').all()
    return render_template('noticias.html', noticias=noticias_esportes)

@app.route('/noticias/arte')
def entretenimento():
    noticias_arte = Noticia.query.filter_by(tipo='arte').all()
    return render_template('noticias.html', noticias=noticias_arte)


if __name__ == '__main__':
    app.run(debug=True)

