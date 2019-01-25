import {  AttendanceBookEntry, Student} from '@/models/attendance-book';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
interface GetTimetableResponse {
    id: string;
    day_of_week: string;
    timetable: string[];
}

export async function fetchAttendanceBookEntry(date: string) {
    const getStudentsResult = await axios.get('http://localhost:8000/get_students_response.json');
    const getTimetableResult = await axios.get('http://localhost:8000/get_timetable_response.json');
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
// TODO:
export async function postAttendanceBookEntry(date: string, entry: AttendanceBookEntry) {
    for (const student of entry.students) {
        const formData = new FormData();
        formData.append('student_id', student.id);
        formData.append('absent_day', date);
        student.status.forEach((status, index) => {
            formData.append(`class${index}`, status.toString());
        });
        formData.append('remarks', student.remarks);
        /*await axios.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });*/
    }
    await new Promise((r) => setTimeout(r, 500));
}