"use client";

import { useState, forwardRef, useEffect } from "react";

interface GradientHoverTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "default" | "outline";
  error?: boolean;
}

const GradientHoverTextField = forwardRef<
  HTMLInputElement,
  GradientHoverTextFieldProps
>(
  (
    {
      label = "Your email",
      variant = "default",
      className = "",
      error = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [internalValue, setInternalValue] = useState("");

    // Determine if component is controlled and calculate hasValue
    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? String(props.value) : internalValue;
    const hasValue = currentValue.length > 0;

    // Base styles for the input
    const baseClasses = `
      w-full px-4 pt-6 pb-2 rounded-2xl bg-transparent border-2 transition-all duration-300 ease-in-out
      text-gray-100 outline-none font-inter
    `;

    // Default styles (non-error state)
    const defaultClasses = `
      border-gray-600
      hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20
      focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20
    `;

    // Error styles
    const errorClasses = `
      border-red-500
      hover:border-red-400 hover:shadow-lg hover:shadow-red-500/20
      focus:border-red-400 focus:shadow-lg focus:shadow-red-500/20
    `;

    // Determine input classes based on error state and hasValue
    const getInputClasses = () => {
      if (error && !hasValue) {
        return `${baseClasses} ${errorClasses} ${className}`.trim();
      }
      return `${baseClasses} ${defaultClasses} ${className}`.trim();
    };

    // Determine label classes based on state
    const getLabelClasses = () => {
      const baseLabel =
        "absolute left-4 transition-all duration-300 ease-in-out pointer-events-none";
      const sizePosition =
        isFocused || isHovered || hasValue
          ? "text-xs top-2"
          : "text-base top-3";

      // Error state label (only when field is empty)
      if (error && !hasValue) {
        return `${baseLabel} text-red-400 ${sizePosition}`;
      }

      // Normal state label colors
      if (isFocused || isHovered) {
        return `${baseLabel} text-blue-400 ${sizePosition}`;
      }

      return `${baseLabel} text-gray-400 ${sizePosition}`;
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update internal value if not controlled
      if (!isControlled) {
        setInternalValue(e.target.value);
      }

      // Call parent's onChange handler
      props.onChange?.(e);
    };

    // Handle ref forwarding and initial value setup
    const handleInputRef = (element: HTMLInputElement | null) => {
      if (element && element.value && !isControlled) {
        setInternalValue(element.value);
      }

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Sync internal state with controlled value
    useEffect(() => {
      if (isControlled && props.value !== undefined) {
        // No need to update internal state for controlled components
        // hasValue is already derived from props.value
      }
    }, [isControlled, props.value]);

    return (
      <div className="relative">
        <input
          ref={handleInputRef}
          className={getInputClasses()}
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
          onChange={handleInputChange}
          {...props}
        />
        <label className={getLabelClasses()}>{label}</label>
      </div>
    );
  }
);

GradientHoverTextField.displayName = "GradientHoverTextField";

export default GradientHoverTextField;
