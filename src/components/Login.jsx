import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAkun, reset } from "../features/authSlice";

const Login = () => {
  const [formData, setformData] = useState({
    akun_email: "",
    akun_password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { akun, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (akun || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [akun, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    if (!formData.akun_email || !formData.akun_password) {
      setErrorMessage("Email dan Password harus diisi.");
      return;
    }
    setErrorMessage("");
    dispatch(LoginAkun(formData));
  };
  return (
    <div>
      <section className="h-screen w-full flex items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 xl:w-1/4 p-4">
              <form
                onSubmit={Auth}
                className="bg-white shadow-md  rounded px-8 pt- pb-8 m-4"
              >
                {isError && (
                  <p className="text-center text-red-500">{message}</p>
                )}
                {errorMessage && (
                  <p className="text-center text-red-500">{errorMessage}</p>
                )}
                <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Email"
                    name="akun_email"
                    value={formData.akun_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Password"
                    name="akun_password"
                    value={formData.akun_password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
