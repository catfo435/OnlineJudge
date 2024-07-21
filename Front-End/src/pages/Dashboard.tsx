import { useEffect } from "react";

const Dashboard = () => {
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/user/`,{
            credentials : "include"
        })
        .catch(console.error)
    },[])

    return (
        <div>
            Hi
        </div>
    );
}

export default Dashboard;