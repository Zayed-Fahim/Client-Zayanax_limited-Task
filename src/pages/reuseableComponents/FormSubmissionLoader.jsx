import React from "react";

const FormSubmissionLoader = () => {
  return (
    <>
      <style jsx="true">
        {`
          .formSubmissionLoader {
            width: 25px;
            aspect-ratio: 1;
            border-radius: 50%;
            background: radial-gradient(farthest-side, #000 94%, #0000) top/8px
                8px no-repeat,
              conic-gradient(#0000 30%, #000);
            -webkit-mask: radial-gradient(
              farthest-side,
              #0000 calc(100% - 8px),
              #000 0
            );
            animation: l13 1s infinite linear;
          }
          @keyframes l13 {
            100% {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
      <div className="px-9">
        <div className="formSubmissionLoader" />
      </div>
    </>
  );
};

export default FormSubmissionLoader;
/* HTML: <div class="loader"></div> */
