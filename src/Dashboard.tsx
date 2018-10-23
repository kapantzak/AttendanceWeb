import * as React from 'react';
import * as ses from './Helpers/sessionHelper';
import { BarLoader } from 'react-spinners';
import { CoursesDetailsTable } from './Helpers/CoursesDetailsTable';
import { EnrollmentsDetailsTable } from './Helpers/EnrollmentsDetailsTable';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';
import { formatDate } from './Helpers/dateHelper';

interface IDashboardState {
    courses: any,
    enrollments: any,
    isLoading: boolean,
    error: any
}

class Dashboard extends React.Component<IDashboardState,IDashboardState> {

    constructor(props: any) {
        super(props);
        this.state = {
            courses: null,
            enrollments: null,
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {

        this.setState({ isLoading: true });
        
        let headers = api.getHeaders(api.ContentType.json);
        if (headers !== null) {

            // Get professor's data
            fetch(`${Config.serverUrl}api/Users/ProfessorsAssignedData/${ses.getUserId()}`, {
                method: "get",
                headers: headers
            })
            .then(response => {                 
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong...");
                }            
            })
            .then(json => {
                this.setState({
                    isLoading: false,
                    courses: json.courses.map((c:any): any => ({
                        id: c.id,
                        title: c.title,
                        students: c.students,
                        studentsCount: c.students.length
                    }))
                })
            })
            .catch(error => this.setState({ error, isLoading: false }));

            // Get student's data
            fetch(`${Config.serverUrl}api/Enrollments/GetByUserId/${ses.getUserId()}`, {
                method: "get",
                headers: headers
            })
            .then(response => {                 
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong...");
                }            
            })
            .then(json => {
                this.setState({
                    isLoading: false,
                    enrollments: json.map((e:any):any => ({
                        id: e.id,
                        startDate: e.startDate,
                        endDate: e.endDate,
                        studentId: e.studentId,
                        firstName: e.firstName,
                        lastName: e.lastName,
                        courseId: e.courseId,
                        courseName: e.courseName,
                        isActive: e.isActive,
                        logsCount: e.logs.length,                        
                        logs: e.logs.map((l:any):any => ({
                            id: l.id,
                            date: formatDate(l.date),
                            attendanceType: (l.attendanceTypeId === 0) ? 'presence' : 'absence'
                        }))
                    }))
                })
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }
    }

    render() {

        const { courses, enrollments, isLoading, error } = this.state;
        const userRoles = ses.getUserRolesObj();

        // Professor or Admin
        let professorsData = null;
        if (userRoles !== null && (userRoles.isAdmin === true || userRoles.isProfessor === true)) {            
            professorsData = <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">My courses</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">View courses assigned to you and all students enrolled to each course.</h6>
                                        <div className="card-text">
                                            <CoursesDetailsTable data={courses} />
                                        </div>                                
                                    </div>
                                </div>
                            </div>
        }

        // Student
        let studentsData = null;
        if (userRoles !== null && userRoles.isStudent === true) {
            studentsData = <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">My enrollments</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">View the courses that you are enrolled to.</h6>
                                        <div className="card-text">
                                            <EnrollmentsDetailsTable data={enrollments} />
                                        </div>                                
                                    </div>
                                </div>
                            </div>
        }

        if (error) {
            return <div className="alert alert-danger" role="alert">{ error.message }</div>
        }

        if (isLoading === true) {
            return <BarLoader color={'#333'} loading={isLoading} />
        }

        return (
            <div>
                <h2>Dashboard</h2>
                <div className="row marginTop-lg">
                    {professorsData}
                    {studentsData}
                </div>
            </div>
        );
    }
}

export default Dashboard;