import store from '@/store'
import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'

export interface LoadingState {
  loadingSelectDayWindow: boolean;
  loadingMainWindow: boolean;
}

@Module({ dynamic: true, store, name: 'Loading' })
class Loading extends VuexModule implements LoadingState {
  loadingMainWindow = false
  loadingSelectDayWindow = false
  
  @Mutation loadingMainTrue(): void {
    this.loadingMainWindow = true
  }
  @Mutation loadingMainFalse(): void {
    this.loadingMainWindow = false
  }
  
  @Mutation loadingSelectTrue(): void {
    this.loadingSelectDayWindow = true
  }

  get getLoadingMainWindow(): boolean {
    return this.loadingMainWindow
  }
  get getLoadingSelectTrue(): boolean {
    return this.loadingSelectDayWindow
  }
}
export const LoadingModule = getModule(Loading)
// export default Loading