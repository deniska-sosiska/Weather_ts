import store from '@/store'
import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import { LoadingState } from '@/definitions/interfaces'


@Module({ dynamic: true, store, name: 'Loading' })
class Loading extends VuexModule implements LoadingState {
  // State
  loadingMainWindow = false
  loadingSelectDayWindow = false
  
  // Mutations
  @Mutation loadingMainTrue(): void {
    this.loadingMainWindow = true
  }

  @Mutation loadingSelectTrue(): void {
    this.loadingSelectDayWindow = true
  }
}
export const LoadingModule = getModule(Loading)