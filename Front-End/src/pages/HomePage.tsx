import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div className="homePage flex w-full h-full pt-5">
            <div className="flex flex-col items-center w-2/3">
                <span className="text-4xl mb-2">Problem Set</span>
                <div className="w-[80%] h-[90%] p-2 overflow-auto"></div>
            </div>
            <div className="relative w-1/3">
                <div className="blurOverlay absolute z-10 flex justify-center items-center w-full h-full backdrop-blur-sm">
                    <div className="flex flex-col items-center h-52 w-[80%] bg-gray-200 rounded-md text-xl">
                        <span className="mt-5">Sign in</span>
                        <span className="mt-2">to view your Submissions</span>
                        <Button className="mt-8" color="blue" size="lg" onClick={() => {
                            navigate("/login")
                        }}>Sign In</Button>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full h-full">
                    <span className="text-3xl mb-2 hover:underline">Recent Submissions</span>
                    <div className="w-[90%] h-[90%] p-2 overflow-auto"></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;