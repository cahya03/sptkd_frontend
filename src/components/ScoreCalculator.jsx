// src/components/ScoreCalculator.js

import React, { useState, useEffect } from 'react';
import { normalizeScores, calculateUtility } from '../utils/maut';

const ScoreCalculator = ({ studentScores, criteriaWeights }) => {
  const [utilityScores, setUtilityScores] = useState([]);

  useEffect(() => {
    const normalizedScores = normalizeScores(studentScores, criteriaWeights);
    const calculatedUtilityScores = calculateUtility(normalizedScores, criteriaWeights);
    setUtilityScores(calculatedUtilityScores.sort((a, b) => b.utilityScore - a.utilityScore));
  }, [studentScores, criteriaWeights]);

  return (
<div className="p-4">
  <h1 className="text-3xl font-bold text-center mb-4">Utility Scores</h1>
  <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2 border border-gray-300">Rank</th>
        <th className="px-4 py-2 border border-gray-300">Name</th>
        <th className="px-4 py-2 border border-gray-300">Utility Score</th>
      </tr>
    </thead>
    <tbody>
      {utilityScores.map((student, index) => (
        <tr key={student.name} className="hover:bg-gray-100">
          <td className="border px-4 py-2 text-center">{index + 1}</td>
          <td className="border px-4 py-2 text-center">{student.name}</td>
          <td className="border px-4 py-2 text-center">{student.utilityScore.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default ScoreCalculator;
