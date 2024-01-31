/** @format */

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


/**
 * Combines multiple class names into a single string.
 * 
 * @param inputs - The class names to be combined.
 * @returns A string containing the combined class names.
 */
export function cn(...inputs: ClassValue[]){
  return twMerge(clsx(...inputs));
}