import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function IndikatorList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [indikator, setIndikator] = useState([]);

  useEffect(() => {
    listIndikator();
  }, []);

  const listIndikator = async () => {
    const response = await axios.get(`${base_url}/api/indikator`);
    setIndikator(response.data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Indikator</h1>
      <h2 className="text-2xl font-semibold mb-6">
        List of Indikator
      </h2>
      <table className="table-auto min-w-full border-collapse border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left border border-gray-300">
              No
            </th>
            <th className="px-6 py-3 text-left border border-gray-300">
              Kelompok Indikator
            </th>
            <th className="px-6 py-3 text-left border border-gray-300">
              Indikator
            </th>
            <th className="px-6 py-3 text-left border border-gray-300">
              Bobot
            </th>
          </tr>
        </thead>
        <tbody>
          {indikator.map((item, index) => (
            <tr
              key={item.indikator_id}
              className={`border-b hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {item.kelompok_indikator.kelompok_indikator_nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {item.indikator_nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {item.indikator_bobot}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IndikatorList;
