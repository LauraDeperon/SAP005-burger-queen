import React from 'react';
import ImageBF from '../../assets/Logo_Burger-Beef-black.png';
import IconClose from '../../assets/x-mark.png';
import './ModalError.css';

function ModalCadastro({ id = 'modal', onClose = () => {}, children }) {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <section id="modal" className="modalDialog" onClick={handleOutsideClick}>
      <div className="body-modal">
        <div className="container-close">
          <img src={IconClose} onClick={onClose} />
        </div>
        <img src={ImageBF} className="logo-modal" />
        <div>{children}</div>
      </div>
    </section>
  );
}

export default ModalCadastro;
