import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const {
    formState: { errors }, handleSubmit, register,
  } = useForm();

  const onSubmit = async () => {
    await LoginPage.submit();
  };

  return (
    <>
      <h1>LOG IN</h1>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register(`formBasicEmail`, { required: true })} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {errors.formBasicEmail && <p>Cat name is required</p>}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register(`formBasicPassword`, { required: true })} />
        </Form.Group>
        {errors.formBasicPassword && <p>Cat name is required</p>}

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );

};
