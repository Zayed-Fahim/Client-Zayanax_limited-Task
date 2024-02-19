import { useContext } from "react";
import CommonContext from "./contexts/CommonContext";
import ConfirmationMessage from "./pages/reuseableComponents/ConfirmationMessage";
import Routes from "./routes/Routes";

const App = () => {
  const { text, status, onClick, isSuccess, buttonText } =
    useContext(CommonContext);
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
        <Routes />
      )}
    </div>
  );
};

export default App;
