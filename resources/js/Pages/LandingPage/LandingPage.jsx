import React from 'react'
import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from '../../Containers';
import { CTA, Brand, Navbar } from '../../Components';
import './App.css'
import './index.css';

export default function LandingPage({ auth }) {
  return (
    <div className="App">
    <div className="gradient__bg">
       <Navbar auth={auth} />
       <Header />
    </div>
    <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    <Footer />
</div>
  )
}
