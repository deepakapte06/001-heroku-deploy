// SurveyForms shows a form for a auser to add inputs
import _ from 'lodash';
import React , {Component} from 'react';
import {reduxForm,Field} from 'redux-form'; // helps reduxForm Helper help redux-form to communite to the  reduxStore ;Field - anytype of html form element
import {Link} from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from './../../utils/validateEmails'
import formFields from './formFields'

//     <Field label="Survey Title" type ="text" name="title" component={SurveyField}/>
//<Field label="Subject Line" type ="text" name="subject" component={SurveyField}/>
//<Field label="Email Body" type ="text" name="body" component={SurveyField}/>
//<Field label="Recipent List" type ="text" name="emails" component={SurveyField}/>


//
//if(!values.title){
 //   errors.title ='you must provide a Title';
//}
//if(!values.subject){
//    errors.subject ='you must provide a Subject';
//}
//if(!values.body){
//    errors.body ='you must provide an Email Body';
//}


class SurveyForm extends Component{
renderFields(){
    return _.map(formFields,({label,name})=>{
        return (<Field key={name} component={SurveyField} type="text" label={label} name={name} />)
    })
    
}

    render(){
        return (
            <div>
               
                <form 
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
               {this.renderFields()}
               <Link to="/surveys" className="red btn-flat white-text">Cancle</Link>
        <button
        className="teal btn-flat right white-text"
        type="submit">Next <i className="material-icons right">done</i></button>
        </form>
            </div>
        );
    }
}

//redux form validation.
function validate(values){
const errors ={};

errors.recipients = validateEmails(values.recipients || '')
_.each(formFields,({name})=>{
    if(!values[name]){
        errors[name]='You much Provide a Value'
    }
})


return errors;
}

export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm);