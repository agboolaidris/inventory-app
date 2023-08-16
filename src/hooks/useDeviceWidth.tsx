import { useEffect, useState } from "react";

export const useDeviceWidth = () => {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setDeviceWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceWidth;
};
