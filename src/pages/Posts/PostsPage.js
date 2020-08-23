import React, { useState } from "react"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
import { createStructuredSelector } from "reselect"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Modal from "react-bootstrap/Modal"
import PostForm from "../../components/PostForm"
import CategoryForm from "../../components/CategoryForm"
import { deletePost } from "../../redux/posts/posts.actions"
import { selectAllPosts } from "../../redux/posts/posts.selector"
import useModal from "../../hooks/useModal"

function PostsPage({ deletePost }) {
  const { posts } = useSelector(
    createStructuredSelector({ posts: selectAllPosts })
  )
  const {
    openAddModal,
    openEditModal,
    openModal,
    closeModal,
    cancelAddModal,
    setOpenEditModal,
  } = useModal(false, false)
  const {
    openAddModal: openCategoryAddModal,
    openModal: openCategoryModal,
    closeModal: closeCategoryModal,
    cancelAddModal: cancelCategoryAddModal,
  } = useModal(false, false)

  const [selectedPost, setSelectedPost] = useState({})

  const editPost = (post) => {
    setSelectedPost(post)
    setOpenEditModal(true)
  }

  const cancelEditModal = () => {
    setOpenEditModal(false)
  }

  const deleteSelectedContact = (postId) => {
    deletePost(postId)
  }

  const handleNewCategoryAdd = (values) => {
    setSelectedPost({
      ...selectedPost,
      categories: [
        ...selectedPost.categories,
        { label: values.name, value: values.id },
      ],
    })
  }

  return (
    <div className="posts-page">
      <h1>Posts</h1>
      <ButtonToolbar>
        <Button onClick={openModal} variant="outline-primary">
          Add Post
        </Button>
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
                  className="posts-page__edit-btn"
                  variant="outline-primary"
                  onClick={() => editPost(post)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => deleteSelectedContact(post.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </React.Fragment>
        ))}
      </div>
      <Modal show={openAddModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm
            edit={false}
            onSave={closeModal.bind(this)}
            onCancelAdd={cancelAddModal}
            openCategoryModal={openCategoryModal}
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
            post={selectedPost}
            onCancelEdit={cancelEditModal}
            openCategoryModal={openCategoryModal}
          />
        </Modal.Body>
      </Modal>
      <Modal show={openCategoryAddModal} onHide={closeCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            onNewCategoryAdd={handleNewCategoryAdd}
            edit={false}
            onSave={closeCategoryModal}
            onCancelAdd={cancelCategoryAddModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deletePost: (postId) => dispatch(deletePost(postId)),
})

export default connect(undefined, mapDispatchToProps)(PostsPage)
