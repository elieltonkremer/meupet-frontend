from bottle import Bottle, static_file, run

# https://pip.pypa.io/en/stable/installing/
# pip install bottle
# python servidor.py

app = Bottle()


@app.get('/static/<path:path>')
def get(path):
    response = static_file(path, 'src')
    response.set_header('Cache-Control', 'no-cache, no-store, must-revalidate')
    return response

@app.get('/<path:path>')
@app.get('/')
def get(path = 'index.html'):
    return static_file('index.html', 'src')




run(app)
