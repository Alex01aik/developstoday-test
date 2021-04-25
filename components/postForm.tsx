import { Field, reduxForm, reset } from 'redux-form'
import { postNewPost } from '../redux/postReducer'
import styles from '../styles/PostForm.module.css'

let PostForm = (props) => {

  const onSubmit =
    (formValues: { title, body }, dispatch) => {
      if ( formValues.title && formValues.body ){
        dispatch(postNewPost(formValues))
        dispatch(reset('postForm'))
      }
    }

  return (
    <form
    className={styles.postForm}
      onSubmit={props.handleSubmit(onSubmit)}>
      <label
        htmlFor="title">
        Title
      </label>
      <Field
        name="title"
        component="input"
        type="text" />
      <label
        htmlFor="body">
        Description
      </label>
      <Field
        name="body"
        component="textarea"
        type="text" />
      <button
        type="submit">
        Add
      </button>
    </form>
  )
}

PostForm = reduxForm({
  form: 'postForm'
})(PostForm)

export default PostForm
