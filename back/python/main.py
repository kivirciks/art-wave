from flask import Flask, render_template, request, redirect, send_file
import requests
from text_to_image import *
import json

app = Flask(__name__)

api = Text2ImageAPI('https://api-key.fusionbrain.ai/',
                    '0E8304C916C8A0D2A63B6D58820DB253',
                    'A4CA30389EC1BE639594E6C144523A14'
                    )


@app.route('/api/v1/models')
def get_model():
    return str(api.get_model())


@app.route('/api/v1/generate', methods=['GET', 'POST'])
def generate():
    result = json.loads(request.data)
    id_model = api.get_model()
    return str(api.generate(result['params']['generateParams']['query'], id_model, result['params']['numImages'],
                            result['params']['width'], result['params']['height']))


@app.route('/api/v1/check_generation')
def check_generation():
    return str(api.check_generation(json.loads(request.data)['uuid']))


app.run()
