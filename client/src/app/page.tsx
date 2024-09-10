"use client";
import React, { useEffect } from "react";
import Header from "./(routes)/admin/HomeAdmin/Header/Header";
import { useRouter } from "next/navigation";
export default function page() {
  const route = useRouter();
  useEffect(() => {
    route.push("/auth/login");
  }, []);
  return <div></div>;
}
