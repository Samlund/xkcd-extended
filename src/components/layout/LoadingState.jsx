import {Spinner} from "@/components/ui/spinner.jsx";

function LoadingState() {
    return (
        <div className="grid place-items-center min-h-screen">
            <Spinner className="size-7 -translate-y-40"/>
        </div>
    )
}

export default LoadingState;