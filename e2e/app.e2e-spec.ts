import { SaqCocktailsPage } from './app.po';

describe('saq-cocktails App', function() {
  let page: SaqCocktailsPage;

  beforeEach(() => {
    page = new SaqCocktailsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
