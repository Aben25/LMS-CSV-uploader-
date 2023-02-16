"use client"; // this is a client component

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import FileUploader from "./Upload";
import { Helmet } from 'react-helmet';
import Nav from "./Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main >
      <Nav/>
      <div class="flex flex-col p-4">
        <div class="flex flex-row  gap-x-8 ">
          <div class="w-1/4"><FileUploader/></div>
          <div class="w-1/2">To upload files, select either a CSV or ZIP file, and wait for the upload to complete. After a successful upload, view the data and reports in the dashboard. 


</div>
        </div>
      </div>
      </main>
  );
}
