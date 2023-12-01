import base64

from flask import Flask, request
from back.python.model.resolution import super_resolve
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


@app.route('/api/v1/check_generation')
def check_generation():
    return str(api.check_generation(json.loads(request.data)['uuid']))


@app.route('/api/v1/super_resolution')
def super_resolution():
    image = json.loads(request.data)['image']
    write(image)
    resolution = json.loads(request.data)['resolution']
    output_image = f'art_{resolution}.png'

    super_resolve('image.png', output_image)


app.run()
