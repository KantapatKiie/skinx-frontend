import { NextResponse } from "next/server";
import { LoginModel } from "@/types";

export async function Login(body: LoginModel) {
  const res = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzAwODMzOTg2LCJleHAiOjE3MDA4Mzc1ODZ9.MWQKMkBaOZqb4DTZ_P8Wj-zV28Ha2t2p_uzCvrMlW4o",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
