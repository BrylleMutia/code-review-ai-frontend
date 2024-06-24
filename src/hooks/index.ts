import React, { useEffect } from "react";
import { Prompt } from "../services/ReviewService.types";

const useScrollIntoView = (
   ref: React.RefObject<HTMLDivElement>,
   promptResponses: Prompt[] | null
) => {
   useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
   }, [promptResponses]);
};

export { useScrollIntoView };
