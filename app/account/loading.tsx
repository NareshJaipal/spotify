"use client";

import Box from "@/components/Box";
import Loader from "@/components/Loader";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <Loader />
    </Box>
  );
};

export default Loading;
