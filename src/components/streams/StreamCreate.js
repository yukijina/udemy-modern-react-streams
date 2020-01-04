import React from 'react';
//Field is component (capital letter), reduxForm is function
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component { 
    //helper mmethod of redux form
    //renderInput(formProps) {
    // label is from Field Component
    renderInput({input, label}) {
        //return <input onChange={formProps.input.onChange} value={formProps.input.value}></input>
        //refactor the line above (shorthund)
        //return <input {...formProps.input}></input>
        return  (
            <div className="field">
                <label>{label}</label>
                <input {...input}></input>
            </div>
        )
    }
    
    render() {
        //show redux-form helper
        //console.log(this.props)
        return (
            <form className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
            </form>
        )
    }
}

//hooked up reduxForm
//reduxForm function is similer syntax as connect - reduxFrom returns function() and immediately call the function (StreamCreate)
//reduxForm takes single object - string of name of the form
export default reduxForm({ form: 'streamCreate'})(StreamCreate);

