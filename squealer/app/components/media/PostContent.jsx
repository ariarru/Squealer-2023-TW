import { useEffect, useRef } from "react";
import { useIntersection } from "./useIntersection";

export default function PostContent ({ callbackFn, children }) {
    const triggerRef = useRef(null);
    const isVisible = useIntersection(triggerRef, "0px");
  
    useEffect(() => {
      if (isVisible) {
        callbackFn(); // Trigger a function when the div is visible on view port
      }
    }, [callbackFn, isVisible]);
  
    return (
        <div ref={triggerRef} className="my-3 text-md">
            {children}
        </div>);
  };