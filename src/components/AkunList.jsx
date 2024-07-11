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
    <div>
      <h1 className="text-3xl font-bold">Akun</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Akun</h2>
      <Link to="/akun/add" className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-l">Add New</Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {akun.map((akun, index) => (
            <tr key={akun.akun_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{akun.akun_username}</td>
              <td className="border px-4 py-2 text-center">{akun.akun_email}</td>
              <td className="border px-4 py-2 text-center">{akun.level.akun_level_nama}</td>
              <td className="border px-4 py-2 text-center flex justify-center">
                <Link
                  to={`/akun/edit/${akun.akun_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteAkun(akun.akun_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-l"
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
