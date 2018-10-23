/*
 *  EnrollmentLogs model
 */

import { IAttendancetLogs } from './AttendanceLog';

export interface IEnrollmentLogs {
    date?: Date,
    courseTitle?: string,
    lecturesActualNum?: number,
    lecturesMinNum?: number,
    lecturesTargetNum?: number,
    logs?: IAttendancetLogs[]
}