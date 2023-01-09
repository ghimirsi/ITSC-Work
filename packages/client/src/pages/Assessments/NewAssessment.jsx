import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const questionPoints = { value0: 0, value1: 1 };

function riskLevel(score) {
  switch (true) {
    case score >= 2 && score <= 3:
      return `Medium`;
    case score >= 4 && score <= 5:
      return `High`;
    case score >= 0 && score <= 1:
      return `Low`;
    default:
      return ``;
  }
}
export const NewAssessment = () => {
  const [ points, setPoints ] = useState(0);
  const {
    formState: { errors }, handleSubmit, register, watch,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {/
  // await AssessmentService.submit(data);
  // };
  const onSubmit = async (data) => {
    const { Question1, Question2, Question3, Question4, Question5 } = data;

    const sum = parseInt(Question1) +
    parseInt(Question2) +
    parseInt(Question3) +
    parseInt(Question4) +
    parseInt(Question5);
    // eslint-disable-next-line no-console
    console.log(sum);
    setPoints(sum);
    data.score = sum;
    data.riskLevel = riskLevel(sum);
    await AssessmentService.submit({ ...data, points });
  };

  const value1 = watch(`Question1`);
  const value2 = watch(`Question2`);
  const value3 = watch(`Question3`);
  const value4 = watch(`Question4`);
  const value5 = watch(`Question5`);

  useEffect(() => {
    const sum = parseInt(value1) +
  parseInt(value2) +
  parseInt(value3) +
  parseInt(value4) +
  parseInt(value5);
    setPoints(isNaN(sum) ? 0 : sum);

  }, [ value1, value2, value3, value4, value5 ]);

  return (
    <>
      <h1>CAT BE INSTRUMENT</h1>
      <h1> User Score: {points} </h1>

      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="catName">
          <Form.Label>Cat Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter Cat Name" {...register(`catName`, { required: true })} />
        </Form.Group>
        {errors.catName && <p>Cat name is required</p>}

        <Form.Group className="mb-3" controlId="birthDate">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control type="date" placeholder="Enter Date of Birth"
            {...register(`birthDate`, { required: true })} />
        </Form.Group>
        {errors.lastName && <p>Date of Birth is required</p>}

        <br />

        <h2> QUESTION AND RESPONSE </h2>

        <br />

        <Form.Group className="mb-3" controlId="Question1">
          <Form.Label>1. Any previous contact with the Cat judicial System? </Form.Label>
          <Form.Select {...register(`Question1`, { required: true })} >
            <option value="">Select</option>
            <option value={questionPoints.value1}>yes</option>
            <option value={questionPoints.value0}>No</option>
          </Form.Select>
        </Form.Group>
        {errors.q1 && <p>please select the option below.</p>}

        <Form.Group className="mb-3" controlId="Question2">
          <Form.Label>2. Physical alterations with other cats? </Form.Label>
          <Form.Select {...register(`Question2`, { required: true })}>
            <option value="">Select</option>
            <option value={questionPoints.value0}> 0-3 altercations</option>
            <option value={questionPoints.value1}> 3+ altercations</option>
          </Form.Select>
        </Form.Group>
        {errors.q2 && <p>please select the option below.</p>}

        <Form.Group className="mb-3" controlId="Question3">
          <Form.Label>3. Do the cat play well with the dogs? </Form.Label>
          <Form.Select {...register(`Question3`, { required: true })}>
            <option value="">Select</option>
            <option value={questionPoints.value1}>No</option>
            <option value={questionPoints.value0}>Yes</option>
          </Form.Select>
        </Form.Group>
        {errors.q3 && <p>please select the option below.</p>}

        <Form.Group className="mb-3" controlId="Question4">
          <Form.Label>4. Do your Cat hisses at stranger? </Form.Label>
          <Form.Select {...register(`Question4`, { required: true })}>
            <option value="">Select</option>
            <option value={questionPoints.value0}>Yes</option>
            <option value={questionPoints.value1}>No</option>
          </Form.Select>
        </Form.Group>
        {errors.q4 && <p>please select the option below.</p>}

        <Form.Group className="mb-3" controlId="Question5">
          <Form.Label>5. Any physical altercations with the owner? </Form.Label>
          <Form.Select {...register(`Question5`, { required: true })}>
            <option value="">Select</option>
            <option value={questionPoints.value0}>0-3 altercation</option>
            <option value={questionPoints.value1}>10+ altercation</option>
          </Form.Select>
        </Form.Group>
        {errors.q5 && <p>please select the option below.</p>}

        <Form.Label>Risk Level: low[0-1], Medium[2-3], high[4-5]</Form.Label>
        <Form.Range />
        <Button variant="success" type="submit">Submit</Button>

      </Form>

    </>

  );

};
