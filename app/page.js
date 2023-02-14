"use client"; // this is a client component

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import FileUploader from "./Upload";
import { Helmet } from 'react-helmet';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold ">
      LMS CSV Uploader
      </h1>
      <FileUploader />
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="https://artba.sisense.com/app/main/dashboards/63e14901cde28c003326f83c">Open Dashboard</a>

      <Helmet>
        <iframe width="100%" frameborder="0" src="https://artba.sisense.com/app/main/dashboards/6388e23d1254c600373039dc/widgets/63d938afcde28c003326e171?embed=true&r=true&l=true&t=true&h=true"></iframe>

      </Helmet>

    </main>
  );
}
