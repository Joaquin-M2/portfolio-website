import Router from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Portfolio() {
    useEffect(() => {
        if (Router.pathname === '/portfolio') {
            Router.push('/portfolio/projects');
        }
    }, []);

    return (
        <>
            <Head>
                <title>Portfolio - JM2</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    );
}
