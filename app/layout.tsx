import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ระบบจัดการตารางเรียน-สอน",
  description: "ระบบช่วยจัดตารางเรียนและตารางสอนสำหรับสถาบันการศึกษา",
  keywords: ["ตารางเรียน", "ตารางสอน", "การศึกษา", "มหาวิทยาลัย"],
  authors: [
    { name: "พิศลย์ อุตตาลกาญจนา" },
    { name: "ภัทรภร จิตต์ปราณี" }
  ],
  openGraph: {
    title: "ระบบจัดการตารางเรียน-สอน",
    description: "ระบบช่วยจัดตารางเรียนและตารางสอนสำหรับสถาบันการศึกษา",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${notoSansThai.variable} antialiased`}
        style={{
          fontFamily: 'var(--font-noto-sans-thai), sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
