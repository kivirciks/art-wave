import numpy as np
import torch
import torch.backends.cudnn as cudnn
from PIL import Image
from torchvision.transforms import ToTensor

# import sys

# sys.path.append(os.path.join(os.path.dirname(__file__), '../../'))
model_path = 'SUB_model_path.pth'


def super_resolve(input_image, output_image='art.png'):
    # Input image setting
    img = Image.open(input_image).convert('YCbCr')
    y, cb, cr = img.split()

    # Model import and setting
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = torch.load(model_path)  # , map_location=device)
    model = model.to(device)
    data = (ToTensor()(y)).view(1, -1, y.size[1], y.size[0])
    data = data.to(device)

    if torch.cuda.is_available():
        cudnn.benchmark = True

    # Output and save image
    out = model(data)
    out = out.cpu()
    out_img_y = out.data[0].numpy()
    out_img_y *= 255.0
    out_img_y = out_img_y.clip(0, 255)
    out_img_y = Image.fromarray(np.uint8(out_img_y[0]), mode='L')

    out_img_cb = cb.resize(out_img_y.size, Image.BICUBIC)
    out_img_cr = cr.resize(out_img_y.size, Image.BICUBIC)
    out_img = Image.merge('YCbCr', [out_img_y, out_img_cb, out_img_cr]).convert('RGB')

    out_img.save(output_image)


'''
import sys

if __name__ == '__main__':
    args = sys.argv[1:]
    if len(args) < 2:
        sys.exit(1)

    input_image = 'back/python/image.png'
    model_path = 'SUB_model_path.pth'

    resolutions = [4, 16, 64]

    for resolution in resolutions:
        output_image = f'art_{resolution}.png'
        super_resolve(input_image, output_image)
        input_image = output_image
'''
