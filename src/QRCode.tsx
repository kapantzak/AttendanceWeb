import * as React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

interface IQRCodeProps {
    svg: string
}

interface IQRCodeState {
    svg: string,
    isLoading: boolean,
    error: any
}

class QRCode extends React.Component<IQRCodeProps,IQRCodeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            svg: "",
            isLoading: false,
            error: null
        }
    }

    componentDidMount() {

        this.setState({ isLoading: true });

        let headers: Headers = new Headers();
        headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9obiIsImVtYWlsIjoiIiwiZXhwIjoxNTE0MDEzMTAyLCJuYmYiOjE1MTMxNDkxMDIsImlzcyI6IkF0dGVuZGFuY2VXZWJBUEkiLCJhdWQiOiJBdHRlbmRhbmNlQXBwQ29uc3VtZXIifQ.Ii7s9UW-beOPsEmPeOUxBC9U96aYY2-s4CZag_U7LIE");
        headers.append("Content-Type", "text/plain");
        
        fetch("http://localhost:24940/api/QRCode/1", {
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
            isLoading: false
        }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {

        const { svg, isLoading, error } = this.state;

        if (error) {
            return <div className="alert alert-danger" role="alert">{ error.message }</div>
        }

        if (isLoading === true) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h2>QRCode</h2>
                <p>This is the QRCode page</p>
                <div>
                    {svg}
                </div>
            </div>
        );
    }
}

export default QRCode;