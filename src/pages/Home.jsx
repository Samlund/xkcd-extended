"use strict";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner.jsx";
import { xkcd } from "@/lib/external/xkcd.js";

function Home() {
    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        xkcd.getLatest()
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