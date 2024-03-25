import { useForm, FormProvider } from "react-hook-form";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { avatars } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import { setCurrentUser } from "../../actions/currentUser";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm();
  const [avatarURL, setAvatarURL] = useState(null);
  const [file, setFile] = useState(null);
  const [changeUI, setChangeUI] = useState(false);
  const [loader, setLoader] = useState(false);
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const onSubmit = methods.handleSubmit(() => {
    setLoader(true);

    const token = CurrentUser?.token;

    const formData = new FormData();
    if (avatarURL) {
      formData.append("avatarImgURL", avatarURL);
    }

    if (file) {
      formData.append("image", file);
    }

    if (!formData.has("image") && !formData.has("avatarImgURL")) {
      setLoader(false);
      alert("You have not changed any data");
      return;
    }

    const updatingProfile = async () => {
      try {
        const response = await fetch(
          `https://youtube-clone-4ea3.onrender.com/editProfile/${CurrentUser?.result._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        const user = { result: data.result, token };

        if (response.status === 200) {
          console.log("Success");
          localStorage.setItem("Profile", JSON.stringify(user));
          dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
          setChangeUI(false);
          methods.reset();
          navigate(-1);
        }

        if (response.status === 401) {
          alert(data.message);
        }

        if (response.status === 403) {
          alert(data.message);
        }

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(
          "status: " +
            error.status +
            " || " +
            "Error updating Profile: " +
            error.message
        );
        alert(
          "status: " +
            error.status +
            " || " +
            "Error updating Profile: " +
            error.message
        );
      }
    };

    updatingProfile();
  });

  const handleAvatarChange = async (imagePath) => {
    setChangeUI(true);
    setAvatarURL(imagePath);
    setFile(null);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setChangeUI(true);
      setAvatarURL(null);
      setFile(acceptedFiles[0]);
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  const buttonCSS =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border-none";

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!user) {
  //     navigate("/sign-in");
  //   }
  // }, []);

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <FormProvider {...methods}>
          <div className="flex flex-1 text-white font-inter">
            <div className="common-container">
              <div className="flex-start gap-3 justify-start w-full max-w-5xl">
                <img
                  src="/assets/icons/edit.svg"
                  width={36}
                  height={36}
                  alt="edit"
                  className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold text-left w-full">
                  Edit Profile Photo
                </h2>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                noValidate
                autoComplete="off"
                className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
              >
                <div className="space-y-2 flex">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} className="cursor-pointer" />

                    <div className="cursor-pointer flex-center gap-4">
                      {!CurrentUser?.result.avatarImgURL &&
                      !CurrentUser?.result.profileImgURL &&
                      !changeUI ? (
                        <div className="Chanel_logo_App h-24 w-24">
                          <p className="fstChar_logo_App text-6xl">
                            {CurrentUser?.result.name ? (
                              <>
                                {CurrentUser?.result.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </>
                            ) : (
                              <>
                                {CurrentUser?.result.email
                                  .charAt(0)
                                  .toUpperCase()}
                              </>
                            )}
                          </p>
                        </div>
                      ) : (
                        <img
                          src={`${
                            (!changeUI &&
                              (CurrentUser?.result.avatarImgURL ||
                                (CurrentUser?.result.profileImgURL &&
                                  `https://youtube-clone-4ea3.onrender.com/uploads/${CurrentUser?.result?.profileImgURL}`))) ||
                            avatarURL ||
                            (file && URL.createObjectURL(file))
                          }`}
                          alt="image"
                          className="h-24 w-24 rounded-full object-cover object-top"
                        />
                      )}

                      <p className="small-regular text-white md:base-semibold">
                        Change profile photo
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 my-2">
                  <span className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 shad-form_label">
                    Choose Avatar as Profile Photo
                  </span>
                  <div className="cursor-pointer flex flex-wrap items-center gap-4">
                    {avatars.map((avatar) => (
                      <img
                        key={avatar.alt}
                        src={avatar.imgURL}
                        alt={avatar.alt}
                        className="h-24 w-24 rounded-full object-cover object-top"
                        onClick={() => handleAvatarChange(avatar.imgURL)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 items-center justify-end">
                  <button
                    type="button"
                    className={`${buttonCSS} shad-button_dark_4 hover:cursor-pointer`}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className={`${buttonCSS} hover:bg-rose-700 hover:cursor-pointer text-light-1 flex gap-2 bg-rose-600`}
                    disabled={loader}
                  >
                    {loader ? <Loader /> : "Update Photo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditProfile;
