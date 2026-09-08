
import { useEffect, useState } from "react";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";

export default function WorkoutsPage() {

    const { userAuth } = useAuth();
    const { sortedWorkouts } = useWorkout();

    const [workouts, setWorkouts] = useState([]);
    const [sortOption, setSortOption] = useState('date_time&asc')


    // index workouts
    async function indexWorkout() {

        const [order, direction] = sortOption.split('&')

        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/`,
                {
                    params: {
                        order,
                        direction
                    }
                }

            );

            setWorkouts(response.data)


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        indexWorkout();

    }, [sortOption]);

    const now = new Date();

    return (
        <div className="">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-indigo-600 font-semibold font-zalando">Allenamenti</h1>
            </div>

            <div>
                <div>Ordina per</div>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="date_time&asc">Data: Crescente</option>
                    <option value="date_time&desc">Data: Descrescente</option>
                    <option value="distance&asc">Km: Crescente</option>
                    <option value="distance&desc">Km: Descrescente</option>
                    <option value="pace&asc">Min/Km: Crescente</option>
                    <option value="pace&desc">Min/Km: Decrescente</option>
                </select>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    workouts.map((workout) => (
                        // sortedWorkouts(workouts).map((workout) => (
                        <AppWorkoutCard key={workout.id} workout={workout} />
                    ))
                }
            </div>
        </div>
    );


}