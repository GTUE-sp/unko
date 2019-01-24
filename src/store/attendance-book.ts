
import {Module, VuexModule, Mutation, Action, getModule} from 'vuex-module-decorators';
import store from './index';
import { AttendanceBook, AttendanceBookEntry, Student, TimeTable} from '@/models';
import axios from 'axios';
import Vue from 'vue';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
interface GetTimetableResponse {
    id: string;
    day_of_week: string;
    timetable: string[];
}

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

       // this.attendanceBook[payload.date].students[payload.studentIndex].status[payload.subjectIndex] = payload.status;
       // Vue.set(this.attendanceBook[date].students[studentIndex], subjectIndex, status);
    }

    @Action({rawError: true})
    public async fetchAttendanceBook(date: string) {
        this.context.commit('SET_LOADING', true);
        const getStudentsResult = await axios.get('http://localhost:8000/get_students_response.json');
        const getTimetableResult = await axios.get('http://localhost:8000/get_timetable_response.json');
        await new Promise((r) => setTimeout(r, 500));
        const timetableResponse: GetTimetableResponse = getTimetableResult.data;
        const studentsResponse: GetStudentsResponse = getStudentsResult.data;
        const dailySubjectCount = timetableResponse.timetable.length;
        const students: Student[] = studentsResponse.map((x) => {
            return {
                name: x.name,
                attendance_number: x.attendance_num,
                id: x.student_id,
                status: new Array(dailySubjectCount).fill(0),
            }
        })
        const entry: AttendanceBookEntry = {
            timetable: timetableResponse.timetable,
            students,
        }
        this.context.commit('SET_ATTENDANCE_ENTRY', {date, entry});
        this.context.commit('SET_LOADING', false);
    }

    get attendanceBookEntry(): (date: string) => AttendanceBookEntry | undefined {
        return (date: string) => {
            return this.attendanceBook[date];
        };
    }
}

export const attendanceBookModule = getModule(AttendanceBookModule);
