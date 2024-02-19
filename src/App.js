import { useState } from "react";
import ConfirmationMessage from "./pages/reuseableComponents/ConfirmationMessage";
import Routes from "./routes/Routes";

const App = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [text, setText] = useState(null);
  const [status, setStatus] = useState(null);
  const [buttonText, setButtonText] = useState(null);
  const [onClick, setOnClick] = useState(null);
  const goToAdminPanelButtonClassNames =
    "bg-[#FFF700] py-2 px-4 rounded-3xl border border-black border-opacity-10";
    
  return (
    <div className="bg-[#FAFAFA] min-h-max">
      {isSuccess ? (
        <ConfirmationMessage
          text={text}
          status={status}
          buttonText={buttonText}
          classNames={buttonText && goToAdminPanelButtonClassNames}
          onClick={buttonText && onClick}
        />
      ) : (
        <Routes
          setIsSuccess={setIsSuccess}
          setText={setText}
          setStatus={setStatus}
          setButtonText={setButtonText}
          setOnClick={setOnClick}
        />
      )}
    </div>
  );
};

export default App;
