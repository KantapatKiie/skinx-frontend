import { SearchModel } from "@/types";
import { NextResponse } from "next/server";

export async function GetAllPosted(token: string) {
  const res = await fetch("http://localhost:3001/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}

export async function GetPostedSearch(token: string, params: SearchModel) {
  const res = await fetch("http://localhost:3001/posts/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(params),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
