import React from 'react';
//Field is component (capital letter), reduxForm is function
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component { 

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    //helper mmethod of redux form
    //renderInput(formProps) {
    // label and meta is from Field Component (redux-form)
    renderInput = ({input, label, meta}) => {
        //const customClass=`field ${meta.error && meta.touched ? 'error' : ''}`
        //return <input onChange={formProps.input.onChange} value={formProps.input.value}></input>
        //refactor the line above (shorthund)
        //return <input {...formProps.input}></input>
        //autoComplete - off/on is just an option\
        return  (
            //<div className={customClass}>
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"></input>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }
    
    render() {
        //show redux-form helper
        //console.log(this.props)
        return (
            //handleSubmit - function of redux-form, argument this.onSubmit is from helper
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        //only run if the user did not enter the input
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }
    return errors;
}

//hooked up reduxForm
//reduxForm function is similer syntax as connect - reduxFrom returns function() and immediately call the function (StreamCreate)
//reduxForm takes single object - string of name of the form
//export default connect()(reduxForm({ form: 'streamCreate', validate})(StreamCreate))

export default reduxForm({ form: 'streamForm', validate})(StreamForm);


