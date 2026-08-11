import axios from "axios";
import { useState, useEffect } from "react";

export default function UsersPage() {

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

        indexUsers()

    }, [])

    // console.log(users)


    return (
        <>
            <h1 className="font-bold text-8xl">Users List</h1>
            {
                users.map((user) => (
                    <div>{user.name}</div>
                ))
            }
        </>
    );


}