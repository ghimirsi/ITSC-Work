import React, { useEffect, useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      const data = await AssessmentService.getList();
      setAssessments(data);
    };
    fetchAssessments();
  }, [ ]);

  return (
    <div>
      {/*
          List goes here
          Please use the library react-table https://www.npmjs.com/package/react-table
      */}
      <pre>{JSON.stringify(assessments, null, 2)}</pre>
    </div>
  );
};
