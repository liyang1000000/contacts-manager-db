import { AppPage } from './app.po';
/* Path: e2e/test.e2e-spec.ts */
 
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display correct list title', () => {
    page.navigateTo();
    expect(element.all(by.tagName('h2')).first().getText()).toEqual('Contacts List');
  });
});
