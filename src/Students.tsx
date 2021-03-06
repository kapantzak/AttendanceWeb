import * as React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as usr from './Models/Users';
import { BarLoader } from 'react-spinners';
import { StudentsTable } from './Helpers/StudentsTable';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';
import * as ses from './Helpers/sessionHelper';

interface IStudentsProps {
    students: usr.IUser[]
}

interface IStudentsState {
    students: usr.IUser[],
    isLoading: boolean,
    error: any
}

class Students extends React.Component<IStudentsProps,IStudentsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            students: [],
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {

        this.setState({ isLoading: true });

        let headers = api.getHeaders(api.ContentType.json);
        if (headers !== null) {
            fetch(`${Config.serverUrl}api/Users/ProfessorsStudents/${ses.getUserId()}`, {
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
            .then(json => this.setState({
                students: json.map((s:any): usr.IUser => ({
                    ID: s.id,
                    FirstName: s.firstName,
                    LastName: s.lastName                
                })),
                isLoading: false
            }))
            .catch(error => this.setState({ error, isLoading: false }));
        }
    }

    render() {

        const { students, isLoading, error } = this.state;
        const userRoles = ses.getUserRolesObj();

        if (error) {
            return <div className="alert alert-danger" role="alert">{ error.message }</div>
        }

        if (isLoading === true) {
            return <BarLoader color={'#333'} loading={isLoading} />
        }

        if (userRoles.isAdmin !== true && userRoles.isProfessor !== true) {
            return <div className="alert alert-danger" role="alert">You are not allowed to view this page</div>
        }

        return (
            <div>
                <h2>Students</h2>
                <p>This is the students list page</p>
                <div>
                    <StudentsTable data={students} />
                </div>
            </div>
        );
    }
}

export default Students;