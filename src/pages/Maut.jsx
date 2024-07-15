import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ScoreCalculator from "../components/ScoreCalculator";
import axios from "axios";


const Maut = () => {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [indikator, setIndikator] = useState([]);
  const [criteriaWeights, setCriteriaWeights]= useState({});
  
  useEffect(() => {
    listIndikator();
  }, []);

  useEffect(() =>{
    const weights = {};
    indikator.forEach(item => {
      weights[item.indikator_nama] = item.indikator_bobot;
    });
    setCriteriaWeights(weights);
  }, [indikator])
  console.log(criteriaWeights);

  const listIndikator = async () => {
    const response = await axios.get(`${base_url}/api/indikator`);
    setIndikator(response.data);
  };

  const studentScores = [
    {
      name: "Komang",
      scores: {
        "Amanah": 3,
        "Berani": 4,
        "Berfikir strategis": 3,
        "Cekatan": 4,
        "Disiplin": 4,
        "Etika": 3,
        "Hasil kerja": 2,
        "Inisiatif": 1,
        "Jujur": 2,
        "Keaktifan": 1,
        "Kemampuan problem solving": 1,
        "Kepatuhan": 2,
        "Kerja sama tim": 3,
        "Kesadaran keselamatan": 1,
        "Kesehatan": 2,
        "Komunikatif": 1,
        "Kreativitas": 2,
        "Kualitas kerja": 2,
        "Manajemen resiko": 4,
        "Memberi teladan": 1,
        "Motivasi belajar": 3,
        "Peduli": 2,
        "Pendidikan": 2,
        "Pengembangan diri": 1,
        "Prestasi": 2,
        "Produktivitas": 3,
        "Religius": 1,
        "Sikap terhadap junior": 3,
        "Sikap terhadap senior": 2,
        "Sikap terhadap sesama": 2,
        "Tanggung jawab": 1,
        "Wawasan pekerjaan": 1,
      },
    },
    {
        name: "Cahya",
        scores: {
          "Amanah": 1,
          "Berani": 3,
          "Berfikir strategis": 4,
          "Cekatan": 1,
          "Disiplin": 2,
          "Etika": 4,
          "Hasil kerja": 2,
          "Inisiatif": 1,
          "Jujur": 2,
          "Keaktifan": 1,
          "Kemampuan problem solving": 1,
          "Kepatuhan": 3,
          "Kerja sama tim": 3,
          "Kesadaran keselamatan": 1,
          "Kesehatan": 2,
          "Komunikatif": 2,
          "Kreativitas": 2,
          "Kualitas kerja": 2,
          "Manajemen resiko": 4,
          "Memberi teladan": 1,
          "Motivasi belajar": 3,
          "Peduli": 2,
          "Pendidikan": 4,
          "Pengembangan diri": 1,
          "Prestasi": 2,
          "Produktivitas": 3,
          "Religius": 1,
          "Sikap terhadap junior": 3,
          "Sikap terhadap senior": 2,
          "Sikap terhadap sesama": 3,
          "Tanggung jawab": 1,
          "Wawasan pekerjaan": 4,
        },
      },
  ];

  const criteriaWeights_old = {
    "Amanah": 0.032,
    "Berani":0.03,
    "Berfikir strategis": 0.033,
    "Cekatan": 0.029,
    "Disiplin": 0.032,
    "Etika": 0.031,
    "Hasil kerja": 0.031,
    "Inisiatif": 0.032,
    "Jujur": 0.033,
    "Keaktifan": 0.03,
    "Kemampuan problem solving": 0.031,
    "Kepatuhan": 0.031,
    "Kerja sama tim": 0.033,
    "Kesadaran keselamatan": 0.033,
    "Kesehatan": 0.032,
    "Komunikatif": 0.032,
    "Kreativitas": 0.032,
    "Kualitas kerja": 0.032,
    "Manajemen resiko": 0.032,
    "Memberi teladan": 0.031,
    "Motivasi belajar": 0.032,
    "Peduli": 0.03,
    "Pendidikan": 0.032,
    "Pengembangan diri": 0.032,
    "Prestasi": 0.031,
    "Produktivitas": 0.032,
    "Religius": 0.03,
    "Sikap terhadap junior": 0.028,
    "Sikap terhadap senior": 0.031,
    "Sikap terhadap sesama": 0.03,
    "Tanggung jawab": 0.033,
    "Wawasan pekerjaan": 0.031,
  };
  return (
    <div>
      <Layout>
        <ScoreCalculator
          studentScores={studentScores}
          criteriaWeights={criteriaWeights}
        />
      </Layout>
    </div>
  );
};

export default Maut;
