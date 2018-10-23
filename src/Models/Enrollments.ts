/*
 *  Enrollments model
 */

export interface IEnrollment {
    id?: number,
    startDate?: Date,
    endDate?: Date,
    studentId?: number,
    firstName?: string,
    lastName?: string,
    courseId?: number,
    courseName?: string,
    isActive?: boolean,
    logs?: ILog[]
 }

 export interface ILog {
    id?: number,
    studentId?: number,
    courseId?: number,
    academicTermId?: number,
    date?: Date,
    attendanceTypeId?: number,
    longitude?: string,
    latitude?: string,
    timestamp?: number
 }