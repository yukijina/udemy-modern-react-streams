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
            })
        })
    }

    renderAuthButton() {
        if(this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>
        } else if (this.state.isSignedIn) {
            return <div>I am signed in !</div>
        } else {
            return <div>I am nos signed in</div>
        }
    }

    render() {
        return (
            <div>Google Auth: {this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth;