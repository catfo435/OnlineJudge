import SignInUpPane from "./components/SignInUpPane";

const App = () => {

  return (
    <div className="loginPage flex w-screen h-screen">
      <div className="flex justify-center items-center w-[40%] h-full bg-gray-200">
        <SignInUpPane />
      </div>
      <div className="flex justify-center items-center w-[60%] h-full bg-gray-900">
        <div className="content flex flex-col items-center justify-center w-2/3 h-4/5">
          <img className="w-52 h-52 mb-5" src="/logo.svg"/>
          <span className="text-6xl mb-5 text-gray-300">Program Tree</span>
          <span className="text-gray-400 text-lg">Climb up the corporate tree</span>
        </div>
      </div>
    </div>
  );
}

export default App;