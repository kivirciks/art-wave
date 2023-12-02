import os
from torch.autograd import Variable
from torch.utils.data import DataLoader
from torchvision import transforms
import warnings
from PIL import Image
import glob
from data_loader import *
from model import U2NET
warnings.filterwarnings("ignore", category=UserWarning)


# normalize the predicted SOD probability map
def norm_predict(d):
    ma = torch.max(d)
    mi = torch.min(d)
    dn = (d-mi)/(ma-mi)
    return dn


def save_output(image_name, pred, d_dir):
    predict = pred
    predict = predict.squeeze()
    predict_np = predict.cpu().data.numpy()
    im = Image.fromarray(predict_np * 255).convert('RGB')
    img_name = image_name.split(os.sep)[-1]
    image = io.imread(image_name)
    imo = im.resize((image.shape[1], image.shape[0]), resample=Image.BILINEAR)
    pb_np = np.array(imo)
    aaa = img_name.split(".")
    bbb = aaa[0:-1]
    index = bbb[0]
    for i in range(1, len(bbb)):
        index = index + "." + bbb[i]
    imo.save(d_dir + index + '.png')


def main():
    # get image path and name
    model_name = 'u2net'
    image_dir = os.path.join(os.getcwd(), 'test_data', 'test_images')
    prediction_dir = os.path.join(os.getcwd(), 'test_data', model_name + '_results' + os.sep)
    model_dir = os.path.join(os.getcwd(), 'saved_models', model_name, model_name + '.pth')
    img_name_list = glob.glob(image_dir + os.sep + '*')
    print(img_name_list)
    # dataloader
    test_salobj_dataset = SalObjDataset(img_name_list=img_name_list,
                                        lbl_name_list=[],
                                        transform=transforms.Compose([RescaleT(320),
                                                                      ToTensorLab(flag=0)])
                                        )
    test_salobj_dataloader = DataLoader(test_salobj_dataset,
                                        batch_size=1,
                                        shuffle=False,
                                        num_workers=1)

    # model define
    net = U2NET(3, 1)
    if torch.cuda.is_available():
        net.load_state_dict(torch.load(model_dir))
        net.cuda()
    else:
        net.load_state_dict(torch.load(model_dir, map_location='cpu'))
    net.eval()

    # inference for each image
    for i_test, data_test in enumerate(test_salobj_dataloader):
        print("inference:", img_name_list[i_test].split(os.sep)[-1])
        inputs_test = data_test['image']
        inputs_test = inputs_test.type(torch.FloatTensor)
        if torch.cuda.is_available():
            inputs_test = Variable(inputs_test.cuda())
        else:
            inputs_test = Variable(inputs_test)
        d1, d2, d3, d4, d5, d6, d7 = net(inputs_test)
        # normalization
        pre = d1[:, 0, :, :]
        pre = norm_predict(pre)
        # save results to test_results folder
        if not os.path.exists(prediction_dir):
            os.makedirs(prediction_dir, exist_ok = True)
        save_output(img_name_list[i_test],pre,prediction_dir)
        del d1, d2, d3, d4, d5, d6, d7


if __name__ == "__main__":
    main()
