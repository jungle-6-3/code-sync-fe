import { Wifi, WifiOff } from "lucide-react";
import { useState } from "react";

const TopGNBWifiStatus = () => {
  const [wifiStatus] = useState(true);

  return (
    <li>
      {wifiStatus ? (
        <Wifi color="#334155" size={16} />
      ) : (
        <WifiOff color="#334155" size={16} />
      )}
    </li>
  );
};

export default TopGNBWifiStatus;
