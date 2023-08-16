import { useEffect, useRef } from "react";

export const useScrollToEnd = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth + 1000,
        behavior: "smooth",
      });
    }
  }, [ref.current?.scrollWidth]);

  return ref;
};

export const useScrollToBottom = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref.current?.scrollHeight]);

  return ref;
};
