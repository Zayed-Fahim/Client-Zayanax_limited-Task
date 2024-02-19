import React from "react";
import SignUpForm from "../../smallComponents/Home/SignUpForm";

const SignUp = ({ setStatus, setText, setIsSuccess }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-5 xl:1/3 2xl:w-1/6 ">
        <h1 className="text-2xl font-bold">Sign Up Here</h1>
        <SignUpForm
          setText={setText}
          setStatus={setStatus}
          setIsSuccess={setIsSuccess}
        />
      </div>
    </div>
  );
};

export default SignUp;
