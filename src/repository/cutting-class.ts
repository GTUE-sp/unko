import { Student} from '@/models/cutting-class';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
type GetCuttingClassResponse = number[];

export async function fetchCuttingClassCount(start: string, end: string) {
    const getStudentsResult = await axios.get('http://192.168.11.2:8000/get_students_response.json');
    //const getCuttingClassResult = await axios.get('http://192.168.11.2:8000/get_timetable_response.json');
    //const timetableResponse: GetCuttingClassResponse = getCuttingClassResult.data;
    const studentsResponse: GetStudentsResponse = getStudentsResult.data;

    //const late
    const students: Student[] = studentsResponse.map((x) => {
        return {
            name: x.name,
            attendance_number: x.attendance_num,
            id: x.student_id,
            cutting_class_count: 0,
            absent_class_count: 0,
            late_class_count: 0,
        }
    })
    return students;
}