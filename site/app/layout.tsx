import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Hub",
  description: "Ai匠坞 · AJW.CN Project Hub — 8 个产品入口与公开源码状态复核",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
