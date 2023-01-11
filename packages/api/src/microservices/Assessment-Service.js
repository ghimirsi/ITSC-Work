import { Assessment } from '../database/models';

exports.submit = async (assessment) =>
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  await Assessment.create({
    catDateOfBirth: assessment.birthDate,
    catName: assessment.catName,
    instrumentType: 1,
    riskLevel: assessment.riskLevel,
    score: assessment.points,
  });

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  // changing to show demo for pull request

  const assessments = await Assessment.findAll(); // -> {id: 1, score: 2}

  return assessments;
};
