"use client"; // this is a client component

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import FileUploader from "./Upload";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold ">
      LMS CSV uploader.
      </h1>
      <FileUploader />
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="https://artba.sisense.com/app/main/dashboards/63e14901cde28c003326f83c">Open Dashboard</a>
    </main>
  );
}
