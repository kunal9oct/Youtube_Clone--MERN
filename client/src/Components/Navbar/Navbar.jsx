import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "../SearchBar/SearchBar";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Auth from "../../Pages/Auth/Auth";

function Navbar({ toggleDrawer, setEditCreateChannelBtn, display }) {
  const [authBtn, setAuthBtn] = useState(false);
  const [mediaQuery, setMediaQuery] = useState(false);

  const CurrentUser = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "71451398084-k3q9qhmoihdkmllbql5e65ruipc6pvh6.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();

  const onSuccess = (response) => {
    const Email = response?.profileObj.email;
    dispatch(login({ email: Email }));
  };

  const onFailure = (response) => {
    console.log("Failure", response);
  };

  return (
    <>
      <div className={`Container_Navbar ${display ? "hidden" : "flex"}`}>
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>

          <Link to={"/"} className="logo_div_Navbar">
            <img src={logo} alt="Youtube logo" className="max-[580px]:w-11" />
            <p className="logo_title_navbar">Youtube</p>
          </Link>
        </div>

        <SearchBar setMediaQuery={setMediaQuery} mediaQuery={mediaQuery} />
        <RiVideoAddLine
          size={22}
          className={`vid_bell_Navbar ${mediaQuery && "hideThis_showSearch"}`}
        />
        <div className={`apps_Box ${mediaQuery && "hideThis_showSearch"}`}>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>
        <IoMdNotificationsOutline
          size={22}
          className={`vid_bell_Navbar ${mediaQuery && "hideThis_showSearch"}`}
        />

        <div className="Auth_cont_Navbar">
          {CurrentUser ? (
            <>
              {CurrentUser?.result.avatarImgURL ||
              CurrentUser?.result.profileImgURL ? (
                <div
                  className="flex-center gap-3"
                  onClick={() => setAuthBtn(true)}
                >
                  <img
                    src={
                      CurrentUser?.result.avatarImgURL ||
                      (CurrentUser?.result.profileImgURL &&
                        `https://youtube-clone-4ea3.onrender.com/uploads/${CurrentUser?.result?.profileImgURL}`)
                    }
                    alt="profile"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
              ) : (
                <div
                  className="Chanel_logo_App"
                  onClick={() => setAuthBtn(true)}
                >
                  <p className="fstChar_logo_App">
                    {CurrentUser?.result.name ? (
                      <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                    ) : (
                      <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                    )}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to={"/sign-in"} className="Auth_Btn mr-2 no-underline">
                <BiUserCircle size={22} />
                <b className="signIn_b">Sign in</b>
              </Link>

              <GoogleLogin
                clientId="71451398084-k3q9qhmoihdkmllbql5e65ruipc6pvh6.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                render={(renderProps) => (
                  <p onClick={renderProps.onClick} className="Auth_Btn">
                    <FcGoogle size={22} />
                    <b className="signIn_b">Google</b>
                  </p>
                )}
              />
            </>
          )}
        </div>
      </div>
      {authBtn && (
        <Auth
          setEditCreateChannelBtn={setEditCreateChannelBtn}
          setAuthBtn={setAuthBtn}
          User={CurrentUser}
        />
      )}
    </>
  );
}

export default Navbar;
