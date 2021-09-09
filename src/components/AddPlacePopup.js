import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onCloseOverlay, isLoading }) => {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name={"add-place"}
      title={"Новое место"}
      buttonText={ isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        ref={nameRef}
        className="popup__input"
        id="title"
        type="text"
        placeholder="Название"
        name="name"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error" id="title-error">
        Mistake
      </span>
      <input
        ref={linkRef}
        className="popup__input"
        id="link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__input-error" id="link-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
