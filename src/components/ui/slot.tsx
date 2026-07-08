"use client";

import { cloneElement, isValidElement, Children, forwardRef } from "react";
import { cn } from "@/lib/utils";

/** Minimal Slot: merges props onto a single child element (asChild pattern). */
export const Slot = forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, unknown>>(
  ({ children, ...props }, ref) => {
    if (!isValidElement(children)) return null;
    const child = Children.only(children) as React.ReactElement<Record<string, unknown>>;
    const childProps = child.props;
    return cloneElement(child, {
      ...props,
      ...childProps,
      ref,
      className: cn(props.className as string, childProps.className as string),
    });
  },
);
Slot.displayName = "Slot";
