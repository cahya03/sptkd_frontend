import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddMahasiswa = () => {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    akun_id: "",
    peleton_id: "",
    mahasiswa_tanggallahir: "",
    mahasiswa_nama: "",
    mahasiswa_nim: "",
    batalyon: "",
    kompi: "",
    peleton: "",
  });
  const [message, setMessage] = useState("");
  const [batalyon, setBatalyon] = useState([]);
  const [kompi, setKompi] = useState([]);
  const [peleton, setPeleton] = useState([]);

  //useEffect untuk fetch data batalyon
  useEffect(() => {
    console.log("Formdata: ", formData);
    axios
      .get(`${base_url}/api/batalyon`)
      .then((response) => {
        console.log("Batalyon data:", response.data);
        setBatalyon(response.data);
      })
      .catch((error) => console.log("Error fetching Batalyon: ", error));
  }, []);

  //useEffect untuk fetch data kompi
  useEffect(() => {
    if (formData.batalyon) {
      console.log("Formdata Batalyon: ", formData.batalyon);
      axios
        .get(`${base_url}/api/kompi/${formData.batalyon}`)
        .then((response) => {
          console.log("Kompi data: ", response.data);
          setKompi(response.data);
          setPeleton([]);
        })
        .catch((error) => console.log("Error fetching Kompi: ", error));
    } else {
      setKompi([]);
      setPeleton([]);
    }
  }, [formData.batalyon]);

  //useEffect untuk fetch data peleton
  useEffect(() => {
    if (formData.kompi) {
      console.log("Formdata Kompi: ", formData.kompi);
      axios
        .get(`${base_url}/api/peleton/${formData.kompi}`)
        .then((response) => {
          console.log("Peleton data:", response.data);
          setPeleton(response.data);
        })
        .catch((error) => console.log("Error fetching Peleton: ", error));
    } else {
      setPeleton([]);
    }
  }, [formData.kompi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.mahasiswa_tanggallahir === "" ||
      formData.mahasiswa_nama === "" ||
      formData.mahasiswa_nim === "" ||
      formData.peleton === ""
    ) {
      setMessage("Please fill all fields");
    } else {
      const formattedData = {
        akun_id: localStorage.getItem("akun_id"),
        peleton_id: formData.peleton,
        mahasiswa_tanggallahir: new Date(
          formData.mahasiswa_tanggallahir
        ).toISOString(),
        mahasiswa_nama: formData.mahasiswa_nama,
        mahasiswa_nim: formData.mahasiswa_nim,
      };
      console.log("Formatted Data: ", formattedData);
      try {
        const response = await axios.post(
          `${base_url}/api/mahasiswa`,
          formattedData
        );
        console.log("Response: ", response.data);
        navigate("/mahasiswa");
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Mahasiswa</h1>
      <h2 className="text-2xl mb-4 font-semibold">Add New Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Nama
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Nama"
            name="mahasiswa_nama"
            value={formData.mahasiswa_nama}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">NIM</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="NIM"
            name="mahasiswa_nim"
            value={formData.mahasiswa_nim}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Tanggal Lahir
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Tanggal Lahir"
            name="mahasiswa_tanggallahir"
            value={formData.mahasiswa_tanggallahir}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Batalyon
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            id="batalyon"
            name="batalyon"
            value={formData.batalyon}
            onChange={handleChange}
          >
            <option value="">Pilih Batalyon</option>
            {batalyon.map((b, index) => (
              <option
                key={`batalyon-${b.batalyon_id}-${index}`}
                value={b.batalyon_id}
              >
                {b.batalyon_nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Kompi
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            id="kompi"
            name="kompi"
            value={formData.kompi}
            onChange={handleChange}
            disabled={!formData.batalyon}
          >
            <option value="">Pilih Kompi</option>
            {kompi.map((k, index) => (
              <option key={`kompi-${k.kompi_id}-${index}`} value={k.kompi_id}>
                {k.kompi_kode}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Peleton
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            id="peleton"
            name="peleton"
            value={formData.peleton}
            onChange={handleChange}
            disabled={!formData.kompi}
          >
            <option value="">Pilih Peleton</option>
            {peleton.map((p, index) => (
              <option
                key={`peleton-${p.peleton_id}-${index}`}
                value={p.peleton_id}
              >
                {p.peleton_nama}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default FormAddMahasiswa;
