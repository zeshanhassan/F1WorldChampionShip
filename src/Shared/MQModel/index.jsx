import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
const MQModal = (props) => {
  const { onSave, onClose, modalHeader, modalClassName } = props;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    onClose();
    setShow(false);
  };
  const handleSave = () => {
    onSave(function (isValidForSave) {
      if (isValidForSave) {
        setShow(false);
      }
    });
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered={true}
      dialogClassName={modalClassName}
    >
      <Modal.Header >
        <Modal.Title>{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {onSave && (
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MQModal;
