import { AttendanceBook, AttendanceBookEntry, Student, TimeTable} from '@/models';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
interface GetTimetableResponse {
    id: string;
    day_of_week: string;
    timetable: string[];
}

export async function fetchAttendanceBook(date: string) {
    const getStudentsResult = await axios.get('http://192.168.11.2:8000/get_students_response.json');
    const getTimetableResult = await axios.get('http://192.168.11.2:8000/get_timetable_response.json');
    const timetableResponse: GetTimetableResponse = getTimetableResult.data;
    const studentsResponse: GetStudentsResponse = getStudentsResult.data;
    const dailySubjectCount = timetableResponse.timetable.length;
    const students: Student[] = studentsResponse.map((x) => {
        return {
            name: x.name,
            attendance_number: x.attendance_num,
            id: x.student_id,
            status: new Array(dailySubjectCount).fill(0),
            remarks: '',
        }
    })
    const entry: AttendanceBookEntry = {
        timetable: timetableResponse.timetable,
        students,
    };
    return entry;

}