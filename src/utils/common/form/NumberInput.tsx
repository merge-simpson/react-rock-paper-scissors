import { CommonInputProps } from "@models/common/props";
import { forwardRef } from "react";

export interface NumberInputProps extends CommonInputProps {}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const { onChange, className, onKeyDown, ...restProps } = props;

    return (
      <input
        {...restProps}
        ref={ref}
        defaultValue={"0"}
        className={`border bg-gray-100 text-right px-2 py-4 text-2xl ${className}`}
        onKeyDown={(event) => {
          if ("backspace" === event.key.toLowerCase()) {
            // 변경되기 전 값을 알 수 있음.
            if ((event.target as HTMLInputElement).value === "-0") {
              (event.target as HTMLInputElement).value = "0";
            }
          }

          onKeyDown && onKeyDown(event);
        }}
        onChange={(event) => {
          const dotIndex = event.target.value.indexOf(".");
          const hyphenIndex = event.target.value.indexOf("-");
          if (hyphenIndex > 0) {
            // asserts 0, -1
            const primary = event.target.value.slice(0, hyphenIndex);
            const secondary = event.target.value
              .slice(hyphenIndex)
              .replace(/-/g, "");

            event.target.value = `-${secondary}${primary}`;
            return;
          }
          if (dotIndex !== event.target.value.lastIndexOf(".")) {
            const primary = event.target.value.slice(0, dotIndex);
            const secondary = event.target.value
              .slice(dotIndex)
              .replace(/\./g, "");

            event.target.value = `${primary}.${secondary}`;
            return;
          }
          if ("-.0" === event.target.value) {
            event.target.value = "-0.";
            return;
          }
          if (event.target.value.startsWith("-.0")) {
            event.target.value = "-0." + event.target.value.slice(2);
            return;
          }
          if (
            "-." === event.target.value.slice(0, dotIndex + 1).replace(/0/g, "")
          ) {
            event.target.value = "-0" + event.target.value.slice(dotIndex);
          }
          if (event.target.value.endsWith(".")) {
            return;
          }
          if (["-", "-0", "0-", "--"].includes(event.target.value)) {
            event.target.value = "";
            event.target.value = "-0";
            return;
          }
          if ([".0", "0.", ".", "-."].includes(event.target.value)) {
            event.target.value = "0.";
            return;
          }
          if ("00" === event.target.value) {
            event.target.value = "0";
            return;
          }
          if (event.target.value.endsWith("0")) {
            return;
          }

          const isNag = "-" === event.target.value.at(0); // can be sign(-)
          const abs = event.target.value.slice(+isNag);

          const value = +`${isNag ? "-" : ""}${abs.replace(/[^0-9\.]/g, "")}`;

          if (!value) {
            event.target.value = "0";
            return;
          }

          event.target.value = value.toLocaleString("ko-KR", {
            maximumFractionDigits: 20,
            minimumFractionDigits: 0,
          });

          onChange && onChange(event);
        }}
      />
    );
  }
);
export default NumberInput;
