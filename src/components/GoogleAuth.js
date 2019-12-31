import React from 'react';

class GoogleAuth extends React.Component {
        //when the app is first loaded, we are not sure if the user is signed in or not, and we don't want to load any error message.
        state = {
            isSignedIn: null
        }

    //We only want to call library one time, whtn the component is rendered in the screen
    componentDidMount() {
        //variable gapi is available in window scope 
        //if client:auth2 is successfully loaded, it calls 'callback' (2nd argument)
        window.gapi.load('client:auth2', () => {
            //init returns promise
            window.gapi.client.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                scope: 'email'
            }).then(() => {
                //can access to auth object (this.auth)
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                })
                //change message once signed in/out
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        })
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <div onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign out
                </div>
            )
        } else {
            return (
                <div onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>Sign in with Google
                </div>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth;