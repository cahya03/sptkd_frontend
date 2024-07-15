import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PejabatList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [pejabat, setPejabat] = useState([]);

  useEffect(() => {
    listPejabat();
  }, []);

  const listPejabat = async () => {
    const response = await axios.get(`${base_url}/api/pejabat`);
    setPejabat(response.data);
  };

  const deletePejabat = async (pejabat_id) => {
    await axios.delete(`${base_url}/api/pejabat/${pejabat_id}`);
    listPejabat();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Pejabat</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Pejabat</h2>
      <Link
        to="/pejabat/add"
        className="mb-4 inline-block bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Add New
      </Link>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center border border-gray-300">No</th>
            <th className="px-4 py-2 border border-gray-300">NIP</th>
            <th className="px-4 py-2 border border-gray-300">Nama</th>
            <th className="px-4 py-2 border border-gray-300">Jabatan</th>
            <th className="px-4 py-2 border border-gray-300">Peleton</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {pejabat.map((pejabat, index) => (
            <tr key={pejabat.pejabat_id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {pejabat.pejabat_nip}
              </td>
              <td className="border px-4 py-2 text-center">
                {pejabat.pejabat_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {pejabat.pejabat_jabatan}
              </td>
              <td className="border px-4 py-2 text-center">
                {pejabat.peleton.peleton_nama}
              </td>
              <td className="border px-4 py-2 text-center flex justify-center space-x-2">
                <Link
                  to={`/pejabat/edit/${pejabat.pejabat_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePejabat(pejabat.pejabat_id)}
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

export default PejabatList;
