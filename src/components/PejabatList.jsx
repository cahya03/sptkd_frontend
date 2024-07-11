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
    <div>
      <h1 className="text-3xl font-bold">Pejabat</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Pejabat</h2>
      <Link to="/akun/add" className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-l">Add New</Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2">NIP</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Jabatan</th>
            <th className="px-4 py-2">Peleton</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {pejabat.map((pejabat, index) => (
            <tr key={pejabat.pejabat_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{pejabat.pejabat_nip}</td>
              <td className="border px-4 py-2 text-center">{pejabat.pejabat_nama}</td>
              <td className="border px-4 py-2 text-center">{pejabat.pejabat_jabatan}</td>
              <td className="border px-4 py-2 text-center">{pejabat.peleton.peleton_nama}</td>
              <td className="border px-4 py-2 text-center flex justify-center">
                <Link
                  to={`/pejabat/edit/${pejabat.pejabat_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePejabat(pejabat.pejabat_id)}
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

export default PejabatList;
