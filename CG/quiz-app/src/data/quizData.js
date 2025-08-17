// src/data/quizData.js

const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    answerIndex: 1, // "Mars"
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answerIndex: 2, // "Paris"
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answerIndex: 1, // "Carbon Dioxide"
  },
  {
    question:
      "A junior data engineer is working to implement logic for a Lakehouse table named silver_device_recordings. The source data contains 100 unique fields in a highly nested JSON structure. The silver_device_recordings table will be used downstream to power several production monitoring dashboards and a production model. At present, 45 of the 100 fields are being used in at least one of these applications. The data engineer is trying to determine the best approach for dealing with schema declaration given the highly-nested structure of the data and the numerous fields. Which of the following accurately presents information about Delta Lake and Databricks that may impact their decision-making process?",
    options: [
      "Delta Lake enforces schema evolution automatically without user intervention",
      "Delta Lake allows schema enforcement and evolution as needed",
      "Databricks does not support handling nested JSON structures",
      "All fields must always be used to declare schema in Delta Lake",
    ],
    answerIndex: 1, // "Delta Lake allows schema enforcement and evolution as needed"
  },
];

export default quizData;
