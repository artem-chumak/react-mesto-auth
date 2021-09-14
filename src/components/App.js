// todo 1. Добавить спинер на первую загрузку
// todo 2. Поменять фавикон
// todo 3. Валидация форм
///// todo 4. Окно удаления карточки
// todo 5. Очистка форм после сабмита
// todo 6. Прописать пути Router для сайта. Страница 404.
// todo 7. Поменять экспорты. Убрать дефолтные.
// todo 8. Настроить ключ, чтобы не вводить пороль каждый раз ssh.
// todo 9. Сделать автоматическое форматирование кода.
// todo 10. Аутентификация.
// todo 11. React from react. Is it need for work? Check every comps.

import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import MenuMobile from "./MenuMobile";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    id_: "",
  });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [deletedCard, setDeletedCard] = useState({ name: "", link: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });
  const history = useHistory();
  const [isDataSet, setIsDataSet] = useState(false);
  const [infoToolTipData, setInfoToolTipData] = useState({
    title: "Что-то пошло не так! Попробуйте ещё раз.",
    icon: false,
  });
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    isMenuOpen
    ? setIsMenuOpen(false)
    : setIsMenuOpen(true)
  }
 
  const handleInfoToolTip = () => {
    setIsInfoToolTipOpen(true);
  }

  useEffect(() => {
    api
      .getAllneededData()
      .then((res) => {
        const [cards, userInfo] = res;
        setCards(cards);
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const closeByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  // Card
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .setDelete(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardDeleteClick = (card) => {
    setDeletedCard(card);
  };

  // Popups
  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  };
  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  };
  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setDeletedCard({ name: "", link: "" });
    setIsInfoToolTipOpen(false);
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    setIsLoading(true);
    api
      .setCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserData({ email: email });
          setLoggedIn(true);
          setIsMenuOpen(false);
          history.push("/");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then(() => {
        setIsDataSet(true);
        history.push("/sign-in");
        setInfoToolTipData({
          icon: true,
          title: "Вы успешно зарегистрировались!",
        });
        handleInfoToolTip();
      })
      .catch(() => {
        setIsDataSet(false);
        setInfoToolTipData({
          icon: false,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoToolTip();
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({ email: "" });
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {loggedIn && <MenuMobile
        email={userData.email}
        handleLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        />}

        <Header handleLogout={handleLogout} email={userData.email} handleMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            handleEditProfileClick={onEditProfile}
            handleAddPlaceClick={onAddPlace}
            handleEditAvatarClick={onEditAvatar}
            handleCardClick={handleCardClick}
            handleCardDeleteClick={handleCardDeleteClick}
            cards={cards}
            onCardLike={handleCardLike}
            component={Main}
          />

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} isDataSet={isDataSet} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onCloseOverlay={closeByOverlayClick}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onCloseOverlay={closeByOverlayClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onCloseOverlay={closeByOverlayClick}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlayClick}
        />
        <DeleteConfirmPopup
          card={deletedCard}
          onClose={closeAllPopups}
          onCloseOverlay={closeByOverlayClick}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <InfoToolTip
          onCloseOverlay={closeByOverlayClick}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          title={infoToolTipData.title}
          icon={infoToolTipData.icon}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
