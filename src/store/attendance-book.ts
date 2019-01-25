
import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators';
import store from './index';
import { AttendanceBook, AttendanceBookEntry } from '@/models/attendance-book';
import * as repository from '@/repository/attendance-book';
import Vue from 'vue';

@Module({dynamic: true, name: 'attendance-book', store})
class AttendanceBookModule extends VuexModule {
    public readonly isLoading = false;
    public readonly attendanceBook: AttendanceBook = {};
    @Mutation
    public SET_LOADING(isLoading: boolean) {
        (this.isLoading as boolean) = isLoading;
    }

    @Mutation
    public SET_ATTENDANCE_ENTRY(payload: {date: string, entry: AttendanceBookEntry}) {
        Vue.set(this.attendanceBook, payload.date, payload.entry);
    }

    @Mutation
    public SET_ATTENDANCE_STATUS(payload: {date: string, studentIndex: number,  subjectIndex: number, status: number}) {
        const {date, studentIndex, subjectIndex, status } = payload;
        this.attendanceBook[date].students[studentIndex].status.splice(subjectIndex, 1, status);
    }

    @Mutation
    public SET_REMARKS(payload: {
        date: string,
        studentIndex: number,
        remarks: string,
    }) {
        const {date, studentIndex, remarks } = payload;
        this.attendanceBook[date].students[studentIndex].remarks = remarks;
    }
    @Action({rawError: true})
    public async fetchAttendanceBookEntry(date: string) {
        this.context.commit('SET_LOADING', true);
        try {
            const entry = await repository.fetchAttendanceBookEntry(date);
            await new Promise((r) => setTimeout(r, 500)); // チラツキ防止
            this.context.commit('SET_ATTENDANCE_ENTRY', {date, entry});
            this.context.commit('SET_LOADING', false);
        } catch (error) {
            this.context.commit('SET_LOADING', false);
        }
    }

    @Action({rawError: true})
    public async submitAttendanceBookEntry(date: string) {
        this.context.commit('SET_LOADING', true);
        const entry = this.attendanceBook[date];
        if (entry !== undefined) {
            await repository.postAttendanceBookEntry(date, entry);
        }
        await new Promise((r) => setTimeout(r, 500)); // チラツキ防止
        this.context.commit('SET_LOADING', false);
    }    
}

export const attendanceBookModule = getModule(AttendanceBookModule);
