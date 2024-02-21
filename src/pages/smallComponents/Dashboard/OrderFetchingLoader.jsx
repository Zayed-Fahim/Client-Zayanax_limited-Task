import React from "react";

const OrderFetchingLoader = () => {
  return (
    <>
      <style jsx="true">{`
        .orderFetchingLoader {
          width: 40px;
          height: 20px;
          border-radius: 200px 200px 0 0;
          -webkit-mask: repeating-radial-gradient(
            farthest-side at bottom,
            #0000 0,
            #000 1px 12%,
            #0000 calc(12% + 1px) 20%
          );
          background: radial-gradient(
              farthest-side at bottom,
              #514b82 0 95%,
              #0000 0
            )
            bottom/0% 0% no-repeat #ddd;
          animation: l10 2s infinite steps(6);
        }
        @keyframes l10 {
          100% {
            background-size: 120% 120%;
          }
        }
      `}</style>
      <div className="flex justify-center items-center w-full pt-72">
        <div className="orderFetchingLoader" />
      </div>
    </>
  );
};

export default OrderFetchingLoader;
