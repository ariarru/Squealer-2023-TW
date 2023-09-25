import { SyncLoader } from "react-spinners";

export default function Preloader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
            <SyncLoader speedMultiplier={2} color="blue" />
        </div>
    );
}