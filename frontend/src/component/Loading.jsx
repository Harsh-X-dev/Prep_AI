import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

export const Loading = ({ message = false }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Helix size="89" speed="2.5" color="black" />
      
      {/* Conditionally render the text if message is true */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-500">
          This may take a few minutes. Please wait...
        </p>
      )}
    </div>
  );
};
