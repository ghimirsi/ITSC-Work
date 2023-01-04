import React from 'react';

import { Button, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';

import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  const {
    formState: { errors }, handleSubmit, register,
  } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };
  return (

    <>

      <p>CAT BE Instrument</p>

      <Form onSubmit={handleSubmit((data) => console.log(data))}>

        <Form.Group className="mb-3" controlId="catName">
          <Form.Label>Cat Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Cat Name" {...register(`catName`, { required: true })} />
        </Form.Group>
        {errors.catName && <p>Cat name is required.</p>}

        <Form.Group className="mb-3" controlId="birthDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" placeholder="Enter Date of Birth"
            {...register(`birthDate`, { required: true })} />
        </Form.Group>
        {errors.lastName && <p>Date of Birth is required.</p>}

        <p> Questions and Response </p>

        <Form.Group className="mb-3" controlId="Question">
          <Form.Label>1. Any previous contact with the Cat judicial System? </Form.Label>
          <Form.Select aria-label="Yes or No">
            <option> Select</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Question">
          <Form.Label>2. Physical alterations with other cats? </Form.Label>
          <Form.Select aria-label="choose">
            <option>Select</option>
            <option value="1"> 0-3 altercations</option>
            <option value="2"> 3+ altercations</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Question">
          <Form.Label>3. Do the cat play well with the dogs? </Form.Label>
          <Form.Select aria-label="choose">
            <option>Select</option>
            <option value="1">10+ alteraction</option>
            <option value="2">0-10 alteraction</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Question">
          <Form.Label>4. Do your Cat hisses at stranger? </Form.Label>

          <Form.Select aria-label="Yes or No">
            <option>Select</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">Submit</Button>
      </Form>

    </>

  );

};
