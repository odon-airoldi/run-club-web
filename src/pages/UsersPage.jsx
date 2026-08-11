import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [users, setUsers] = useState([])

    async function indexUsers() {
        try {
            const response = await axios.get('http://api.run-club.test/api/users',
                {
                    withCredentials: true
                }
            )

            setUsers(response.data)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (user.role != 'admin') {
            navigate('/')
        }
        indexUsers()

    }, [])

    console.log(users)


    return (
        <>
            <h1 className="font-bold text-8xl">Users List</h1>
            <div>
                {
                    users.map((user) => (
                        <div key={user.id}>{user.name}</div>
                    ))
                }
            </div>
        </>
    );


}