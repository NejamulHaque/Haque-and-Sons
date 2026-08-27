"use client";
import { useEffect } from "react";

export function Tracker() {
  useEffect(() => {
    // Fire and forget
    fetch("/api/track").catch(console.error);
  }, []);
  return null;
}