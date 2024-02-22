import React from 'react';
import '../components/UserCard.css';
import { useState } from 'react';
import { useUsers } from '../context-api/UsersContext';
import { Modal } from 'react-bootstrap';
import FormModal from './FormModal';

const UserCard = ({user}) => {
    const {deleteUser} = useUsers();
    const [show, setShow] = useState(false);

    return (
      <>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Edit User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormModal isAddUser={false} editUserDetails={user}></FormModal>
          </Modal.Body>
        </Modal>

        <div className="wrapper">
          <div className="left">
            <h4>{user.name}</h4>
            <h6 className='mt-2'>@{user.username}</h6>
          </div>
          <div className="right">
            <div className="info">
              <h3>Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div className="data">
                  <h4>Phone</h4>
                  <p>{user.phone}</p>
                </div>
                <div className="data">
                  <h4>Address</h4>
                  <p>{user.street + ","}</p>
                  <p>{user.city + ","}</p>
                  <p>{user.zipcode}</p>
                </div>
              </div>
            </div>

            <div className="projects">
              <h3>Company</h3>
              <div className="projects_data">
                <div className="data">
                  <h4 style={{ color: "#01aeb1" }}>{user.company}</h4>
                  <p>{user.catchPhrase}</p>
                </div>
                <div className="data">
                  <h6>Website: {user.website}</h6>
                </div>
              </div>
            </div>

            <div className="social_media">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => setShow(true)}
              >
                Edit User
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete User
              </button>
              {/* <ul>
                        <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    </ul> */}
            </div>
          </div>
        </div>
      </>
    );
};

export default UserCard;
