import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import NewCourseForm from './NewCourseForm'

function NewCourseModal() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button onClick={handleShow}>
          Add course
        </Button>
  
        <Modal centered show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Add a new course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewCourseForm closeModal={handleClose}/>
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default NewCourseModal;