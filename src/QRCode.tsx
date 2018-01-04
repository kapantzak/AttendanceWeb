import * as React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './Models/Courses';
import { CoursesTable } from './Helpers/CoursesTable';
import { Button } from 'reactstrap';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';

interface IQRCodeProps {
    svg: string,
    courses: coursesMod.ICourse[]    
}

interface IQRCodeState {
    svg: string,
    courses: coursesMod.ICourse[],
    viewQRCode: boolean,
    isLoading: boolean,
    error: any
}

class QRCode extends React.Component<IQRCodeProps,IQRCodeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            svg: "",
            courses: [],
            viewQRCode: false,
            isLoading: false,
            error: null
        }
        this.generateQRCode = this.generateQRCode.bind(this);        
    }

    componentDidMount() {

        this.setState({ isLoading: true });

        let headers = api.getHeaders(api.ContentType.text);     
        
        if (headers !== null) {
            fetch(`${Config.serverUrl}api/Courses`, {
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
        }
                
    }

    generateQRCode(row: any) {        
        let headers = api.getHeaders(api.ContentType.text);     
        if (headers !== null && row.hasOwnProperty('ID')) {
            fetch(`${Config.serverUrl}api/QRCode/${row.ID}`, {
                method: "get",
                headers: headers
            })
            .then(response => { 
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Something went wrong...");
                }            
            })            
            .then(text => this.setState({
                svg: text,
                viewQRCode: true,
                isLoading: false
            }))
            .catch(error => this.setState({ error, isLoading: false }));
        }
    }

    hideQRCode() {
        this.setState({
            viewQRCode: false
        });
    }

    render() {

        const { svg, courses, isLoading, viewQRCode, error } = this.state;

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
                <div id="qrCodeHolder_outer" style={(viewQRCode === true) ? { display: "block" } : { display: "none" }}>
                    <div id="qrCodeHolder_inner" dangerouslySetInnerHTML={{__html: svg}} />
                    <Button id="btnHideQRCode" color="default" onClick={() => this.hideQRCode()}><i className="fa fa-remove"></i></Button>
                </div>
                <CoursesTable data={courses} qrCodeGenerator={this.generateQRCode} />
            </div>
        );
    }
}

export default QRCode;