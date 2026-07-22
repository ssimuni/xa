"use client";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
export function MotionProvider({children}:{children:ReactNode}){return <MotionConfig reducedMotion="user" transition={{duration:.45,ease:[.16,1,.3,1]}}>{children}</MotionConfig>}
