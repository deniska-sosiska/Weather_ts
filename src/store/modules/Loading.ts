import store from '@/store'
import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { LoadingState } from '@/definitions/interfaces'


@Module({ dynamic: true, store, name: 'Loading' })
class Loading extends VuexModule implements LoadingState {
  loadingMainWindow = false
  loadingSelectDayWindow = false
  
  @Mutation loadingMainTrue(): void {
    this.loadingMainWindow = true
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