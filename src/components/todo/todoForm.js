import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import uniqid from 'uniqid';

export function TodoForm({ onSubmit, formId }) {
  let realFormId = formId ?? uniqid();

  return (
    <Formik
      initialValues={{}}
      validate={(values) => {
        let errors = {};
        if (!values.title || values.title === '') {
          errors.title = 'required';
        }

        return errors;
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}>
      {({ values, errors, handleChange, handleBlur, touched, handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit} id={realFormId}>
            <Form.Group className="mb-3" controlId="todoTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="title"
                required
                isInvalid={touched.title && errors?.title}
                value={values.title ?? ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
            </Form.Group>
            {!formId && (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
