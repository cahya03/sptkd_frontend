import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const FormEditPenilaian = () => {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    header_penilaian_nama: "",
    mahasiswa_nama: "",
    pejabat_nama: "",
    penilaian_nilai: "",
    indikator_nama: "",
  });
  const [message, setMessage] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const getPenilaianById = async () => {
      try {
        const response = await axios.get(`${base_url}/api/penilaian/${id}`);
        const {
          header_penilaian_nama,
          mahasiswa_nama,
          pejabat_nama,
          penilaian_nilai,
          indikator_nama,
        } = response.data;
        setFormData({
          header_penilaian_nama,
          mahasiswa_nama,
          pejabat_nama,
          penilaian_nilai,
          indikator_nama,
        });
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        }
      }
    };
    getPenilaianById();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.patch(
        `${base_url}/api/penilaian/${id}`,
        formData
      );
      setMessage(response.data.message);
      // navigate("/penilaian")
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  }
  return (
<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Penilaian</h1>
      <h2 className="text-2xl mb-4 font-semibold">Edit Penilaian</h2>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <table className="table-auto w-full mb-6 border-collapse border border-gray-300">
          <tbody>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border border-gray-300">Header Penilaian</td>
              <td className="px-4 py-2 border border-gray-300 font-bold">{formData.header_penilaian_nama}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Nama Mahasiswa</td>
              <td className="px-4 py-2 border border-gray-300 font-bold">{formData.mahasiswa_nama}</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border border-gray-300">Nama Pejabat</td>
              <td className="px-4 py-2 border border-gray-300 font-bold">{formData.pejabat_nama}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Indikator</td>
              <td className="px-4 py-2 border border-gray-300 font-bold">{formData.indikator_nama}</td>
            </tr>
            <tr className="bg-gray-200">
              <td className="px-4 py-2 border border-gray-300">Nilai</td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex space-x-4 justify-center">
                  {[1, 2, 3, 4].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <input
                        type="radio"
                        className="mb-1"
                        name="penilaian_nilai"
                        value={value}
                        checked={formData.penilaian_nilai === value}
                        onChange={handleChange}
                      />
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300"></td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormEditPenilaian;
