export class SaqAlcoholResult {
  title = '';
  raw = {
    tpthumbnailuri: 'C:/Users/Salem Sayegh/Documents/GitHub/saq-cocktails/src/assets/ingredient-photos/no_image',
    tpformat: '',
    tpprixnormal: ''
  };

  constructor(title: string, format: string, prix: string) {
    this.title = title;
    this.raw.tpformat = format;
    this.raw.tpprixnormal = prix;
  }
}
