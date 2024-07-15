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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Header Penilaian</h1>
      <h2 className="text-2xl mb-6 font-semibold">List of Header Penilaian</h2>
      <Link
        to="/headerpenilaian/add"
        className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg mb-4 inline-block"
      >
        Add New
      </Link>
      <table className="table-auto min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-center border-gray-300">
              No
            </th>
            <th className="px-6 py-3 text-center border-gray-300">
              Nama
            </th>
            <th className="px-6 py-3 text-center border-gray-300">
              Deskripsi
            </th>
            <th className="px-6 py-3 text-center border-gray-300">
              Tanggal Mulai
            </th>
            <th className="px-6 py-3 text-center border-gray-300">
              Tanggal Selesai
            </th>
            <th className="px-6 py-3 text-center border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {header_penilaian.map((header_penilaian, index) => (
            <tr
              key={header_penilaian.header_penilaian_id}
              className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white"}
            >
              <td className="border px-6 py-4 text-center text-sm font-medium">
                {index + 1}
              </td>
              <td className="border px-6 py-4 text-center text-sm">
                {header_penilaian.header_penilaian_nama}
              </td>
              <td className="border px-6 py-4 text-center text-sm">
                {header_penilaian.header_penilaian_nama}
              </td>
              <td className="border px-6 py-4 text-center text-sm">
                {new Date(
                  header_penilaian.header_penilaian_tanggal_mulai
                ).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="border px-6 py-4 text-center text-sm">
                {new Date(
                  header_penilaian.header_penilaian_tanggal_selesai
                ).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td className="border px-6 py-4 text-center text-sm flex justify-center space-x-2">
                <Link
                  to={`/header_penilaian/edit/${header_penilaian.header_penilaian_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    deleteHeaderPenilaian(header_penilaian.header_penilaian_id)
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
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
