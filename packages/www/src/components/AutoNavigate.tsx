import { useState } from "react";

export default function AutoNavigate() {
  const [autoNavigate, toggleAutoNavigate] = useState(false);

  return null;
  // return (
  //   <button
  //     className="btn-xs btn w-full bg-base-300 normal-case sm:btn-md"
  //     onClick={() => toggleAutoNavigate(!autoNavigate)}
  //   >
  //     {autoNavigate ? "Navigating..." : "Start Auto Navigate"}
  //   </button>
  // );
}
