
import {Module, VuexModule, Mutation, Action} from 'vuex-module-decorators';

@Module({namespaced: true})
class AttendanceBookModule extends VuexModule {
    isLoading = false;

    @Mutation
    public setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    @Action({commit: 'setLoading'})
    public fetchAttendanceBook() {
        this.context.commit("")

        this.setLoading(true)
    }
}