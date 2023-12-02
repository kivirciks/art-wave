import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://api-key.fusionbrain.ai/key/api/v1/text2image/run',
  headers: {
    'X-Key': 'Key 0E8304C916C8A0D2A63B6D58820DB253',
    'X-Secret': 'Secret A4CA30389EC1BE639594E6C144523A14',
  },
});
