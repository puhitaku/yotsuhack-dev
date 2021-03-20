import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const ogImageUrl = 'https://yotsuhack.dev/og-image2.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} YOTSUHACK.DEV</title>
        <meta name="description" content="YOTSUHACK by Takumi Sueda." />
        <meta name="og:title" content="YOTSUHACK.DEV" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@puhitaku" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
    </header>
  )
}
