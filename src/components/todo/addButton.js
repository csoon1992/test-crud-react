import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { TodoForm } from './todoForm';
import { useAddTodoMutation } from '../../state/api/todosSlice';
import { SuccessToast } from '../successToast';

export function AddTodoButton() {
  const [show, setShow] = useState(false);
  const [saveTodo, { isSuccess }] = useAddTodoMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isSuccess && <SuccessToast>Todo saved!</SuccessToast>}
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoForm onSubmit={saveTodo} formId="addTodo" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit" form="addTodo">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
