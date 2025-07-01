"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AuthCredentials } from "../../../../type/auth";
import GradientHoverTextField from "../../../components/ui/custom-textfield";
import CustomButton from "../../../components/ui/custom-button";
import { saveCredentials } from "../../../../utils/auth";

export default function SignInPage() {
  const [credentials, setCredentials] = useState(new AuthCredentials());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Reset field errors
    setFieldErrors({ email: false, password: false });

    if (!credentials.isValid()) {
      setError(
        "Please enter a valid email and password (minimum 6 characters)"
      );

      // Set field-specific errors
      setFieldErrors({
        email: !credentials.email || !credentials.email.includes("@"),
        password: !credentials.password || credentials.password.length < 6,
      });

      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      saveCredentials(credentials);
      router.replace("/dashboard");
    } catch (err) {
      setError("Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear field errors when user starts typing
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(new AuthCredentials(e.target.value, credentials.password));
    if (fieldErrors.email && e.target.value.length > 0) {
      setFieldErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(new AuthCredentials(credentials.email, e.target.value));
    if (fieldErrors.password && e.target.value.length > 0) {
      setFieldErrors((prev) => ({ ...prev, password: false }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const slideInFromLeft = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
  };

  const slideInFromRight = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <div className="flex items-center min-h-screen p-10">
      <Image
        src="/assets/bg01.jpg"
        alt="Background"
        fill
        className="object-cover -z-10"
      />

      <motion.div
        className="ml-[10rem] p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-[#5B7086] font-medium"
          variants={slideInFromLeft}
        >
          WELCOME!
        </motion.div>
        <motion.div
          className="text-[3rem] font-semibold mb-6"
          variants={itemVariants}
        >
          Log into your account.
        </motion.div>
        <motion.div className="text-[#5B7086] mb-10" variants={slideInFromLeft}>
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200"
          >
            Register
          </Link>
        </motion.div>
        <motion.form
          className="space-y-4 w-full max-w-lg mb-12"
          onSubmit={handleSubmit}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <GradientHoverTextField
              label="Your email"
              type="email"
              value={credentials.email}
              onChange={handleEmailChange}
              error={fieldErrors.email}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <GradientHoverTextField
              label="Your password"
              type="password"
              value={credentials.password}
              onChange={handlePasswordChange}
              error={fieldErrors.password}
            />
          </motion.div>
          {error && (
            <motion.div
              className="text-red-600 text-sm"
              variants={itemVariants}
            >
              {error}
            </motion.div>
          )}
        </motion.form>
        <motion.div
          className="flex items-center justify-end"
          variants={slideInFromRight}
        >
          <Link
            href="/forgot-password"
            className="font-light mr-6 text-[#5B7086] hovexr:text-blue-500 hover:underline transition-colors duration-200"
          >
            Forgot Password?
          </Link>
          <CustomButton
            label={isLoading ? "Signing in..." : "Sign In"}
            type="button"
            disabled={isLoading}
            onClick={() => {
              const form = document.querySelector("form");
              if (form) {
                const event = new Event("submit", {
                  bubbles: true,
                  cancelable: true,
                });
                handleSubmit(event as any);
              }
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
