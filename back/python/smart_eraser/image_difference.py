import cv2
import numpy as np

color_img = cv2.imread('./test_data/test_images/sea.jpg')
mask_img = cv2.imread('./test_data/u2net_results/sea.png', cv2.IMREAD_GRAYSCALE)

_, mask = cv2.threshold(mask_img, 1, 255, cv2.THRESH_BINARY)

# applying the bitwise NOT operator to a mask
inverse_mask = cv2.bitwise_not(mask)
# creating an alpha channel from an inverse mask
alpha_channel = np.zeros_like(mask)
alpha_channel[inverse_mask != 0] = 255
# combining a color image and an alpha channel
result = cv2.merge((color_img, alpha_channel))

cv2.imwrite('result_image.png', result)
