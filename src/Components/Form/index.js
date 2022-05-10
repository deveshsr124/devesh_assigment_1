import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap";
import "./style.css";
const FormComponent = () => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [fieldshow, setFieldShow] = useState([]);
  //setting field values

  const setFieldValues = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  //check validation
  const validationcheck = () => {
    const { firstname, lastname, email, gender, age } = fields;
    let fielderrors = {};

    if (!firstname || firstname === "") {
      fielderrors.firstname = "please provide a valid first name";
    }
    if (!lastname || lastname === "") {
      fielderrors.lastname = "please provide a valid last name";
    }
    if (
      !email ||
      email === "" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      fielderrors.email = "please provide a valid email";
    }
    if (!gender || gender === "") {
      fielderrors.gender = "please provide a valid option";
    }
    if (!age || age === "") {
      fielderrors.age = "please provide a valid age";
    }

    return fielderrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formerrors = validationcheck();
    if (formerrors.length > 0 || Object.keys(formerrors).length > 0) {
      setErrors(formerrors);
      setFieldShow([]);
    }
    setFieldShow([...Object.entries(fields)]);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "2%",
      }}
    >
      <Card
        style={{
          width: "50%",
          marginBottom: "2%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter First Name"
                value={fields.firstname}
                isInvalid={!!errors.firstname}
                onChange={(e) => setFieldValues("firstname", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Last Name"
                value={fields.lastname}
                isInvalid={!!errors.lastname}
                onChange={(e) => setFieldValues("lastname", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter email"
                value={fields.email}
                isInvalid={!!errors.email}
                onChange={(e) =>
                  setFieldValues("email", e.target.value.replace(/ /g, ""))
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Gender</Form.Label>
              <Form.Control
                required
                value={fields.gender}
                as="select"
                type="select"
                className="form-select"
                isInvalid={!!errors.gender}
                onChange={(e) => setFieldValues("gender", e.target.value)}
              >
                <option value="">Choose your option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Age</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Age"
                maxLength="2"
                isInvalid={!!errors.age}
                value={fields.age}
                onChange={(e) =>
                  setFieldValues(
                    "age",
                    e.target.value.replace(/[^0-9]/g, "").trim()
                  )
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Marital Status</Form.Label>
              {["married", "unmarried"].map((item) => {
                return (
                  <Form.Check
                    name="radio"
                    type="radio"
                    id={`default-radio`}
                    label={item}
                    className="prevent-validation"
                    value={fields.maritalstatus}
                    onChange={(e) =>
                      setFieldValues(
                        "maritalstatus",
                        e.target.checked ? item : ""
                      )
                    }
                  />
                );
              })}
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Select Qualification</Form.Label>
              {["10th", "12th", "B.Tech"].map((item) => {
                return (
                  <Form.Check
                    type="checkbox"
                    id={`default-checkbox
                    `}
                    label={item}
                    value={fields.qualification}
                    onChange={(e) =>
                      setFieldValues(
                        "qualification",
                        e.target.checked ? item : ""
                      )
                    }
                  />
                );
              })}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {fieldshow.length > 0 ? (
        <ul>
          {fieldshow.map((item) => {
            return (
              <li>
                {item[0]} - {item[1]}
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormComponent;
