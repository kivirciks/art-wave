export function encodeImageToBase64(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      reject(new Error('Invalid file. Please provide an image file.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      console.log(result);
      resolve(result.split(',')[1]);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(imageFile);
  });
}
