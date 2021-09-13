import React from 'react';
import logo from "../images/Succeed-icon.svg";

const InfoToolTip = (/*{ isOpen, onClose, title, icon }*/) => {

  return (
    <section
      // onClick={onCloseOverlay}
      className="popup popup_type_input popup_opened"
      //   ? "popup popup_type_input popup_opened"
      //   : "popup popup_type_input"}
    >
      <div className="popup__container popup__container_type_notification">
        <img className="popup__icon" src={logo} alt="Иконка" />
        <h2 className="popup__notification">Вы успешно зарегистрировались!</h2>
        <button
          // onClick={onClose}
          className="button popup__exit-button"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </section>
    
    /* <div className="modal_is-open">
        <div className="modal__container modal__container_type_tooltip">
          <span
            className="modal__close-btn"
            onClick={onClose} />
          {icon ? <SucceedIcon /> : <ErrorIcon />}
          <h2 className="modal__title modal__title_type_tooltip">{title}</h2>
        </div>
      </div> */
  );
};

export default InfoToolTip;