const { Assessment } = require(`../database/models`);

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
  // chnaging to show demo for pull request
  const users = await Assessment.findAll();

  // eslint-disable-next-line no-console
  console.log(users.every(user => user instanceof Assessment));
  // eslint-disable-next-line no-console
  console.log(`All users:`, JSON.stringify(users, null, 2));
  const assessments = [];

  return assessments;
};
