import React from "react";

const DataFetchingLoader = () => {
  return (
    <>
      <style jsx="true">{`
        .dataFetchingLoader {
          width: 80px;
          height: 40px;
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
      <div className="flex justify-center items-center w-full h-[calc(90vh-110px)]">
        <div className="dataFetchingLoader" />
      </div>
    </>
  );
};

export default DataFetchingLoader;
