import { api } from "@/lib/api.js";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner.jsx";

function Home() {
    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/info.0.json")
            .then(setLatest)
            .finally( () => setLoading(false));
    }, []);

    if (loading) return <Spinner />

    return (
        <>
            <h1>My xkcd</h1>
            <h2>Latest:</h2>
            <img src={latest.img} alt="Latest xkcd comic"/>
        </>
    )
}

export default Home;