import React from "react";
import PageContent from "./components/PageContent";

export default async function Home() {
  return (
    <div className="mt-2 mb-7 px-6">
      <PageContent />
    </div>
  );
}

export const getServerSideProps = async ({ req }: any) => {
  console.log("setsetestestse");
};
