/*
 *  AttendanceLogs model
 */

export interface IAttendancetLogs {
    id?: number,
    academicTermId?: number,
    attendanceTypeId?: number,
    courseId?: number,
    date?: Date,
    latitude?: number,
    longitude?: number,
    lecturesLogId?: number,
    studentId?: number,
    timestamp?: number
}