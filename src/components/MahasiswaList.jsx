import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MahasiswaList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    listMahasiswa();
  }, []);

  const listMahasiswa = async () => {
    const response = await axios.get(`${base_url}/api/mahasiswa`);
    setMahasiswa(response.data);
  };

  const deleteMahasiswa = async (mahasiswa_id) => {
    await axios.delete(`${base_url}/api/mahasiswa/${mahasiswa_id}`);
    listMahasiswa();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Mahasiswa</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Mahasiswa</h2>
      <Link
        to="/mahasiswa/add"
        className="mb-4 inline-block bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Add New
      </Link>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center border border-gray-300">No</th>
            <th className="px-4 py-2 border border-gray-300">NIM</th>
            <th className="px-4 py-2 border border-gray-300">Nama</th>
            <th className="px-4 py-2 border border-gray-300">Tanggal Lahir</th>
            <th className="px-4 py-2 border border-gray-300">Peleton</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((item, index) => (
            <tr key={item.mahasiswa_id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {item.mahasiswa_nim}
              </td>
              <td className="border px-4 py-2 text-center">
                {item.mahasiswa_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(item.mahasiswa_tanggallahir).toLocaleDateString(
                  "id-ID",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {item.peleton.peleton_nama}
              </td>
              <td className="border px-4 py-2 text-center flex justify-center space-x-2">
                <Link
                  to={`/mahasiswa/edit/${item.mahasiswa_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMahasiswa(item.mahasiswa_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MahasiswaList;
