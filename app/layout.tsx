import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My FrontEnd",
  description: "FrontEnd...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
          <Header>
            <div className="grid grid-rows-2 grid-flow-col gap-0">
              <div className="row-span-2 col-span-0">
                <h1 className="text-white text-3xl font-semibold animate-charcter">Webposted Online</h1>
              </div>
            </div>
          </Header>
          {children}
        </div>
      </body>
    </html>
  );
}
