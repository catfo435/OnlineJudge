import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInUpPane = () => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignIn = () => {
        fetch(`${import.meta.env.VITE_API_URL}/user/login/`, {
            method : 'POST',
            credentials: 'include',
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({Username, Password})
        })
        .then((res) => {
            if (res.status === 401) {
                alert("Wrong Credentials")
                setPassword("")
            }
            else if (res.status == 200) navigate("/dashboard")
            else {
                alert ("Something went wrong")
                console.log(res)
            }
        })
        .catch((e) => {
                alert ("Something went wrong")
                console.log(e)
        })
    }

    return (
        <div className="SignInUpPane flex flex-col items-center w-3/4 h-2/3 shadow-md bg-gray-50 text-gray-900 p-3">
            <span className="text-3xl mb-3">Sign In</span>
            <div className="inputArea w-full grow p-5">
                <div className="flex flex-col w-full h-full">
                    <Label className="text-base" htmlFor="username">Username</Label>
                    <TextInput value={Username} onChange={(e) => {setUsername(e.target.value)}} className="mt-2 mb-6" id="username"/>
                    <Label className="text-base" htmlFor="username">Password</Label>
                    <TextInput value={Password} onChange={(e) => {setPassword(e.target.value)}} type="password" className="mt-2 mb-4" id="username"/>
                    <div className="flex justify-center"><Button className="w-28" color="blue" onClick={handleSignIn}>Sign In</Button></div>
                    <div className="flex flex-col items-center mt-4">
                        <a className="text-sm mb-2 hover:underline hover:cursor-pointer">Have Trouble Signing In?</a>
                        <a className="text-sm mb-2 hover:underline hover:cursor-pointer">New User?</a>
                        <a className="text-xs hover:underline hover:cursor-pointer">Click here to login as admin</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInUpPane;