import React from "react";
import Header from "@/components/Header";
import PageContentLogin from "./components/PageContent";

export default async function Home() {
  return (
    <div className="mt-2 mb-7 px-6">
      <PageContentLogin />
    </div>
  );
}
