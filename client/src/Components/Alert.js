import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
const SHOW_ALERT = ({ status, message }) => {
  return (
    <>
      {message ? (
        <Alert status={status} borderRadius={2}>
          <AlertIcon />
          <AlertTitle mr={2}>{message}</AlertTitle>
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default SHOW_ALERT;
