import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import TextArea from "components/FormInputs/TextArea"
import SingleSelect from "components/FormInputs/select"
import { Alert } from "react-bootstrap";
import authLib from "../../config/authlib"
import { options } from 'sw-toolbox';

const fetchOption = authLib.getFetchOptions();

const required = (value) => {
    if (!value || value === "" || value === "select...") {
        return "Atleast one student is required ! "
    }
    else {
        return undefined
    }
}


class ProjectSignup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            registered: false,
            ProjectOptions: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(global.backendURL + "Projects", fetchOption)
            .then(res => res.json())
            .then(
                (data) => {
                    data.forEach(project => {
                        this.state.ProjectOptions.push({ text: project.Title, value: project.ProjectId })
                    });
                    this.setState({ isLoading: false });
                })
            .catch(function (error) {
                console.log(error)
            });
    }

    handleSubmit(values) {
        values.preventDefault();
        if ((values.target['pref1'].value == values.target['pref2'].value) ||
            (values.target['pref3'].value == values.target['pref2'].value) ||
            (values.target['pref1'].value == values.target['pref3'].value) ||

            (values.target['pref1'].value == 'select...') ||
            (values.target['pref2'].value == 'select...') ||
            (values.target['pref3'].value == 'select...')
        ) {
            alert('Please select appropriate projects');
            return;
        }


        var arr = [];

        //Insert rows for student# 1

        //pref#1
        arr.push({
            "studentid": values.target['matric1'].value,
            "projectid": values.target['pref1'].value,
            "preference": 1
        });

        arr.push({
            "studentid": values.target['matric1'].value,
            "projectid": values.target['pref2'].value,
            "preference": 2
        });
        arr.push({
            "studentid": values.target['matric1'].value,
            "projectid": values.target['pref3'].value,
            "preference": 3
        });

        //row for student #
        var studentId = values.target['matric2'].value
        if (studentId) {
            //pref#1
            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref1'].value,
                "preference": 1
            });

            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref2'].value,
                "preference": 2
            });
            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref3'].value,
                "preference": 3
            });
        }

        //row for student #3
        studentId = values.target['matric3'].value
        if (studentId) {
            //pref#1
            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref1'].value,
                "preference": 1
            });

            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref2'].value,
                "preference": 2
            });
            arr.push({
                "studentid": studentId,
                "projectid": values.target['pref3'].value,
                "preference": 3
            });
        }



        console.log(values)


        fetch("http://localhost:8000/studentprojectbulk", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': fetchOption.headers['x-access-token']
            },
            body: JSON.stringify(arr)
        })
            .then(data => {
                console.log(data)
            })

        //update the student info as well 
        studentId = values.target['matric3'].value
        var students = [];
        students.push({

            "studentid": values.target['matric1'].value,
            "name": values.target['name1'].value,
            "email": values.target['email1'].value,
        });
        if (values.target['matric2'].value) {
            students.push({

                "studentid": values.target['matric2'].value,
                "name": values.target['name2'].value,
                "email": values.target['email2'].value,
            });
        }
        if (values.target['matric3'].value) {
            students.push({

                "studentid": values.target['matric3'].value,
                "name": values.target['name3'].value,
                "email": values.target['email3'].value,
            });
        }


        fetch(global.backendURL + "studentsBulk", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': fetchOption.headers['x-access-token']
            },
            body: JSON.stringify(students)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ registered: true });
            });

        var message = "You have been signed up for the project. Registered team Emails are  ";
        message += values.target['email1'].value + " ";
        message += values.target['email2'].value + " ";
        message += values.target['email3'].value + " ";

        fetch(global.backendURL + "sendemail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': fetchOption.headers['x-access-token']
            },
            body: JSON.stringify({
                email: values.target['email1'].value,
                subject: 'Project Sign-up',
                message: message
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ registered: true });
            });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="card">
                <div className="content">
                    <form onSubmit={this.handleSubmit} className="form-horizontal">

                        <legend>Signup for a Project</legend>
                        <heading> STUDENT 1 </heading>
                        <div className="form-group">
                            <label className="control-label col-md-3">Full Name</label>
                            <div className="col-md-9">
                                <Field
                                    name="name1"
                                    placeholder="First and Last name"
                                    type="text"
                                    validate={required}
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Matriculation Number</label>
                            <div className="col-md-9">
                                <Field
                                    name="matric1"
                                    type="number"
                                    validate={required}
                                    placeholder="six digits"
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Email</label>
                            <div className="col-md-9">
                                <Field
                                    name="email1"
                                    type="email"
                                    validate={required}
                                    placeholder="Please enter your email"
                                    component={renderField} />
                            </div>
                        </div>

                        <heading> STUDENT 2 </heading>

                        <div className="form-group">
                            <label className="control-label col-md-3">Full Name</label>
                            <div className="col-md-9">
                                <Field
                                    name="name2"
                                    placeholder="First and Last name"
                                    type="text"
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Matriculation Number</label>
                            <div className="col-md-9">
                                <Field
                                    name="matric2"
                                    type="number"
                                    placeholder="six digits"
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Email</label>
                            <div className="col-md-9">
                                <Field
                                    name="email2"
                                    type="email"
                                    placeholder="Please enter your email"
                                    component={renderField} />
                            </div>
                        </div>

                        <heading> STUDENT 3 </heading>
                        <div className="form-group">
                            <label className="control-label col-md-3">Full Name</label>
                            <div className="col-md-9">
                                <Field
                                    name="name3"
                                    placeholder="First and Last name"
                                    type="text"
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Matriculation Number</label>
                            <div className="col-md-9">
                                <Field
                                    name="matric3"
                                    type="number"
                                    placeholder="six digits"
                                    component={renderField} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-md-3">Email</label>
                            <div className="col-md-9">
                                <Field
                                    name="email3"
                                    type="email"
                                    placeholder="Please enter your email"
                                    component={renderField} />
                            </div>
                        </div>


                        <legend>Preference1</legend>

                        <div>
                            <div>
                                <select
                                    //value={this.props.chosenProject.Title}
                                    onChange={this.props.handleChange}
                                    name="pref1"
                                    class="required">
                                    <option selected="selected">select...</option>
                                    {this.state.ProjectOptions.map((project) => <option value={project.value}>{project.text}</option>)}
                                </select>
                            </div>
                        </div>

                        <legend>Preference2</legend>

                        <div>
                            <div>
                                <select
                                    // value={this.props.chosenProject.Title}
                                    onChange={this.props.handleChange}
                                    name="pref2"
                                    class="required"

                                >
                                    <option selected="selected">select...</option>
                                    {this.state.ProjectOptions.map((project) => <option value={project.value}>{project.text}</option>)}
                                </select>
                            </div>
                        </div>

                        <legend>Preference3</legend>

                        <div>
                            <div>
                                <select
                                    // value={this.props.chosenProject.Title}
                                    onChange={this.props.handleChange}
                                    name="pref3"
                                    class="required"

                                >
                                    <option selected="selected">select...</option>
                                    {this.state.ProjectOptions.map((project) => <option value={project.value}>{project.text}</option>)}
                                </select>
                            </div>
                        </div>

                       

                        <div className="form-group">
                        <label className="control-label col-md-3"></label>
                        <div className="col-md-9 checkbox-group">
                        <a href='https://gdprchecklist.io/'> 
                        <Field
                            name="checkbox1"
                            type="checkbox"
                            label="I hereby Agree to comply by the "
                            validate={required}
                            component={renderField} />

GDPR regulations </a>
                        </div>                           
                        </div>
                        <button type="submit" className="btn btn-fill btn-info right">Sign Up</button>
                    </form>
                    <Alert variant="success" className={this.state.registered ? 'visible' : 'hidden'}>
                    Your selection has been confirmed and confirmation on email has been sent! Thank you! 
                </Alert>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form: 'formElements',
})(ProjectSignup);