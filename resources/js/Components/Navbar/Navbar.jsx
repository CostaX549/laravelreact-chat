import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css'
import { Link } from '@inertiajs/react';


const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>
    <p><a href="#wgpt3">O que é o UnitauChat?</a></p>
    <p><a href="#possibility">Equipes e Alunos</a></p>
    <p><a href="#features">Features</a></p>
    <p><a href="#blog">Tarefas</a></p>
  </>
)


const Navbar = ({ auth }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
         <div className="gpt3__navbar-links_logo">
          <img src="/assets/unitau (1).png" alt="logo" />
         </div>
         <div className="gpt3__navbar-links_container">
           <Menu />
         </div>
      </div>
      <div className="gpt3__navbar-sign">
      {auth.user ? ( 
     
     <Link href="/conversations"><button type="button">Dashboard</button></Link>
     
    ) : (
      <>
        <Link href="/login"><p>Login</p></Link>
        <Link href="/register"><button type="button">Registrar</button></Link>
      </>
    )}
     </div>
      <div className="gpt3__navbar-menu">
         {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
         }
         {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
          <Menu />
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
          {auth.user ? ( 
     
     <Link href="/conversations"><button type="button">Dashboard</button></Link>
     
    ) : (
      <>
         <Link href="/login"><p>Login</p></Link>
         <Link href="/register"><button type="button">Registrar</button></Link>
      </>
    )}
          </div>
        </div>
         )}
      
      </div>
    </div>
  )
}

export default Navbar;