import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  onCloseOverlay,
  isLoading,
}) => {
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name={"edit-avatar"}
      title={"Обновить аватар"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        ref={avatarRef}
        className="popup__input"
        id="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
