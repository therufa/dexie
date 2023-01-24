import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps, AppType } from 'next/app'
import { api } from '../utils/api'
import '../styles/globals.css'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  withLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const withLayout = Component.withLayout ?? ((page) => page)

  return (
    <>
      {withLayout(<Component {...pageProps} />)}
    </>
  );
}

export default api.withTRPC(MyApp)
