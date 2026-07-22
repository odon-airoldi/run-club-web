
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function IndexPage() {


    const [newWorkout, setNewWorkout] = useState({});

    const [name, setName] = useState(null);

    // useEffect(() => {
    //     fetch(`http://run-club-api.test/api/workouts/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setWorkout(data.results)
    //         })

    // }, [])

    function addNewWorkout(e) {

        e.preventDefault()

        const data = {
            name: e.target.name.value,
            description: e.target.description.value
        }

        setNewWorkout(data)

        console.log(newWorkout)

    }

    return (
        <>
            <h1>Aggiungi un allenamento</h1>
            <form onSubmit={addNewWorkout}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input className="border" type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="description">Descrizione</label>
                    <input className="border" type="text" id="description" name="description" />
                </div>
                <div>
                    <button type="submit">Aggiungi</button>
                </div>
            </form>

            {name}
        </>
    );


}