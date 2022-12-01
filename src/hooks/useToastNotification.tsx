import { useToast } from "@chakra-ui/react";
import { handleToastT, asyncToastT } from "./types/notification.types";
/**
 *
 * @returns handleToast, handleErrorToast, handleAsyncToast
 * meant to handle dinamyc feedback for the user
 */
const useToastNotification = () => {
  const toast = useToast();

  const handleToast: handleToastT = (
    status = "info",
    content,
    duration = 3000
  ) => {
    const id = content.title.trim();
    if (!toast.isActive(id))
      toast({
        id,
        title: content.title,
        description: content.description,
        status: status,
        position: "bottom-left",
        duration,
        isClosable: true,
      });
  };

  // Used to handle server errors
  const handleErrorToast = (error: {
    response: { status: any; data: { error: any } };
    message: string;
  }) => {
    handleToast("error", {
      title: `Ha ocurrido un error ${error.response.status || error}`,
      description: `${error.response.data.error || error.message}`,
    });
  };

  // const golfMoji = () => {
  //   const successMojis = ['🥳', '✨', '🎊', '😎'];
  //   const randomMoji =
  //     successMojis[Math.floor(Math.random() * successMojis.length)];
  //   return randomMoji;
  // };

  const handleAsyncToast: asyncToastT = async (callBack, msg, loadMsg) => {
    /**
     * @params
     * - callBack: API consuming function called
     * - msg: Success message
     * - loadMsg: message while loading
     * @returns async response || False
     * handles an async request and notifies user of its status while its processing
     */
    handleToast("loading", {
      title: loadMsg,
      description: "",
    });
    const res = await callBack;
    if (String(res.status)[0] === "2") {
      toast.close(loadMsg.trim());
      handleToast("success", {
        title: msg.title,
        description: msg.description,
      });
      return res;
    } else {
      toast.close(loadMsg.trim());
      handleToast("error", {
        title: `Ha ocurrido un problema ${res.status}`,
        description: `${res.data?.error || res.error}`,
      });
      return false;
    }
  };

  return { handleToast, handleErrorToast, handleAsyncToast };
};

export default useToastNotification;
