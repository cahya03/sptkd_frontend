import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HeaderPenilaianList() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [header_penilaian, setHeader_penilaian] = useState([]);

  useEffect(() => {
    listHeaderPenilaian();
  }, []);

  const listHeaderPenilaian = async () => {
    const response = await axios.get(`${base_url}/api/headerpenilaian`);
    setHeader_penilaian(response.data);
  };

  const deleteHeaderPenilaian = async (header_penilaian_id) => {
    await axios.delete(
      `${base_url}/api/headerpenilaian/${header_penilaian_id}`
    );
    listHeaderPenilaian();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Header Penilaian</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Header Penilaian</h2>
      <Link
        to="/headerpenilaian/add"
        className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-l"
      >
        Add New
      </Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Deskripsi</th>
            <th className="px-4 py-2">Tanggal Mulai</th>
            <th className="px-4 py-2">Tanggal Selesai</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {header_penilaian.map((header_penilaian, index) => (
            <tr key={header_penilaian.header_penilaian_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {header_penilaian.header_penilaian_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {header_penilaian.header_penilaian_nama}
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(
                  header_penilaian.header_penilaian_tanggal_mulai
                ).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="border px-4 py-2 text-center">
                {new Date(
                  header_penilaian.header_penilaian_tanggal_selesai
                ).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>

              <td className="border px-4 py-2 text-center flex justify-center">
                <Link
                  to={`/header_penilaian/edit/${header_penilaian.header_penilaian_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteHeaderPenilaian(header_penilaian.header_penilaian_id)}
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

export default HeaderPenilaianList;
