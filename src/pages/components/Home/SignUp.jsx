import React from "react";
import SignUpForm from "../../smallComponents/Home/SignUpForm";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-white p-5 rounded-md flex flex-col gap-5 xl:1/3 2xl:w-1/5">
        <h1 className="text-2xl font-bold">Sign Up Here</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
