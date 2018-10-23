/*
 *  CoursesInstance model
 */

export interface ICourseInstance {
    Id?: number,
    Title?: string,
    Descr?:  string,
    IsActive?: boolean,
    CourseAssignmentId?: number
}