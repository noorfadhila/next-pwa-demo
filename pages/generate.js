import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import QRCode from 'qrcode'

export default function Generate() {
    
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
    
    const [ generatedImg, setGeneratedImg ] = useState("/icon-192x192.png");
    const generate = (text) =>  QRCode.toDataURL(text, opts)
        .then(url => {
            setGeneratedImg(url)
        })
        .catch(err => {
            setGeneratedImg("/icon-192x192.png")
        });
    const submitData = async (event) => {
        event.preventDefault();
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
