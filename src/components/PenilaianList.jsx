import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PenilaianList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [penilaian, setPenilaian] = useState([]);

  useEffect(() => {
    listPenilaian();
  }, []);

  const listPenilaian = async () => {
    const response = await axios.get(`${base_url}/api/penilaian`);
    setPenilaian(response.data);
  };

  const deletePenilaian = async (penilaian_id) => {
    await axios.delete(`${base_url}/api/penilaian/${penilaian_id}`);
    listPenilaian();
  };
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Penilaian</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Penilaian</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-center border border-gray-300">No</th>
            <th className="px-4 py-2 border border-gray-300">Indikator</th>
            <th className="px-4 py-2 border border-gray-300">Pejabat</th>
            <th className="px-4 py-2 border border-gray-300">Mahasiswa</th>
            <th className="px-4 py-2 border border-gray-300">Nilai</th>
            <th className="px-4 py-2 border border-gray-300">
              Header Penilaian
            </th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {penilaian.map((penilaian, index) => (
            <tr key={penilaian.penilaian_id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {penilaian.indikator.indikator_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {penilaian.pejabat.pejabat_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {penilaian.mahasiswa.mahasiswa_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {penilaian.penilaian_nilai}
              </td>
              <td className="border px-4 py-2 text-center">
                {penilaian.header_penilaian.header_penilaian_nama}
              </td>
              <td className="border px-4 py-2 text-center flex justify-center space-x-2">
                <Link
                  to={`/penilaian/edit/${penilaian.penilaian_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePenilaian(penilaian.penilaian_id)}
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

export default PenilaianList;
