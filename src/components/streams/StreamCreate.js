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

    onSubmit = (formValues) => {
        console.log('form', formValues)
    }
    
    render() {
        //show redux-form helper
        //console.log(this.props)
        return (
            //handleSubmit - function of redux-form, argument this.onSubmit is from helper
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

//hooked up reduxForm
//reduxForm function is similer syntax as connect - reduxFrom returns function() and immediately call the function (StreamCreate)
//reduxForm takes single object - string of name of the form
export default reduxForm({ form: 'streamCreate'})(StreamCreate);

