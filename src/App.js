import { useContext } from "react";
import CommonContext from "./contexts/CommonContext";
import ConfirmationMessage from "./pages/reuseableComponents/ConfirmationMessage";
import Routes from "./routes/Routes";

const App = () => {
  const { text, status, isSuccess, buttonText } = useContext(CommonContext);

  const goToAdminPanelButtonClassNames = `${
    buttonText
      ? "bg-[#FFF700] py-2 px-4 rounded-3xl border border-black border-opacity-10 block"
      : "hidden px-0 py-0 bg-none"
  }`;

  return (
    <div className="bg-[#FAFAFA] min-h-max">
      {isSuccess ? (
        <ConfirmationMessage
          text={text}
          status={status}
          buttonText={buttonText}
          classNames={goToAdminPanelButtonClassNames}
        />
      ) : (
        <Routes />
      )}
    </div>
  );
};

export default App;
