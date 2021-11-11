import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    transform: "translate(-50%, -50%)",
    // height: "60vh",
    // width: "70vw",
  },
};
const ModalComponent = ({ isOpen, setIsOpen, modalComponent }) => {
  console.log(modalComponent);
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      {modalComponent}
    </Modal>
  );
};

export default ModalComponent;
