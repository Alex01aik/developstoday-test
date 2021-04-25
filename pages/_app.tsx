import { AppProps } from 'next/app'
import MainLayout from '../layouts/MainLayout'
import NextNprogress from 'nextjs-progressbar'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextNprogress
          color="#007D69"
          startPosition={0.3}
          stopDelayMs={200}
          height={3} />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}

export default MyApp