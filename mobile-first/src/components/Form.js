import React, { Component } from 'react';

class Form extends Component {
constructor (props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        emailIconState : false,
        passIconState : false,
        formValid: false,
        cursorState: "cursor-disabled",
        isLoggedIn: false,
        emailId: ""
    }
}

handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
        () => { this.validateField(name, value) });
}

validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            this.state.emailIconState = emailValid ? "fa text-success my-auto fa-check-circle-o" : "fa my-auto text-danger fa-times-circle-o";
            break;
        case 'password':
            passwordValid = value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i);
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            this.state.passIconState = passwordValid ? "fa text-success my-auto fa-check-circle-o" : "fa my-auto text-danger fa-times-circle-o";
            break;
        default:
            break;
    }
    this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
        this.state.cursorState = this.state.formValid ? "cursor-pointer" : "cursor-disabled";
    }

    errorClass = (error) => {
        return(error.length === 0 ? '' : 'has-error');
    }

    render () {
        let greetUser = "Welcome "+ this.state.email;
        let userInfo = this.state.isLoggedIn ? greetUser : "Welcome Guest";
        return (
            <React.Fragment>
                <section className="d-flex wrapper">
                    {this.state.isLoggedIn ?
                    <div className={`text-center d-flex`}>
                        <h1 className="align-self-center fa- fa-4x mx-auto">{this.state.isLoggedIn ? greetUser : "Welcome Guest"}</h1>
                    </div> :
                    <div className="border demoForm p-5 bg-light">
                        <h2 className="mb-5">Enter your details</h2>
                        <div className={`d-flex ${this.errorClass(this.state.formErrors.email)}`}>
                            <input type="email" required className="form-group form-control w-100" name="email" placeholder="Email" value={this.state.email} onChange={this.handleUserInput}  />
                            <span className="ml-3"><i className={this.state.emailIconState}></i></span>
                        </div>
                        <div className={`d-flex ${this.errorClass(this.state.formErrors.password)}`}>
                            <input type="password" className="form-group form-control w-100" name="password" placeholder="Password" value={this.state.password} onChange={this.handleUserInput}  />
                            <span className="ml-3"><i className={this.state.passIconState}></i></span>
                        </div>
                        <button id="signinBtn" className={`${this.state.cursorState} btn btn-primary w-100 mt-3`} disabled={!this.state.formValid} onClick = {() => this.props.data.handler(this.state.email)}>Sign in</button>
                    </div>
                    }
                </section>
            </React.Fragment>
        )
    }
}

export default Form;
