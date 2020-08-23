import React from "react"
import Select from "react-select"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import PropTypes from "prop-types"
import { addPost, updatePost } from "../redux/posts/posts.actions"

const schema = yup.object({
  title: yup.string().required("Title is required"),
  categories: yup.array().nullable(),
  body: yup.string(),
})

function PostForm({
  addPost,
  updatePost,
  edit,
  onSave,
  post,
  onCancelAdd,
  onCancelEdit,
  openCategoryModal,
}) {
  const { categories } = useSelector((state) => state.categoriesStore)

  const getOptions = () => {
    const options = categories.map((category) => ({
      value: category.id,
      label: category.name,
    }))

    return [
      { value: "createCategory", label: "Create New Category" },
      ...options,
    ]
  }

  const handleSubmit = async (values) => {
    const isValid = await schema.validate(values)
    if (!isValid) {
      return
    }

    if (!edit) {
      addPost(values)
    } else {
      updatePost(post.id, values)
    }

    onSave()
  }
  console.log({ categories: post.categories })
  const formik = useFormik({
    initialValues: {
      title: post.title,
      body: post.body,
      categories: post.categories,
    },
    onSubmit: handleSubmit,
  })

  const handleChange = (selectedOption) => {
    const selectedValues = selectedOption.map(({ value }) => value)

    if (selectedValues.includes("createCategory")) {
      openCategoryModal()
      return
    }

    formik.setFieldValue("categories", selectedOption)
  }

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
              isInvalid={formik.touched.title && formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="categories">
            <Form.Label>Categories</Form.Label>
            <Select
              isMulti
              name="categories"
              value={formik.values.categories}
              onChange={handleChange}
              options={getOptions()}
            />
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
              isInvalid={formik.touched.body && formik.errors.body}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
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
