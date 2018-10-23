import * as React from 'react';
import * as ses from './Helpers/sessionHelper';
import { BarLoader } from 'react-spinners';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { IEnrollmentLogs } from './Models/EnrollmentLogs';
import { Doughnut } from 'react-chartjs-2';
//import { formatDate } from './Helpers/dateHelper';

interface IAttendanceLogsState {  
    enrollmentId: number | null,  
    isLoading: boolean,
    error: any,
    enrLogs: IEnrollmentLogs | null
}

class AttendanceLogs extends React.Component<IAttendanceLogsState,IAttendanceLogsState> {

    constructor(props: any) {
        super(props);
        this.state = {       
            enrollmentId: this.getEnrollmentIdFromUrl(props.location.pathname),     
            isLoading: false,
            error: null,
            enrLogs: null
        }        
    }

    getEnrollmentIdFromUrl(pathname: string): number | null {
        let arr = pathname.split('/');
        let id = arr[arr.length-1];        
        try {
            return parseInt(id);
        } catch (e) {
            return null;
        }        
    }

    componentDidMount() {

        this.setState({ isLoading: true });
        
        let headers = api.getHeaders(api.ContentType.json);
        if (headers !== null) {
            
            fetch(`${Config.serverUrl}api/AttendanceLog/GetEnrollmentAttendanceLogs/${this.state.enrollmentId}`, {
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
                    enrLogs: json
                })
                console.log(this.state);
            })
            .catch(error => this.setState({ error, isLoading: false }));

        }
    }

    render() {

        const { isLoading, error, enrLogs } = this.state;
        const userRoles = ses.getUserRolesObj();
        console.log(enrLogs);

        let chartAttendances = null;
        let enrDetails = null;
        let courseTitle = (enrLogs && enrLogs.courseTitle) ? enrLogs.courseTitle : 'Attendance Logs';

        if (userRoles !== null && userRoles.isStudent === true) {

            let actualLogs = (enrLogs &&  enrLogs.logs) ? enrLogs.logs.length : 0;
            let lecturesActual = (enrLogs && enrLogs.lecturesActualNum) ? enrLogs.lecturesActualNum : 0;
            let lecturesMin = (enrLogs && enrLogs.lecturesMinNum) ? enrLogs.lecturesMinNum : 0;        
            let remaining = lecturesMin - actualLogs;
            let absences = lecturesActual - actualLogs;

            const donughtData = {
                labels: [
                    'Actual',
                    'Remaining',                    
                ],
                datasets: [{
                    data: [
                        actualLogs,
                        remaining
                    ],
                    backgroundColor: [                        
                        //'rgba(255, 99, 132, 0.7)',  
                        'rgba(40, 167, 69, 0.7)', 
                        'rgba(54, 162, 235, 0.7)',
                    ],
                    hoverBackgroundColor: [                        
                        //'rgba(255, 99, 132, 1)',   
                        'rgba(40, 167, 69, 1)', 
                        'rgba(54, 162, 235, 1)',
                    ]
                }]
            };
            chartAttendances = <div className="col-sm-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Attendance logs</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">View your registered (Actual), and the remaining attendances required for the specific course.</h6>
                                        <div className="card-text">
                                            <Doughnut data={donughtData} />
                                        </div>                                
                                    </div>
                                </div>
                            </div>

            
            enrDetails = <div className="col-sm-12 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Details</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">View details about the specific enrollment.</h6>
                                    <div className="card-text">
                                        <ListGroup>
                                            <ListGroupItem className="justify-content-between">Lectures delivered <Badge className="pull-right" pill>{lecturesActual}</Badge></ListGroupItem>
                                            <ListGroupItem className="justify-content-between" color="success">Attendances logged <Badge color="success" className="pull-right" pill>{actualLogs}</Badge></ListGroupItem>
                                            <ListGroupItem className="justify-content-between" color="danger">Absences <Badge color="danger" className="pull-right" pill>{absences}</Badge></ListGroupItem>
                                        </ListGroup>
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
                <h2>{courseTitle}</h2>
                <div className="row marginTop-lg">                    
                    {chartAttendances}
                    {enrDetails}
                </div>
            </div>
        );
    }
}

export default AttendanceLogs;