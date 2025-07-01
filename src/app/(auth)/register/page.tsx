"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GradientHoverTextField from "@/components/ui/custom-textfield";
import CustomButton from "@/components/ui/custom-button";
import { AuthCredentials } from "../../../../type/auth";
import { saveCredentials } from "../../../../utils/auth";

export default function RegisterPage() {
  const [credentials, setCredentials] = useState(new AuthCredentials());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!credentials.isValid()) {
      setError(
        "Please enter a valid email and password (minimum 6 characters)"
      );
      setIsLoading(false);
      return;
    }

    if (credentials.password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Save credentials same as signin
      saveCredentials(credentials);
      router.replace("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
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
        {/* Welcome Text */}
        <motion.div
          className="text-[#5B7086] font-medium"
          variants={slideInFromLeft}
        >
          WELCOME!
        </motion.div>

        {/* Main Title */}
        <motion.div
          className="text-[3rem] font-semibold mb-6"
          variants={itemVariants}
        >
          Create your account.
        </motion.div>

        {/* Sign in link */}
        <motion.div className="text-[#5B7086] mb-10" variants={slideInFromLeft}>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200"
          >
            Sign In
          </Link>
        </motion.div>

        {/* Form */}
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
              onChange={(e) =>
                setCredentials(
                  new AuthCredentials(e.target.value, credentials.password)
                )
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GradientHoverTextField
              label="Your password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials(
                  new AuthCredentials(credentials.email, e.target.value)
                )
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GradientHoverTextField
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {/* Bottom Section */}
        <motion.div
          className="flex items-center justify-end"
          variants={slideInFromRight}
        >
          <Link
            href="/forgot-password"
            className="font-light mr-6 text-[#5B7086] hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            Need Help?
          </Link>
          <CustomButton
            label={isLoading ? "Creating Account..." : "Register"}
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
