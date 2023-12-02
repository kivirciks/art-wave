import base64
import json

from flask import Flask, request

from back.python.SubPixelCNN.resolution import super_resolve
from back.python.text_to_image import *

# sys.path.append(os.path.join(os.path.dirname(__file__), '../'))


app = Flask(__name__)

api = Text2ImageAPI('https://api-key.fusionbrain.ai/',
                    '0E8304C916C8A0D2A63B6D58820DB253',
                    'A4CA30389EC1BE639594E6C144523A14')


def write(image):
    decodedData = base64.b64decode(image)

    # Write Image from Base64 File
    imgFile = open('image.png', 'wb')
    imgFile.write(decodedData)
    imgFile.close()


@app.route('/api/v1/models')
def get_model():
    return str(api.get_model())


@app.route('/api/v1/generate', methods=['POST'])
def generate():
    result = json.loads(request.data)
    id_model = api.get_model()
    return str(api.generate(
        result['params']['generateParams']['query'], id_model,
        result['params']['negativePromptUnclip'],
        result['params']['numImages'],
        result['params']['width'],
        result['params']['height']
    )
    )


@app.route('/api/v1/check_generation', methods=['POST'])
def check_generation():
    return str(api.check_generation(json.loads(request.data)['uuid']))


@app.route('/api/v1/super_resolution')
def super_resolution():
    image = json.loads(request.data)['image']
    write(image)
    resolution = int(json.loads(request.data)['resolution'])
    output_image = f'art_{resolution}.png'
    path = 'image.png'
    super_resolve(path, output_image)
    with open(output_image, 'rb') as image_file:
        encoded_string = base64.b64encode(image_file.read())
        response = {
            'image': str(encoded_string).split("'")[1]
        }
        return json.dumps(response)


@app.route('/api/v1/styles')
def styles():
    return get_styles()


app.run()
