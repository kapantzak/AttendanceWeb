import * as React from 'react';
import * as $ from 'jquery';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './Models/CourseInstance';
import { CoursesTable } from './Helpers/CoursesTable';
import { Button } from 'reactstrap';
import { BarLoader, BeatLoader } from 'react-spinners';
import * as ses from './Helpers/sessionHelper';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';

interface IQRCodeProps {
    qrCode: string,
    courses: coursesMod.ICourseInstance[]    
}

interface IQRCodeState {
    qrCode: string,
    courses: coursesMod.ICourseInstance[],
    viewQRCode: boolean,
    isLoading: boolean,
    loadingQrCode: boolean,
    error: any
}

class QRCode extends React.Component<IQRCodeProps,IQRCodeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            qrCode: "",
            courses: [],
            viewQRCode: false,
            isLoading: false,
            loadingQrCode: false,
            error: null
        }
        this.generateQRCode = this.generateQRCode.bind(this);        
    }

    componentDidMount() {

        this.setState({ isLoading: true });

        let headers = api.getHeaders(api.ContentType.json,false);
        let body = {
            Id: ses.getUserId()
        };
        
        if (headers !== null) {
            fetch(`${Config.serverUrl}api/Courses/GetCurrent`, {
                method: "post",
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong...");
                }
            })
            .then(json => {
                let activeCourses: coursesMod.ICourseInstance[] = json.map((c: any): coursesMod.ICourseInstance => ({
                    Id: c.id,
                    Title: c.title,
                    Descr: c.descr,
                    IsActive: c.isActive,
                    CourseAssignmentId: c.courseAssignmentId
                }));
    
                this.setState({
                    courses: activeCourses,
                    isLoading: false
                })
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }
                
    }

    toggleQRCodeButton(row: any) {        
        let thisLectureNewButton = $(`#btnNewLecture_${row.Id}`);        
        let thisQrCodeButton = $(`#btnQrCode_${row.Id}`);        
        $('.btn-lecture-new').removeClass('hidden');        
        $('.btn-qrcode').addClass('hidden');
        thisLectureNewButton.addClass('hidden');
        thisQrCodeButton.removeClass('hidden');
    }

    generateQRCode(row: any) {        
        let headers = api.getHeaders(api.ContentType.text);
        this.setState({
            loadingQrCode: true
        });
        if (headers !== null && row.hasOwnProperty('CourseAssignmentId')) {
            fetch(`${Config.serverUrl}api/QRCode/${row.CourseAssignmentId}`, {
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
                qrCode: text,
                viewQRCode: true,
                isLoading: false,
                loadingQrCode: false
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

        const { qrCode, courses, isLoading, viewQRCode, error } = this.state;
        const userRoles = ses.getUserRolesObj();

        let qrCodeImg = `data:image/png;base64,${qrCode}`;

        let loadingDiv = null;
        if (this.state.loadingQrCode) {
            loadingDiv = <div id="loadingDiv">
                            <div id="innerLoading">
                                <BeatLoader
                                    color={'#333'}
                                    loading={this.state.loadingQrCode}
                                />
                            </div>
                        </div>;
        }

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
                {loadingDiv}
                <h2>QRCode</h2>
                <div className="alert alert-info" role="alert">
                    Select a course to generate a new QR Code
                </div>
                <div id="qrCodeHolder_outer" style={(viewQRCode === true) ? { display: "block" } : { display: "none" }}>
                    <img id="qrCodeHolder_inner" src={qrCodeImg} />
                    <Button id="btnHideQRCode" color="default" onClick={() => this.hideQRCode()}><i className="fa fa-remove"></i></Button>
                </div>
                <CoursesTable data={courses} qrCodeGenerator={this.generateQRCode} toggleQRCodeButton={this.toggleQRCodeButton} />
            </div>
        );
    }
}

export default QRCode;