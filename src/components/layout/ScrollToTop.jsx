import {useEffect, useState} from "react";
import {ArrowUpIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    const onScroll = () => setVisible(window.scrollY > 300);
    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <Button
            variant="outline"
            className="fixed bottom-6 right-6 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="icon"
        >
            <ArrowUpIcon />
        </Button>
    )
}

export default ScrollToTop;