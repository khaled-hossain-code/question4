import React, { useReducer } from "react"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import PropTypes from "prop-types"
import { addPost, updatePost } from "../redux/posts/posts.actions"

const schema = yup.object({
  title: yup.string().required("Title is required"),
  categories: yup.string().required("Categories is required"),
  body: yup.string(),
})

function PostForm({
  addPost,
  updatePost,
  edit,
  onSave,
  setContacts,
  post,
  onCancelAdd,
  onCancelEdit,
}) {
  const COUNTRIES = ["Bangladesh", "USA"]
  const handleSubmit = async (values) => {
    const isValid = await schema.validate(values)
    if (!isValid) {
      return
    }
    console.log({ edit })
    if (!edit) {
      console.log("adding post")
      addPost(values)
    } else {
      console.log("updating post")
      updatePost(post.id, values)
    }

    onSave()
  }

  const formik = useFormik({
    initialValues: {
      title: post.title,
      body: post.body,
      categories: "Bangladesh",
    },
    onSubmit: handleSubmit,
  })

  return (
    <div className="form">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="firstName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="post title"
              value={formik.values.title}
              onChange={formik.handleChange}
              // isInvalid={touched.title && errors.title}
            />
            {/* <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback> */}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="categories">
            <Form.Label>Categories</Form.Label>
            <Form.Control
              as="select"
              placeholder="Add Categories"
              name="categories"
              onChange={formik.handleChange}
              value={formik.values.categories}
              // isInvalid={touched.categories && errors.categories}
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Control>
            {/* <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md="12" controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Post Body"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              // isInvalid={touched.body && errors.body}
            />
            {/* <Form.Control.Feedback type="invalid">
              {errors.body}
            </Form.Control.Feedback> */}
          </Form.Group>
        </Form.Row>
        <Button type="submit" style={{ marginRight: "10px" }}>
          Save
        </Button>
        <Button type="button" onClick={edit ? onCancelEdit : onCancelAdd}>
          Cancel
        </Button>
      </Form>
    </div>
  )
}

PostForm.defaultProps = {
  post: {
    title: "",
    body: "",
    categories: [],
  },
}

PostForm.propTypes = {
  edit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancelAdd: PropTypes.func,
  onCancelEdit: PropTypes.func,
  post: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (newPostData) => dispatch(addPost(newPostData)),
  updatePost: (postId, updatedPostData) =>
    dispatch(updatePost(postId, updatedPostData)),
})

export default connect(undefined, mapDispatchToProps)(PostForm)
