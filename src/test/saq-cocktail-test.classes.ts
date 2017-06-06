import { Config } from '../cfg/config';

const defaultImage = Config.INGREDIENT_PHOTOS_PATH + 'mint_leaves.jpg';

export class SaqAlcoholResult {
  title = '';
  raw = {
    tpthumbnailuri: '',
    tpformat: '',
    tpprixnormal: '',
    tpprixnum: 0
  };

  constructor(title = 'alcohol 1', format = '750 ml', prix = 100, imageUrl = defaultImage) {
    this.title = title;
    this.raw.tpformat = format;
    this.raw.tpprixnormal = prix.toString();
    this.raw.tpprixnum = prix;
    this.raw.tpthumbnailuri = imageUrl;
  }
}
