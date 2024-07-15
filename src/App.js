import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Akun from "./pages/Akun";
import AddAkun from "./pages/AddAkun";
import EditAkun from "./pages/EditAkun";
import Mahasiswa from "./pages/Mahasiswa";
import AddMahasiswa from "./pages/AddMahasiswa";
import EditMahasiswa from "./pages/EditMahasiswa"
import Pejabat from "./pages/Pejabat";
import AddPejabat from "./pages/AddPejabat";
import EditPejabat from "./pages/EditPejabat";
import Indikator from "./pages/Indikator";
import HeaderPenilaian from "./pages/HeaderPenilaian";
import AddHeaderPenilaian from "./pages/AddHeaderPenilaian";
import Me from "./pages/Me";
import Penilaian from "./pages/Penilaian";
import EditPenilaian from "./pages/EditPenilaian";
import Maut from "./pages/Maut";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/akun/add" element={<AddAkun />} />
          <Route path="/akun/edit/:id" element={<EditAkun />} />
          <Route path="/mahasiswa" element={<Mahasiswa />} />
          <Route path="/mahasiswa/add" element={<AddMahasiswa />} />
          <Route path="/mahasiswa/edit/:id" element={<EditMahasiswa />} />
          <Route path="/pejabat" element={<Pejabat />} />
          <Route path="/pejabat/add" element={<AddPejabat />} />
          <Route path="/pejabat/edit/:id" element={<EditPejabat />} />
          <Route path="/indikator" element={<Indikator />} />
          <Route path="/headerpenilaian" element={<HeaderPenilaian />} />
          <Route path="/headerpenilaian/add" element={<AddHeaderPenilaian />} />
          <Route path="/penilaian" element={<Penilaian />} />
          <Route path="/penilaian/edit/:id" element={<EditPenilaian />} />
          <Route path="/me" element={<Me />} />
          <Route path="/maut" element={<Maut />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
