import { ElapserPage } from './app.po';

describe('elapser App', () => {
  let page: ElapserPage;

  beforeEach(() => {
    page = new ElapserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
