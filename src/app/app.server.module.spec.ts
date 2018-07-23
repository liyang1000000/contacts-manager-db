import { AppServerModule } from './app.server.module'

describe('App.ServerModule', () => {
  let appServerModule: AppServerModule

  beforeEach(() => {
    appServerModule = new AppServerModule()
  })

  it('should create an instance', () => {
    expect(appServerModule).toBeTruthy()
  })
})
