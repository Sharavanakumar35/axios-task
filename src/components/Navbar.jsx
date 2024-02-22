
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormModal from './FormModal';
import { useUsers } from '../context-api/UsersContext';
import DropdownSearchBox from './DropdownSearch';



function NavBar() {

    const [show, setShow] = useState(false);
    const { users, originalUsers, setUsers, setHandleSearchChangeFn } = useUsers();



    const handleSearchChange = (searchTerm, attribute) => {
      console.log(searchTerm, attribute);
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();
      const trimmedAttribute = attribute.trim().toLowerCase();
  
      let filteredUsers;
      if (trimmedSearchTerm !== '') {
          filteredUsers = originalUsers.filter(user => {
              return user[trimmedAttribute] && user[trimmedAttribute].toLowerCase().includes(trimmedSearchTerm);
          });
      } else {
          filteredUsers = originalUsers;
      }
  
      setUsers(filteredUsers);
    };
  
    useEffect(() => {
      setHandleSearchChangeFn(() => handleSearchChange); // Update handleSearchChangeFn in UsersContext
    }, [setHandleSearchChangeFn]);

  
    

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand style={{fontSize: '2.5rem'}}>Users Profiles</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='d-flex justify-content-between'>
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
          <DropdownSearchBox searchTerm={handleSearchChange} handleSearchChange={handleSearchChange}></DropdownSearchBox>
          </Nav>
          <Button className='me-4' onClick={() => setShow(true)}>
            Add User
          </Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Add a new user
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FormModal isAddUser={true} editUserDetails={{}}></FormModal>
            </Modal.Body>
          </Modal>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;