
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function IndexPage() {


    const [workout, setWorkout] = useState([]);

    // useEffect(() => {
    //     fetch(`http://run-club-api.test/api/workouts/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setWorkout(data.results)
    //         })

    // }, [])

    return (
        <>
            <h1>Aggiungi un allenamento</h1>
            <form onSubmit={prova => }>
                <label>Titolo</label>
                <input type="text" id="" name="" />
                <button onClick={prova} type="submit">Aggiungi</button>
            </form>
        </>
    );


}