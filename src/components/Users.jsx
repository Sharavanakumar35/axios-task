import React from 'react';
import { useUsers } from '../context-api/UsersContext';
import UserCard from './UserCard';

const Users = () => {
    const { users } = useUsers();

    if (!users || users.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='main-container'>
            <div className='grid-wrapper'>
                {users.map((user, index) => (
                    <UserCard key={index} user={user}></UserCard>
                ))}
            </div>
        </div>
    );
};

export default Users;

