import { Input } from "../../../Components/Input/Input";
import { useForm, FormProvider } from "react-hook-form";
import {
  email_validation,
  password_validation,
} from "../../../utils/inputValidations";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import { setCurrentUser } from "../../../actions/currentUser";

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm();
  const [loader, setLoader] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    setLoader(true);

    const newData = data;

    const signingIn = async () => {
      try {
        const response = await fetch("https://youtube-clone-4ea3.onrender.com/user/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });

        const data = await response.json();

        if (response.status === 200) {
          dispatch({ type: "AUTH", data });
          dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
          methods.reset();
          navigate("/");
        }

        if (response.status === 404) {
          alert(data.message);
        }

        if (response.status === 400) {
          alert(data.message);
        }

        if (response.status === 500) {
          alert(data.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log("Error: " + error.message);
        alert("Error: " + error.message);
      }
    };

    signingIn();
  });

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border-none";

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <FormProvider {...methods}>
      <div className="sm:w-420 flex-center flex-col text-white font-inter">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          autoComplete="off"
          className="flex flex-col gap-5 w-full mt-2"
        >
          <div className="flex flex-col items-center">
            <Link to={"/"}>
              <img
                src="/assets/images/YouTube_logo.png"
                alt="logo"
                width={125}
              />
            </Link>

            <h2 className="h3-bold md:h2-bold pt-2 sm:pt-0 mb-1">
              Log in to your account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
              Welcome back! Please enter your details
            </p>
          </div>

          <Input {...email_validation} />
          <Input {...password_validation} />

          <button
            onClick={onSubmit}
            className={`${buttonCSS} hover:bg-rose-700 hover:cursor-pointer text-light-1 flex gap-2 bg-rose-600 min-[900px]:w-11/12 min-[950px]:w-full`}
          >
            {loader ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Log in"
            )}
          </button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-rose-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};

export default SigninForm;
