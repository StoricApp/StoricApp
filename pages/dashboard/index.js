import Head from 'next/head'
import DashboardView from '../../src/views/Shell/Dashboard'
import PrivateViewHOC from '../../src/views/components/PrivatePageHOC'

const Dashboard = () => {

  return(
    <>
      <Head>
        <title>Storic | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrivateViewHOC>
        <DashboardView />
      </PrivateViewHOC>
    </>
  )
}

export default Dashboard