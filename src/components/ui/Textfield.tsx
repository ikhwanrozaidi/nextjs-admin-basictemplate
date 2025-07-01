"use client";
import { useState, forwardRef } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "outline";
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label = "Your email", variant = "default", className = "", ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const baseClasses = `
      w-full px-4 py-3 rounded-2xl bg-transparent border-2 transition-all duration-300 ease-in-out
      text-gray-100 placeholder-gray-400 outline-none font-inter
    `;

    const defaultClasses = `
      border-gray-600
      hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:placeholder-blue-400
      focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 focus:placeholder-blue-400
    `;

    const combinedClasses =
      `${baseClasses} ${defaultClasses} ${className}`.trim();

    return (
      <div className="relative">
        <input
          ref={ref}
          className={combinedClasses}
          placeholder={label}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onMouseEnter={(e) => {
            setIsHovered(true);
            props.onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            setIsHovered(false);
            props.onMouseLeave?.(e);
          }}
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
