import { useState } from "react"

function useModal(openAddModalDefault = false, openEditModalDefault = false) {
  const [openAddModal, setOpenAddModal] = useState(openAddModalDefault)
  const [openEditModal, setOpenEditModal] = useState(openEditModalDefault)

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

  return {
    openAddModal,
    openEditModal,
    openModal,
    closeModal,
    cancelAddModal,
    setOpenAddModal,
    setOpenEditModal,
  }
}

export default useModal
