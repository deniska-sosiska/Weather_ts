import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module
class Loading extends VuexModule {
  loadingMainWindow = false
  @Mutation loadingMainTrue(): void {
    this.loadingMainWindow = true
  }
  get getLoadingMainWindow(): boolean {
    return this.loadingMainWindow
  }
  
  loadingSelectDayWindow = false
  @Mutation loadingSelectTrue(): void {
    this.loadingSelectDayWindow = true
  }
  get getLoadingSelectTrue(): boolean {
    return this.loadingSelectDayWindow
  }
}
export default Loading