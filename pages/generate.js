import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

import QRCode from 'qrcode'

var opts = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.3,
  margin: 1,
  color: {
    dark:"#010599FF",
    light:"#FFBF60FF"
  }
}

export default function Generate() {
    const router = useRouter();
    
    const [ generatedImg, setGeneratedImg ] = useState("/icon-192x192.png");
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    // let text = "test"
    // With promises
    const generate = (text) =>  QRCode.toDataURL(text, opts)
        .then(url => {
        console.log(url);
        setGeneratedImg(url)
        })
        .catch(err => {
        console.error(err)
        });
    const submitData = async (event) => {
        event.preventDefault();
        // alert(`${window.location} ${router.query} ${event.target.name.value} ${event.target.warna.value} ?`);
        console.log(window.location)
        generate(`${window.location.origin}/detail?name=${event.target.name.value}&warna=${event.target.warna.value}`)
    };
    
    return (
        <div className={styles.container}>
        <Head>
            <title>Generate Link</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
            Generate QR CODE
            </h1>

            <div className="max-w-xs my-2 overflow-hidden rounded shadow-lg">
                <div className="px-6 py-4">
                    <div className="mb-2 text-xl font-bold">Info Barang</div>
                    <form className="flex flex-col" onSubmit={submitData} >
                    <div>
                        <label htmlFor="name" className="mb-2 italic">Name</label>
                        <input
                            className="mb-4 border-b-2"
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                        />
                    </div>
                    <div>
                    <label htmlFor="warna" className="mb-2 italic">Warna</label>
                    <input
                        className="mb-4 border-b-2"
                        id="warna"
                        name="warna"
                        type="text"
                        autoComplete="warna"
                        required
                    />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info px-4 py-2 font-bold text-white"
                        // onClick={() => generateQR("http://10.0.255.6:3000/")} 
                    >
                        Generate
                    </button>
                    </form>
                </div>
            </div>
            <div>
            <Image src ={generatedImg} alt="image"width={200} height={200} />
            </div>
        </main>
        </div>
    )
}
