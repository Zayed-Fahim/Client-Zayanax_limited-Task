import React from "react";
import Products from "./Products";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-73px)]">
      <div className="mx-[2rem] md:mx-[4rem] lg:mx-[6rem] py-10 ">
        <Products />
      </div>
    </div>
  );
};

export default Home;
