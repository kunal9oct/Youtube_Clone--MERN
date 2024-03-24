import React from "react";
import "./Auth.css";
import { GoogleLogout } from "react-google-login";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import { Link, useNavigate } from "react-router-dom";

function Auth({ User, setAuthBtn, setEditCreateChannelBtn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    localStorage.removeItem("Profile");
    dispatch(setCurrentUser(null));
    alert("Log Out SuccessFully");
    navigate("/");
  };

  return (
    <div className="Auth_container" onClick={() => setAuthBtn(false)}>
      <div className="Auth_container2">
        <p className="User_Details">
          <>
            {User?.result.avatarImgURL || User?.result.profileImgURL ? (
              <div
                className="flex-center gap-3"
                onClick={() => setAuthBtn(true)}
              >
                <img
                  src={
                    User?.result.avatarImgURL ||
                    (User?.result.profileImgURL &&
                      `https://youtube-clone-4ea3.onrender.com/uploads/images/${User?.result.profileImgURL}`)
                  }
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            ) : (
              <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
                <p className="fstChar_logo_App">
                  {User?.result.name ? (
                    <>{User?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{User?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            )}
          </>
          <div className="email_Auth">{User?.result.email}</div>
        </p>
        <div className="btns_Auth">
          {User?.result.name ? (
            <>
              {
                <Link to={`/channel/${User?.result._id}`} className="btn_Auth">
                  Your Channel
                </Link>
              }
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn_Auth"
                value="Create Your Channel"
                onClick={() => setEditCreateChannelBtn(true)}
              />
            </>
          )}
          <Link
            to={`/editProfile/${User?.result._id}`}
            className="no-underline text-white btn_Auth"
          >
            Edit Profile Photo
          </Link>
          <div>
            <GoogleLogout
              clientId={
                "71451398084-k3q9qhmoihdkmllbql5e65ruipc6pvh6.apps.googleusercontent.com"
              }
              onLogoutSuccess={onLogoutSuccess}
              render={(renderProps) => (
                <div onClick={renderProps.onClick} className="btn_Auth">
                  <BiLogOut />
                  Logout
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
