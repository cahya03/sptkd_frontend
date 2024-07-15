// src/utils/maut.js

/**
 * Normalizes the scores for each criterion.
 * @param {Array} scores - List of student scores
 * @param {Object} criteriaWeights - Weights for each criterion
 * @returns {Array} - List of normalized scores
 */
export function normalizeScores(scores, criteriaWeights) {
    const normalizedScores = [];
    const criteria = Object.keys(criteriaWeights);

    criteria.forEach(criterion => {
        const values = scores.map(student => student.scores[criterion]).filter(value => value !== undefined && value !== null);

        if (values.length === 0) {
            console.warn(`No values found for criterion: ${criterion}`);
            return;
        }

        const min = Math.min(...values);
        const max = Math.max(...values);

        // Avoid division by zero
        const range = max - min;
        if (range === 0) {
            console.warn(`Range is zero for criterion: ${criterion}. All values are the same.`);
            scores.forEach((student, index) => {
                if (!normalizedScores[index]) {
                    normalizedScores[index] = { name: student.name, scores: {} };
                }
                normalizedScores[index].scores[criterion] = 0; // Or any other default value
            });
            return;
        }

        scores.forEach((student, index) => {
            const value = student.scores[criterion];
            const normalizedValue = (value - min) / range;
            if (!normalizedScores[index]) {
                normalizedScores[index] = { name: student.name, scores: {} };
            }
            normalizedScores[index].scores[criterion] = normalizedValue;
        });
    });

    console.log(normalizedScores);
    return normalizedScores;
}

/**
 * Calculates the utility scores for each student.
 * @param {Array} normalizedScores - List of normalized scores
 * @param {Object} criteriaWeights - Weights for each criterion
 * @returns {Array} - List of students with utility scores
 */
export function calculateUtility(normalizedScores, criteriaWeights) {
    return normalizedScores.map(student => {
        let utilityScore = 0;
        Object.keys(criteriaWeights).forEach(criterion => {
            const normalizedScore = student.scores[criterion] || 0; // Default to 0 if undefined
            const weight = criteriaWeights[criterion] || 0; // Default to 0 if undefined
            utilityScore += normalizedScore * weight;
        });
        return { name: student.name, utilityScore: utilityScore };
    });
}
