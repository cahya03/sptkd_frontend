import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormAddHeaderPenilaian() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [batalyon, setBatalyon] = useState([]);
  const [kompi, setKompi] = useState([]);
  const [peleton, setPeleton] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    header_penilaian_nama: "",
    header_penilaian_deskripsi: "",
    header_penilaian_tanggal_mulai: "",
    header_penilaian_tanggal_selesai: "",
    batalyon: "",
    kompi: "",
    peleton: "",
  });

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
    setFormData((prevFormData) => {
      if (
        name === "header_penilaian_tanggal_mulai" &&
        formData.header_penilaian_tanggal_selesai &&
        value > formData.header_penilaian_deskripsi
      ) {
        return {
          ...prevFormData,
          [name]: value,
          header_penilaian_tanggal_selesai: value,
        };
      } else if (
        name === "header_penilaian_tanggal_selesai" &&
        formData.header_penilaian_tanggal_mulai &&
        value < formData.header_penilaian_tanggal_mulai
      ) {
        alert("Tanggal selesai tidak boleh kurang dari tanggal mulai");
        return prevFormData;
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.header_penilaian_nama === "" ||
      formData.header_penilaian_deskripsi === "" ||
      formData.header_penilaian_tanggal_mulai === "" ||
      formData.header_penilaian_tanggal_selesai === ""
    ) {
      setMessage("Please fill all fields");
    }
    const formattedData = {
        header_penilaian_nama: formData.header_penilaian_nama,
        header_penilaian_deskripsi: formData.header_penilaian_deskripsi,
        header_penilaian_tanggal_mulai: new Date(formData.header_penilaian_tanggal_mulai).toISOString(),
        header_penilaian_tanggal_selesai: new Date(formData.header_penilaian_tanggal_selesai).toISOString(),
        peleton_id: formData.peleton,
    }
    try {
        const response = await axios.post(`${base_url}/api/headerpenilaian`, formattedData);
    } catch (error) {
        setMessage(error.response.data.message);
    }
  }
    return (
      <div>
        <h1 className="text-3xl font-bold">Header Penilaian</h1>
        <h2 className="text-2xl mb-4 font-semibold">
          Add New Header Penilaian
        </h2>
        <form onSubmit={handleSubmit}>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Nama Header
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Nama Header"
            name="header_penilaian_nama"
            value={formData.header_penilaian_nama}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Deskripsi Header
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Deskripsi Header"
            name="header_penilaian_deskripsi"
            value={formData.header_penilaian_deskripsi}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Tanggal Mulai
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Tanggal Mulai"
            name="header_penilaian_tanggal_mulai"
            value={formData.header_penilaian_tanggal_mulai}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-sm font-bold mb-2">
            Tanggal Selesai
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Tanggal Selesai"
            name="header_penilaian_tanggal_selesai"
            value={formData.header_penilaian_tanggal_selesai}
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
            {batalyon.map(
              (b, index) => (
                <option
                  key={`batalyon-${b.batalyon_id}-${index}`}
                  value={b.batalyon_id}
                >
                  {b.batalyon_nama}
                </option>
              )
            )}
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
            {peleton.map(
              (p, index) => (
                <option
                  key={`peleton-${p.peleton_id}-${index}`}
                  value={p.peleton_id}
                >
                  {p.peleton_nama}
                </option>
              )
            )}
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

export default FormAddHeaderPenilaian;
