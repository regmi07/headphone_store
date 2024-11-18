import React from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div>
      <div className='layout'>
        <Head>
          <title>E-commerce store</title>
        </Head>
        <header>
          <NavBar />
        </header>
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export default Layout