import HeadData from '../components/HeadData'
import HeadContent from '../components/HeadContent'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Home() {
  return (
    <>
      <Background />
      <HeadData />
      <HeadContent />
      <Footer />
    </>
  )
}
