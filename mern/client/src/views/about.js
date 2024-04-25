import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import TestimonialCard1 from '../components/testimonial-card1'
import './about.css'

const About = (props) => {
  return (
    <div className="about-container">
      <Helmet>
        <title>About - Profiteer</title>
        <meta property="og:title" content="About - Profiteer" />
      </Helmet>
      <div className="about-testimonial">
        <div className="about-container1">
          <h1 className="about-text profiteerheadings">
            <span className="about-text01">Meet the Profiteers</span>
            <br></br>
          </h1>
          <span className="about-text03 profiteerheadings">
            We are students at the University of Florida who are dedicated to
            saving our users money and setting them up for future financial
            freedom!
          </span>
          <div className="about-container2">
            <TestimonialCard1
              name="Drew Reisner"
              role="Frontend Developer"
              quote="Hi, I'm Drew Reisner and I'm currently a Junior studying Computer Engineering at the University of Florida working on the frontend development of Profiteer. I'm very interested in computer hardware engineering, computer networking, and artificial intelligence. In my free time, I enjoy hiking, bike rides, video games, movies, and spending time with friends and family. I hope you have a successfully financial journey with Profiteer!"
              pictureSrc="https://media.licdn.com/dms/image/D5603AQETcimmIQJ-KA/profile-displayphoto-shrink_800_800/0/1685456283757?e=1715817600&amp;v=beta&amp;t=qCrkP6Yqqx5PfSvnGsCDF4qzbZt2pP6XSjXrwumGhgg"
              rootClassName="rootClassName2"
            ></TestimonialCard1>
            <TestimonialCard1
              name="Jacob Hoppenstedt"
              role="Frontend Developer"
              quote="Hey, I'm Jacob Hoppenstedt, a sophomore computer science major at the University of Florida and one of the frontend developers for Profiteer! I am currently interested in AI/Machine Learning and learning more about how to apply them to my projects. Outside of school, I like making music, working out, and hanging with friends. I hope you join us on this exciting journey to make your financial goals a reality!"
              pictureSrc="https://i.imgur.com/1gJcfZ9.jpg"
              rootClassName="rootClassName"
            ></TestimonialCard1>
            <TestimonialCard1
              name="Trevor Gross"
              role="Backend Developer"
              quote="Howdy! My name is Trevor Gross and I am a second year computer science major at the University of Florida. With Profiteer, I am in charge of the database, but also spend a considerable amount of time in the backend, too. I have been pursuing AI/ML for the past few semesters, and plan on working as a ML Engineer in my career. Other than CS, I am studying German, am very passionate about traveling, and am always listening to music. We are excited you have chosen to use Profiteer on your quest to great savings!"
              pictureSrc="https://i.imgur.com/PVgjcDi.jpg"
              rootClassName="rootClassName3"
            ></TestimonialCard1>
            <TestimonialCard1
              name="Nathaniel Babione"
              role="Backend Developer"
              quote="Hello, I'm Nathaniel Babione. I am a Junior Computer Engineering student at the University of Florida. I am a developer for Profiteer and mainly work on developing the backend. I would like to specialize in computer graphics or some kind of artificial intelligence as I have found these topics to be very interesting. I also like speed solving Rubik's Cubes, playing guitar, and doing stuff with friends. Thanks for choosing Profiteer and I hope you can achieve your financial freedom!"
              pictureSrc="https://i.imgur.com/OwBJcr2.jpg"
              rootClassName="rootClassName1"
            ></TestimonialCard1>
          </div>
          <header data-thq="thq-navbar" className="about-navbar">
            <Link to="/" className="about-navlink">
              <h2 className="about-text04">Profiteer</h2>
            </Link>
            <div
              data-thq="thq-navbar-nav"
              data-role="Nav"
              className="about-desktop-menu"
            >
              <nav
                data-thq="thq-navbar-nav-links"
                data-role="Nav"
                className="about-nav"
              >
                <Link to="/about" className="about-link navLink">
                  About Us
                </Link>
              </nav>
              <Link to="/sign-in" className="about-register button">
                <span className="about-text05">Log In</span>
              </Link>
              <Link to="/register" className="about-register1 button">
                <span className="about-text06">Sign Up</span>
              </Link>
            </div>
            <div data-thq="thq-burger-menu" className="about-burger-menu">
              <svg viewBox="0 0 1024 1024" className="about-icon">
                <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
            <div data-thq="thq-mobile-menu" className="about-mobile-menu">
              <div
                data-thq="thq-mobile-menu-nav"
                data-role="Nav"
                className="about-nav1"
              >
                <div className="about-container3">
                  <div data-thq="thq-close-menu" className="about-menu-close">
                    <svg viewBox="0 0 1024 1024" className="about-icon02">
                      <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                    </svg>
                  </div>
                </div>
                <div className="about-button-container">
                  <button className="about-login button">Login</button>
                  <button className="button about-register2">Register</button>
                </div>
                <div className="about-icon-group">
                  <div className="about-icons">
                    <svg
                      viewBox="0 0 950.8571428571428 1024"
                      className="about-icon04"
                    >
                      <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 877.7142857142857 1024"
                      className="about-icon06"
                    >
                      <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 602.2582857142856 1024"
                      className="about-icon08"
                    >
                      <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img
                alt="image"
                src="/quote-background.svg"
                className="about-background"
              />
            </div>
          </header>
          <span className="about-text13">© Profiteer 2024</span>
        </div>
      </div>
    </div>
  )
}

export default About
