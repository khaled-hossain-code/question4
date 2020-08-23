import React, { useReducer } from "react"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { createStructuredSelector } from "reselect"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import PostForm from "../../components/PostForm"
import { removePost } from "../../redux/posts/posts.actions"
import { selectAllPosts } from "../../redux/posts/posts.selector"

function PostsPage({ removePost }) {
  const { posts } = useSelector(
    createStructuredSelector({ posts: selectAllPosts })
  )
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedContact, setSelectedContact] = useState({})

  const openModal = () => {
    setOpenAddModal(true)
  }

  const closeModal = () => {
    setOpenAddModal(false)
    setOpenEditModal(false)
  }

  const cancelAddModal = () => {
    setOpenAddModal(false)
  }

  const editContact = (contact) => {
    setSelectedContact(contact)
    setOpenEditModal(true)
  }

  const cancelEditModal = () => {
    setOpenEditModal(false)
  }

  const deleteSelectedContact = (postId) => {
    removePost(postId)
  }

  return (
    <div className="posts-page">
      <h1>Posts</h1>
      <Modal show={openAddModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm
            edit={false}
            onSave={closeModal.bind(this)}
            onCancelAdd={cancelAddModal}
          />
        </Modal.Body>
      </Modal>
      <Modal show={openEditModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm
            edit={true}
            onSave={closeModal.bind(this)}
            contact={selectedContact}
            onCancelEdit={cancelEditModal}
          />
        </Modal.Body>
      </Modal>
      <ButtonToolbar onClick={openModal}>
        <Button variant="outline-primary">Add Post</Button>
      </ButtonToolbar>
      <br />
      <div className="posts-page__posts">
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <Card className="post__card">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={editContact.bind(this, post)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={deleteSelectedContact.bind(this, post.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  removePost: (postId) => dispatch(removePost(postId)),
})

export default connect(undefined, mapDispatchToProps)(PostsPage)
