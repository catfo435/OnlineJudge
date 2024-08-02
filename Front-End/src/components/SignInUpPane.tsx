import { Button, Label, TextInput } from "flowbite-react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SignInUpPane = () => {
    const navigate = useNavigate()

    const handleSignIn = async (e : FormEvent) => {
        e.preventDefault()

        const hash = async (str : string) : Promise<string> => {
            const utf8 = new TextEncoder().encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map((bytes) => bytes.toString(16).padStart(2, '0'))
                .join('');
            return hashHex;
        }

        const formData = new FormData(e.target as HTMLFormElement)
        const Username = formData.get("username") as string
        const Password = await hash(formData.get("password") as string)

        console.log(Password)

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
                alert("Wrong Credentials");
                (e.target as HTMLFormElement).reset()
            }
            else if (res.status == 200) navigate("/dashboard")
            else if (res.status == 404) {
                alert ("User not found")
            }
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
        <div className="SignInUpPane flex flex-col items-center w-3/4 shadow-md bg-gray-50 text-gray-900 p-3">
            <span className="text-3xl mb-3">Sign In</span>
            <div className="inputArea w-full grow p-5">
                <div className="flex flex-col w-full h-full">
                    <form onSubmit={handleSignIn}>
                        <Label className="text-base" htmlFor="username">Username</Label>
                        <TextInput className="mt-2 mb-6" id="username" name="username"/>
                        <Label className="text-base" htmlFor="password">Password</Label>
                        <TextInput type="password" className="mt-2 mb-4" id="password" name="password"/>
                        <div className="flex justify-center"><Button type="submit" className="w-28" color="blue">Sign In</Button></div>
                    </form>
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