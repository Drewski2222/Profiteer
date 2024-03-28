import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import './home.css'
import ParticlesComponent from './particlesConfig.js'


const Home = (props) => {

  return (
    <div className="home-container">
      <Helmet>
        <title>Profiteer</title>
        <meta property="og:title" content="Profiteer" />
      </Helmet>
      <div className="home-hero">
      <ParticlesComponent />
        <header data-thq="thq-navbar" className="home-navbar">
          <Link to="/" className="home-navlink">
            <h2 className="home-text">Profiteer</h2>
          </Link>
        
          <div
            data-thq="thq-navbar-nav"
            data-role="Nav"
            className="home-desktop-menu"
          >
            <nav
              data-thq="thq-navbar-nav-links"
              data-role="Nav"
              className="home-nav"
            >
              <Link to="/about" className="home-link navLink">
                About Us
              </Link>
            </nav>
            <Link to="/sign-in" className="home-register button">
              <span className="home-text01">Log In</span>
            </Link>
            <Link to="/register" className="home-register1 button">
              <span className="home-text02">Sign Up</span>
            </Link>
          </div>
          

        </header>
        <div className="home-container2">
          <div className="home-hero-content">
            <div className="home-container3">
              <div className="home-container4">
                <div className="home-caption"></div>
              </div>
              <motion.img
                alt="image"
                src="/profiteertext-200h.png"
                className="home-image1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 0.75 }}
                transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
              />
            </div>
            <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
            whileHover={{scale:0.75}}
             className="home-text09">A New Financial Frontier</motion.h1>
            <Link
              to="/register"
              className="home-register3 button button-style-2"
            >
              <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
               className="home-text10">Register now</motion.span>
              <motion.svg
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
              viewBox="0 0 1024 1024" className="home-icon10">
                <path 
                d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </motion.svg>
            </Link>
          </div>
          <motion.img 
          initial={{opacity:0 }}
          whileInView={{opacity: 1}}
          whileHover={{scale: 0.75}} 
          transition = {{duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9]}}
            alt="image"
            src="/profiteerguy.png"
            className="home-image2"
          />
        </div>
      </div>
      <div className="home-second">
          <div
            className="home-content"
          >

            <motion.h1 
            initial={{opacity:0, scale:0 }} 
            whileInView={{opacity: 1, scale: 1}} 
            transition = {{duration: 0.6}} 
            className="home-text11">
              Meet Your Financial Goals
              </motion.h1>

            <motion.p initial={{opacity:0, scale:0 }} 
            whileInView={{opacity: 1, scale: 1}} 
            transition = {{duration: 0.6}} 
            className="home-text12">
              Through Profiteer, meeting financial goals has never been easier.
              The Profiteer web application allows you to add your own financial
              goals, whether it’s saving up for a car or wanting to reduce
              unnecessary spending overall. Profiteer can connect to your
              financial institution (opt-in) to provide personalized
              recommendations based on your unique financial situation. Sign up
              now to access the dashboard and begin the journey on your new
              financial frontier!
            </motion.p>
          </div>

          <motion.img
          initial={{opacity:0, scale:0 }} 
          whileInView={{opacity: 1, scale: 1}} 
          transition = {{duration: 0.6}} 
            alt="image"
            src="/_eac2bdf1-0d77-466f-a545-97bc42988d6d-1500h.jpg"
            className="home-image3 image-notes"
          />
      </div>
      <div className="home-first">
          <div
            className="home-content1"
          >
            <motion.h1 
            initial={{opacity:0, scale:0 }} 
            whileInView={{opacity: 1, scale: 1}} 
            transition = {{duration: 0.6}} 
            className="home-text13">
              Gamified Budgeting
              </motion.h1>
            <motion.p 
            initial={{opacity:0, scale:0 }} 
            whileInView={{opacity: 1, scale: 1}} 
            transition = {{duration: 0.6}} 
            className="home-text14">
              Profiteer makes the rigorous journey of finance much more
              enjoyable. Understanding the intricacies of finance can be
              difficult for some, if not most. Through Gamified Budgeting,
              Profiteer allows you to improve your financial habits in a fun and
              easy to understand way. Profiteer will also analyze your personal
              financial information and provide a complete budgeting plan to
              allow you to have great budgeting habits and therefore have a
              sustainable future.
            </motion.p>
          </div>
          <motion.img
          initial={{opacity:0, scale:0 }} 
          whileInView={{opacity: 1, scale: 1}} 
          transition = {{duration: 0.6}} 
            alt="image"
            src="/_946eeef7-2461-4292-b5af-c32610e69038-1500w.jpg"
            className="home-image4 image-notes"
          />
      </div>
      <div className="home-first1">
          <motion.img
          initial={{opacity:0, scale:0 }} 
          whileInView={{opacity: 1, scale: 1}} 
          transition = {{duration: 0.6}} 
            alt="image"
            src="/_71708491-a3b1-48e4-83ae-4b779164ca6b-700h.jpg"
            className="home-image5 image-notes"
          />
          <div
            className="home-content2"
          >
            <motion.h2 
            initial={{opacity:0, scale:0 }} 
            whileInView={{opacity: 1, scale: 1}} 
            transition = {{duration: 0.6}} 
            className="home-header">Connect With Friends</motion.h2>
            <div className="home-list">
              <motion.p 
              initial={{opacity:0, scale:0 }} 
              whileInView={{opacity: 1, scale: 1}} 
              transition = {{duration: 0.6}} 
              className="home-text15">
                Have you ever wondered if your financial habits are better than
                those of your peers? With Profiteer, you can connect with your
                friends and compare your financial habits without compromising
                privacy or revealing any personal financial information.
                Profiteer will automatically convert your weekly financial
                habits to a point-based system, which can then be compared with
                friends on the Leaderboard.
              </motion.p>
            </div>
          </div>
      </div>
      <div className="home-social-bar">
        <span className="home-text16">© Profiteer 2024</span>
      </div>
    </div>
  )
}

export default Home
