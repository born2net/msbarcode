import { MsbarcodePage } from './app.po';

describe('msbarcode App', function() {
  let page: MsbarcodePage;

  beforeEach(() => {
    page = new MsbarcodePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
