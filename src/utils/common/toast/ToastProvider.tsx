import useToast from "@utils/common/toast/store/useToast";
import { HTMLProps, FunctionComponent as FC } from "react";
import { motion } from "framer-motion";

export interface BrowserToastProps extends HTMLProps<HTMLDivElement> {
  //
}

const ToastProvider: FC<BrowserToastProps> = (props) => {
  const { children } = props;
  const toast = useToast();

  return (
    <div>
      {toast.isOpen && (
        <motion.div
          className="fixed z-[999] top-3/4 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[50vw] bg-black bg-opacity-70 text-white rounded px-2 py-1 text-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1.0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          {toast.children}
        </motion.div>
      )}
      {children}
    </div>
  );
};

export default ToastProvider;
