import React from "react"
import { connect } from "react-redux"
import { useState } from "react"
import { useSelector } from "react-redux"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import CategoryForm from "../../components/CategoryForm"
import { deleteCategory } from "../../redux/categories/categories.actions"
import useModal from "../../hooks/useModal"

function CategoriesPage({ deleteCategory }) {
  const { categories } = useSelector((state) => state.categoriesStore)
  const {
    openAddModal,
    openEditModal,
    openModal,
    closeModal,
    cancelAddModal,
    setOpenEditModal,
  } = useModal(false, false)
  const [selectedCategory, setSelectedCategory] = useState({})

  const editCategory = (category) => {
    setSelectedCategory(category)
    setOpenEditModal(true)
  }

  const cancelEditModal = () => {
    setOpenEditModal(false)
  }

  const deleteSelectedContact = (categoryId) => {
    deleteCategory(categoryId)
  }

  return (
    <div className="posts-page">
      <h1>Categories</h1>
      <Modal show={openAddModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            edit={false}
            onSave={closeModal}
            onCancelAdd={cancelAddModal}
          />
        </Modal.Body>
      </Modal>
      <Modal show={openEditModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            edit={true}
            onSave={closeModal.bind(this)}
            category={selectedCategory}
            onCancelEdit={cancelEditModal}
          />
        </Modal.Body>
      </Modal>
      <ButtonToolbar onClick={openModal}>
        <Button variant="outline-primary">Add Category</Button>
      </ButtonToolbar>
      <br />
      <div className="posts-page__posts">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>posts</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.posts}</td>
                <td style={{ width: "100px", textAlign: "center" }}>
                  <Button
                    style={{ margin: 0 }}
                    className="posts-page__edit-btn"
                    variant="outline-primary"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </Button>
                </td>
                <td style={{ width: "100px", textAlign: "center" }}>
                  <Button
                    style={{ margin: 0 }}
                    variant="outline-primary"
                    onClick={() => deleteSelectedContact(category.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
})

export default connect(undefined, mapDispatchToProps)(CategoriesPage)
