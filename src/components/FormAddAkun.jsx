import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddAkun = () => {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    akun_email: "",
    akun_password: "",
    akun_confPassword: "",
    akun_username: "",
    akun_level_id: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.akun_email === "" ||
      formData.akun_level_id === "" ||
      formData.akun_password === "" ||
      formData.akun_confPassword === "" ||
      formData.akun_username === ""
    ) {
      setMessage("Please fill all fields");
    }
    if (formData.akun_password !== formData.akun_confPassword) {
      setMessage("Password and Confirm Password must be same");
    } else {
      try {
        const response = await axios.post(`${base_url}/api/akun`, formData);
        const akun_level_id = formData.akun_level_id;
        localStorage.setItem("akun_id", response.data.akun_id);

        if (akun_level_id === "2") {
          navigate("/mahasiswa/add");
        } else if (akun_level_id === "3") {
          navigate("/pejabat/add");
        } else {
          navigate("/");
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Akun</h1>
      <h2 className="text-2xl mb-4 font-semibold">Add New Akun</h2>
      <form onSubmit={handleSubmit}>
        <p className="text-center font-extrabold  text-red-600">{message}</p>
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
            Username
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Username"
            name="akun_username"
            value={formData.akun_username}
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
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Confirm Password"
            name="akun_confPassword"
            value={formData.akun_confPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Akun Level
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            id="akun_level"
            name="akun_level_id"
            value={formData.akun_level_id}
            onChange={handleChange}
          >
            <option value="">Pilih Level Akun</option>
            <option value="1">Admin</option>
            <option value="2">Mahasiswa</option>
            <option value="3">Pejabat</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormAddAkun;
