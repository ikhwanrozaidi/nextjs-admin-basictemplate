"use client";

import { forwardRef } from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ label, type = "button", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`px-10 py-4 rounded-full bg-[#4297F1] text-white text-m font-normal hover:bg-[#255588] transition duration-200 ${className}`}
        {...props}
      >
        {label}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
