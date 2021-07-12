import { useState, useEffect } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useUserSlice } from "../redux/getState";

function InstallPromt() {
  const [, dispatch] = useUserSlice();
  const [installEvent, setInstallEvent] = useState(null);

  const handleInstallClick = async (e) => {
    e.preventDefault();

    installEvent.prompt();
    // console.log(installEvent);

    const outcome = await installEvent.userChoice;

    console.log(`User responded with: `);
    console.log(outcome);

    setInstallEvent(null);
  };

  const handleCloseClick = () => {
    dispatch({
      type: "SET_INSTALL_FLAG",
      payload: false,
    });
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // console.log(e);
      setInstallEvent(e);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    window.addEventListener("appinstalled", (event) => {
      localStorage.setItem("pwaInstalled", "1");
    });
  }, [setInstallEvent]);

  return (
    <div className="w-full sticky bottom-0 left-0 p-5 bg-gray-100">
      <span
        onClick={handleCloseClick}
        className="absolute right-1 top-1 cursor-pointer"
      >
        <HighlightOffIcon style={{ fontSize: 2 + "rem" }} />
      </span>
      <button
        className="py-2 px-5 bg-gray-800 mx-auto text-white"
        onClick={handleInstallClick}
      >
        Install App
      </button>
    </div>
  );
}

export default InstallPromt;
