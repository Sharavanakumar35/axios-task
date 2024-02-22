import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap"; // Import Form, Row, Col, InputGroup, and Button from react-bootstrap
import { useUsers } from "../context-api/UsersContext";

const FormModal = ({ isAddUser, editUserDetails }) => {

  const formStructure = {
    name: "",
    username: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    phone: "",
    website: "",
    company: "",
    catchPhrase: "",
    bs: ""
  };

  const [formData, setFormData] = useState(formStructure);

  useEffect(() => {
    if (!isAddUser) {
      setFormData(editUserDetails);
    }
  }, [isAddUser, editUserDetails]);
  

  const { addUser, editUser } = useUsers();

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData };
    if (name.includes(".")) {
      const keys = name.split(".");
      let temp = updatedFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
    } else {
      updatedFormData[name] = value;
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log("Form data:", formData);
    isAddUser ? addUser(formData) : editUser(editUserDetails.id, formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="username">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide an email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* Add other form groups for other fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a street.
            </Form.Control.Feedback>
          </Form.Group>
      
          <Form.Group as={Col} md="4" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a city.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="zipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a zipcode.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="company">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a company name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="catchPhrase">
            <Form.Label>Catch Phrase</Form.Label>
            <Form.Control
              type="text"
              name="catchPhrase"
              value={formData.catchPhrase}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a catch phrase.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="bs">
            <Form.Label>Business</Form.Label>
            <Form.Control
              type="text"
              name="bs"
              value={formData.bs}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide business details.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a website.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default FormModal;
