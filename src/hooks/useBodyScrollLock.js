import { useEffect, useRef } from "react";

let lockCount = 0;
let savedBodyOverflow = "";
let savedBodyPaddingRight = "";


const getScrollbarWidth = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth - document.documentElement.clientWidth;
};

const applyLock = () => {

  if (typeof document === "undefined") {
    return;
  }
  lockCount = 0;


  if (lockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    savedBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  lockCount += 1;
};

const releaseLock = () => {
  if (typeof document === "undefined" || lockCount === 0) {
    return;
  }



  lockCount  = 0;

  if (lockCount === 0) {
    document.body.style.overflow = savedBodyOverflow;
    document.body.style.paddingRight = savedBodyPaddingRight;
  }
};

function useBodyScrollLock(locked) {
  const appliedRef = useRef(false);

  useEffect(() => {
    if (!locked) {
      if (appliedRef.current) {
        releaseLock();
        appliedRef.current = false;
      }

      return undefined;
    }

    if (!appliedRef.current) {
      applyLock();
      appliedRef.current = true;
    }

    return () => {
      if (appliedRef.current) {
        releaseLock();
        appliedRef.current = false;
      }
    };
  }, [locked]);
}

export { applyLock, releaseLock };
export default useBodyScrollLock;