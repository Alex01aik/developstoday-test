import { Field, reduxForm, reset } from 'redux-form'
import { postNewComment } from '../redux/postReducer'
import styles from '../styles/CommentForm.module.css'
let CommentForm = (props) => {

  const onSubmit =
    (formValues: { body, postId }, dispatch) => {
      if ( formValues.body ){
        const commentData = {
          body: formValues.body,
          postId: props.post.id
        }
        dispatch(postNewComment(commentData))
        dispatch(reset('commentForm'))
      }
    }

  return (
    <form
    className={styles.commentForm}
      onSubmit={props.handleSubmit(onSubmit)}>
      <Field
        className={styles.commentBody}
        name="body"
        component="textarea"
        type="text" />
      <button
        className={styles.commentButton}
        type="submit">
        Add comment
      </button>
    </form>
  )
}

CommentForm = reduxForm({
  form: 'commentForm'
})(CommentForm)

export default CommentForm
