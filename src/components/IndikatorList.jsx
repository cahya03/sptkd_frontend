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
    <div>
      <h1 className="text-3xl font-bold">Indikator</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Indikator</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2">Kelompok Indikator</th>
            <th className="px-4 py-2">Indikator</th>
          </tr>
        </thead>
        <tbody>
          {indikator.map((indikator, index) => (
            <tr key={indikator.indikator_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{indikator.kelompok_indikator.kelompok_indikator_nama}</td>
              <td className="border px-4 py-2 text-center">{indikator.indikator_nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IndikatorList;
