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
    <div>
      <h1 className="text-3xl font-bold">Mahasiswa</h1>
      <h2 className="text-2xl mb-4 font-semibold">List of Mahasiswa</h2>
      <Link to="/akun/add" className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded-l">Add New</Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2">NIM</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Tanggal Lahir</th>
            <th className="px-4 py-2">Peleton</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mahasiswa, index) => (
            <tr key={mahasiswa.mahasiswa_id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{mahasiswa.mahasiswa_nim}</td>
              <td className="border px-4 py-2 text-center">{mahasiswa.mahasiswa_nama}</td>
              <td className="border px-4 py-2 text-center">{new Date(mahasiswa.mahasiswa_tanggallahir).toLocaleDateString('id-ID',{
                year: 'numeric',
                month: 'long',
                day:'numeric'               
              })}</td>
              <td className="border px-4 py-2 text-center">{mahasiswa.peleton.peleton_nama}</td>
              <td className="border px-4 py-2 text-center flex justify-center">
                <Link
                  to={`/mahasiswa/edit/${mahasiswa.mahasiswa_id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMahasiswa(mahasiswa.mahasiswa_id)}
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

export default MahasiswaList;
