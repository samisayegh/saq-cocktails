export class SaqAlcoholResult {
  title = '';
  raw = {
    tpthumbnailuri: '',
    tpformat: '',
    tpprixnormal: ''
  };

  constructor(title: string, format: string, prix: string, imageUrl: string) {
    this.title = title;
    this.raw.tpformat = format;
    this.raw.tpprixnormal = prix;
    this.raw.tpthumbnailuri = imageUrl;
  }
}
