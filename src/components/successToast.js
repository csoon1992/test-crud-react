import { Toast, ToastContainer } from 'react-bootstrap';
import React, { useState } from 'react';

export const SuccessToast = React.memo(function SuccessToast({ children }) {
  const [showing, setShowing] = useState(true);

  return (
    <ToastContainer className="p-3" position="top-center">
      <Toast onClose={() => setShowing(false)} show={showing} autohide bg="success">
        <Toast.Header>Success!</Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
});
