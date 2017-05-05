import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error? 'has-danger':''}`;
    return (
      <div className={className}>
        <label>{field.myLabel}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched?error:""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" myLabel="Title" component={this.renderField} />
        <Field name="categories"  myLabel="Categories"  component={this.renderField} />
        <Field name="content" myLabel="Post Content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some categories";
  }
  //if errors is empty, the form validation is passed
  //if errors has any properties, the form is invalid
  return errors;
}


export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost }) (PostsNew)
);
