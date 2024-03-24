import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../actions/currentUser";

export default function PublicLayout({ setDisplay }) {
  setDisplay(false);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("Profile"));

  if (user) {
    dispatch(setCurrentUser(user));
  }

  return (
    <>
      <Outlet />
    </>
  );
}
