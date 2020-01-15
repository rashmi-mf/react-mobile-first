import React, {Component} from 'react';
import './StyleSheet.css'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Form from './components/Form';
import GetJokes from './components/GetJokes';
import GetBitCoins from './components/GetBitCoins';
var contentPane;
var backgroundBg = "bg-back d-flex";
var contentPaneData = "";

class App extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
            sideBarStatus: "",
            navEnabled: false,
            viewForm: false,
            welcomeMsg: "Welcome to MobileFirst",
            isLoggedIn: false,
            email: ""
        }
        this.handler = this.handler.bind(this);
        this.contentPane = "";
        this.wrapperRef = React.createRef();
    }

    handler(emailId) {
        const br = `\n`;
        this.setState({
            isLoggedIn: true,
            email: emailId
        })
        contentPane = "Successfully signed in!" + br + br + "Welcome " + emailId;
    }    
    
    handleNav = () => {
        if (this.state.navEnabled) {
            this.setState({sideBarStatus: ""});
            this.state.navEnabled = false;
        } else {
            this.setState({sideBarStatus: "visible"});
            this.state.navEnabled = true;
        }

        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('navOpen');
    }

    handleClick = (event) => {
        switch (event.target.id) {
            case "login":
                contentPane = <Form data={{email: this.state.email, handler: this.handler.bind(this)}} />
                backgroundBg = "login-bg d-flex wrapper";
                contentPaneData = "formData";
                break;
            case "getJokes":
                contentPane = <GetJokes />
                contentPaneData = "getJokesData";
                backgroundBg = "wrapper";
                break;
            default:
                contentPane = <GetBitCoins />;
                backgroundBg = "login-bg d-flex wrapper"
                contentPaneData = "defaultData";
        }
        this.setState({
            viewForm: true,
            navEnabled: false,
            sideBarStatus: ""
        });
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('navOpen');
    }

    handleChange = (event) => {
        this.setState({
            searchText: event.target.value
        }) 
    }

    greetParent(childName) {
        this.setState({loginState: childName});
    }
    
    render() {        
        return (
            <React.Fragment>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    width='thin'
                    className = {this.state.sideBarStatus}
                >
                    <Menu.Item as='a' id="login" className={(this.state.isLoggedIn) ? "pointerEvent" : ""} onClick={this.handleClick}>
                        <Icon name='user circle' />
                        {this.state.isLoggedIn ? this.state.email : "Login"}
                    </Menu.Item>
                    <Menu.Item as='a' id="getJokes" onClick={this.handleClick}>
                        <Icon name='meh outline' />
                        Get Jokes
                    </Menu.Item>
                    <Menu.Item as='a' id="getBitCoins" onClick={this.handleClick}>
                        <Icon name='rupee sign' />
                        Bit Coins
                    </Menu.Item>
                </Sidebar>
                <section className="wrapper" ref={this.wrapperRef}>
                    <span className="fa fa-bars fa-2x navBar nav-link position-absolute text-white text-shadow cursor-pointer" onClick={this.handleNav}></span>
                    <div className={`text-center ${backgroundBg}`}>
                        {!(this.state.isLoggedIn || this.state.viewForm) ? <h1 className="align-self-center fa- fa-4x mx-auto text-white text-shadow">{this.state.welcomeMsg}</h1> : "" }
                        <div className={`${(this.state.viewForm) ? "mx-auto my-auto" : ""} ${((this.state.isLoggedIn && contentPaneData != "getJokesData") ? "h1 text-white text-shadow" : "")}`}>
                            {(this.state.viewForm) ? contentPane : ''}
                        </div>
                    </div>
                </section>                
            </React.Fragment>
        )
    }
}

export default App;