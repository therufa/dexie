import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../pages/_app'
import Layout from './layout'

const withLayout = (component: NextPageWithLayout) => {
  component.withLayout = (page: ReactElement) => {
    return (
      <Layout>{page}</Layout>
    )
  }

  return component
}

export default withLayout
