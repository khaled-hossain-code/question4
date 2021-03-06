import React from "react"
import { v4 as uuidv4 } from "uuid"
import { connect } from "react-redux"
import { useFormik } from "formik"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import * as yup from "yup"
import PropTypes from "prop-types"
import {
  addCategory,
  updateCategory,
} from "../redux/categories/categories.actions"

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string(),
})

function CategoryForm({
  addCategory,
  updateCategory,
  edit,
  onSave,
  category,
  onCancelAdd,
  onCancelEdit,
  onNewCategoryAdd,
}) {
  const handleSubmit = async (values) => {
    const isValid = await schema.validate(values)
    if (!isValid) {
      return
    }
    if (!edit) {
      values.id = uuidv4()
      addCategory(values)
      onNewCategoryAdd(values)
    } else {
      updateCategory(category.id, values)
    }

    onSave()
  }

  const formik = useFormik({
    initialValues: {
      name: category.name,
      description: category.description,
    },
    onSubmit: handleSubmit,
  })

  return (
    <div className="form">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="firstName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Category Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="body">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Category Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
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

CategoryForm.defaultProps = {
  category: {
    name: "",
    description: "",
  },
}

CategoryForm.propTypes = {
  edit: PropTypes.bool,
  onSave: PropTypes.func,
  onCancelAdd: PropTypes.func,
  onCancelEdit: PropTypes.func,
  category: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({
  addCategory: (newCategoryData) => dispatch(addCategory(newCategoryData)),
  updateCategory: (categoryId, updatedCategoryData) =>
    dispatch(updateCategory(categoryId, updatedCategoryData)),
})

export default connect(undefined, mapDispatchToProps)(CategoryForm)
