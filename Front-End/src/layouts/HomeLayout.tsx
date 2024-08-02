import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="header flex w-full h-12 p-2 shadow-md bg-green-100">
                <div className="flex justify-center items-center companyLogo h-full">
                    <img className="w-8 h-8" src="/logo.svg" />
                    <span className="ml-2">Program Tree</span>
                </div>
            </div>
            <div className="flex w-full grow">
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;