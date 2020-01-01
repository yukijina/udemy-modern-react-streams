import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';


class GoogleAuth extends React.Component {

    //We only want to call library one time, whtn the component is rendered in the screen
    componentDidMount() {
        //variable gapi is available in window scope 
        //if client:auth2 is successfully loaded, it calls 'callback' (2nd argument)
        //gapi has one single object load() to access to google library
        window.gapi.load('client:auth2', () => {
            //init returns promise
            window.gapi.client.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                scope: 'email'
            }).then(() => {
                //can access to auth object (this.auth)
                this.auth = window.gapi.auth2.getAuthInstance();
                //change current status -sign in or sign out
                this.onAuthChange(this.auth.isSignedIn.get())
                //listen is invoked anytime when user's authentication status changed
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = isSignedIn => {
       if (isSignedIn) {
           this.props.signIn(this.auth.currentUser.get().getId())
       } else {
           this.props.signOut()
       }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
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

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);