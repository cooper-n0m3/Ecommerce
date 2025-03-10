import React, { useState } from "react";
import Modal from "./ModalDialogCompo";
/* When Clicking buy */
function ModalDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Title</h2>
        <p>This is a simple modal dialog example with React and Framer Motion.</p>
        <button onClick={closeModal} style={{ padding: "10px 20px", marginTop: "10px" }}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default ModalDialog;
