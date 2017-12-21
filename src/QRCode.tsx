import * as React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './Models/Courses';
import { CoursesTable } from './Helpers/CoursesTable';
// import { Button } from 'reactstrap';

interface IQRCodeProps {
    svg: string,
    courses: coursesMod.ICourse[],
}

interface IQRCodeState {
    svg: string,
    courses: coursesMod.ICourse[],
    isLoading: boolean,
    error: any
}

class QRCode extends React.Component<IQRCodeProps,IQRCodeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            svg: "",
            courses: [],
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {

        this.setState({ isLoading: true });

        let headers: Headers = new Headers();
        headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9obiIsImVtYWlsIjoiIiwiZXhwIjoxNTE0MDEzMTAyLCJuYmYiOjE1MTMxNDkxMDIsImlzcyI6IkF0dGVuZGFuY2VXZWJBUEkiLCJhdWQiOiJBdHRlbmRhbmNlQXBwQ29uc3VtZXIifQ.Ii7s9UW-beOPsEmPeOUxBC9U96aYY2-s4CZag_U7LIE");
        headers.append("Content-Type", "text/plain");

        fetch("http://localhost:24940/api/Courses", {
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
            let activeCourses: coursesMod.ICourse[] = json.map((c: any): coursesMod.ICourse => ({
                ID: c.id,
                Title: c.title,
                Descr: c.descr,
                IsActive: c.isActive
            })).filter((c: coursesMod.ICourse): boolean => c.IsActive === true);

            this.setState({
                courses: activeCourses,
                isLoading: false
            })
        })
        .catch(error => this.setState({ error, isLoading: false }));
        
        // fetch("http://localhost:24940/api/QRCode/1", {
        //     method: "get",
        //     headers: headers
        // })
        // .then(response => { 
        //     if (response.ok) {
        //         return response.text();
        //     } else {
        //         throw new Error("Something went wrong...");
        //     }            
        // })
        // .then(text => this.setState({
        //     svg: text,
        //     isLoading: false
        // }))
        // .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        const { svg, courses, isLoading, error } = this.state;

        if (error) {
            return <div className="alert alert-danger" role="alert">{ error.message }</div>
        }

        if (isLoading === true) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h2>QRCode</h2>
                <div className="alert alert-info" role="alert">
                    Select a course to generate a new QR Code
                </div>
                <div dangerouslySetInnerHTML={{__html: svg}} />
                <CoursesTable data={courses} />
            </div>
        );
    }
}

export default QRCode;