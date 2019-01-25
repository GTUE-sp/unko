
import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators';
import store from './index';
import { Student } from '@/models/cutting-class';
import * as repository from '@/repository/cutting-class';
import Vue from 'vue';

@Module({dynamic: true, name: 'cutting-class', store})
class CuttingClassModule extends VuexModule {
    public readonly isLoading = false;
    public readonly students: Student[] = [];
    @Mutation
    public SET_LOADING(isLoading: boolean) {
        (this.isLoading as boolean) = isLoading;
    }

    @Mutation
    public SET_STUDENTS(students: Student[]) {
        (this.students as Student[]) = students;
    }

    @Action({rawError: true})
    public async fetchAttendanceBookEntry(start: string, end: string) {
        console.log("store.");
        console.log(start);
        console.log(end);
        this.context.commit('SET_LOADING', true);
        try {
            var kuso = start.split(" ");
            const result = await repository.fetchCuttingClassCount(kuso[0], kuso[1]);
            await new Promise((r) => setTimeout(r, 500)); // チラツキ防止
            this.context.commit('SET_STUDENTS', result);
            this.context.commit('SET_LOADING', false);
        } catch (error) {
            console.log("error")
            this.context.commit('SET_LOADING', false);
        }
    }
}

export const cuttingClassModule = getModule(CuttingClassModule);
