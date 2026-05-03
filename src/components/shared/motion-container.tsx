"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  fadeUp,
  sectionViewport,
  smoothTransition,
  staggerContainer,
} from "@/lib/motion";

type MotionContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
};

export function MotionContainer({
  children,
  className,
  stagger = false,
}: MotionContainerProps) {
  return (
    <motion.div
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      transition={smoothTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}