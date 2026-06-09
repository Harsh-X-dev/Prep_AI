import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

// Default values shown

export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Helix size="89" speed="2.5" color="black" />
    </div>
  );
};
