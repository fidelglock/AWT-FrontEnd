import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import TextArea from "components/FormInputs/TextArea"
import SingleSelect from "components/FormInputs/select"
import { Alert } from "react-bootstrap";
import authlib from "../../../config/authlib"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            noOfStudents: 3,
            categoryId: 1,
            description: '',
            preReq: '',
            registered:false,
            categoryOptions: [
                {key:1, value:"TV Apps"},
                {key:2, value:"Web Technologies"},
                {key:3, value:"Artificial intelligence"},
                {key:4, value:"Multi Screen"},
                {key:5, value:"Media Technology"},
                {key:6, value:"Immersive Web"}
            ]
        };
        this. handleSubmitLocal = this.handleSubmitLocal.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //TODO load from database
    componentDidMount1() {
        this.setState({ isLoading: true });

        fetch(global.backendURL+ "category")
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong ...");
                }
            })
            .then(data => {
                
                data.forEach(elemnt => {
                    this.state.categoryOptions.push(elemnt);
                });
                this.setState({ isLoading: false });
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmitLocal = e => {

        e.preventDefault();
        const options = authlib.getFetchOptions('POST');

        fetch(global.backendURL + "projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':options.headers['x-access-token']
            },
            body: JSON.stringify({
                Title: e.target[0].value,
                Description: e.target[3].value,
                CategoryID: e.target[2].value,
                Prereq: e.target[4].value,
                MaxStudent: e.target[1].value
            })
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            this.setState({registered: true});
        })
        .catch(err => console.log(err));
    }



    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="card">
                <div className="content">
                    <Alert variant="success" className={this.state.registered ? 'visible' : 'hidden'}>
                        New Project has been added
                    </Alert>
                    <form onSubmit={this.handleSubmitLocal} className="form-horizontal">

                        <legend>Register New Project</legend>

                        <div className="form-group">
                            <label className="control-label col-md-3">Title</label>
                            <div className="col-md-9">
                                <Field
                                    name="projectTitle"
                                    placeholder="Project Signup"
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">No. of Students</label>
                            <div className="col-md-9">
                                <Field
                                    name="country"
                                    type="number"
                                    placeholder="3"
                                    onChange={this.handleChange}
                                    value={this.state.noOfStudents}
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Category</label>
                            <div className="col-md-9">

                                <Field
                                    name="category"
                                    placeholder="select category"
                                    options={this.state.categoryOptions}
                                    value={this.state.categoryId}
                                    component={SingleSelect} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Description</label>
                            <div className="col-md-9">
                                <Field
                                    name="zip"
                                    placeholder="10235"
                                    type="text"
                                    rows="10"
                                    value={this.state.description}
                                    component={TextArea} />
                            </div>
                        </div>




                        <div className="form-group">
                            <label className="control-label col-md-3">Pre Requisites</label>
                            <div className="col-md-9">
                                <Field
                                    name="dSender Name"
                                    placeholder="Joh Doe"
                                    type="text"
                                    rows="5"
                                    component={TextArea}
                                    value={this.state.preRequisites}/>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-fill btn-info right">Add Project</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'formElements'
})(Register);