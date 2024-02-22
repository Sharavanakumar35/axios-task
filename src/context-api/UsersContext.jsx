import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const client = axios.create({
    baseURL: 'https://65d728da27d9a3bc1d7a55a5.mockapi.io/api/usersData'
});

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [handleSearchChangeFn, setHandleSearchChangeFn] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await client.get();
            setUsers(response.data);
            setOriginalUsers(response.data);
            if (handleSearchChangeFn) {
                handleSearchChangeFn(); // Trigger handleSearchChange if it's set
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = (id) => {
        client
            .delete(`/${id}`)
            .then(() => {
                alert("User deleted!");
                getUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const addUser = async (newUser) => {
        try {
            const response = await client.post('', newUser);
            const newUserWithId = { ...newUser, id: response.data.id };
            getUsers();
            alert("A new user has been added!");
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const editUser = async (id, updatedUser) => {
        try {
            await client.put(`/${id}`, updatedUser);
            alert("User info updated!");
            getUsers();
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    return (
        <UsersContext.Provider
            value={{ users, setUsers, originalUsers, deleteUser, addUser, editUser, getUsers, setHandleSearchChangeFn }}
        >
            {children}
        </UsersContext.Provider>
    );
};


export const useUsers = () => {
    return useContext(UsersContext)
}