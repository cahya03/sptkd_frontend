import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AkunList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [akun, setAkun] = useState([]);

  useEffect(() => {
    listAkun();
  }, []);

  const listAkun = async () => {
    const response = await axios.get(`${base_url}/api/akun`);
    setAkun(response.data);
  };

  const deleteAkun = async (akun_id) => {
    await axios.delete(`${base_url}/api/akun/${akun_id}`);
    listAkun();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Akun</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Akun</h2>
      <Link
        to="/akun/add"
        className="mb-4 inline-block bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Add New
      </Link>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-center border border-gray-300">No</th>
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Role</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {akun.map((akun, index) => (
            <tr key={akun.akun_id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {akun.akun_username}
              </td>
              <td className="border px-4 py-2 text-center">
                {akun.akun_email}
              </td>
              <td className="border px-4 py-2 text-center">
                {akun.level.akun_level_nama}
              </td>
              <td className="border px-4 py-2 text-center flex justify-center space-x-2">
                <Link
                  to={`/akun/edit/${akun.akun_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteAkun(akun.akun_id)}
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

export default AkunList;
