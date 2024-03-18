import React from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Profiteer</title>
        <meta property="og:title" content="Profiteer" />
      </Helmet>
      <section className="home-hero">
        <div className="home-background">
          <img
            alt="image"
            src="https://i.imgur.com/IYm1Y6Z.png"
            className="home-image"
          />
        </div>
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
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu" className="home-mobile-menu">
            <div
              data-thq="thq-mobile-menu-nav"
              data-role="Nav"
              className="home-nav1"
            >
              <div className="home-container1">
                <h2 className="home-text03">OnConf</h2>
                <div data-thq="thq-close-menu" className="home-menu-close">
                  <svg viewBox="0 0 1024 1024" className="home-icon02">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav
                data-thq="thq-mobile-menu-nav-links"
                data-role="Nav"
                className="home-nav2"
              >
                <span className="navLink home-text04">About</span>
                <span className="navLink home-text05">Features</span>
                <span className="navLink home-text06">Pricing</span>
                <span className="navLink home-text07">Team</span>
                <span className="navLink home-text08">Blog</span>
              </nav>
              <div className="home-button-container">
                <button className="home-login button">Login</button>
                <button className="button home-register2">Register</button>
              </div>
              <div className="home-icon-group">
                <div className="home-icons">
                  <svg
                    viewBox="0 0 950.8571428571428 1024"
                    className="home-icon04"
                  >
                    <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 877.7142857142857 1024"
                    className="home-icon06"
                  >
                    <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 602.2582857142856 1024"
                    className="home-icon08"
                  >
                    <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <img
              alt="image"
              src="/quote-background.svg"
              className="home-background1"
            />
          </div>
        </header>
        <div className="home-container2">
          <div className="home-hero-content">
            <div className="home-container3">
              <div className="home-container4">
                <div className="home-caption"></div>
              </div>
              <img
                alt="image"
                src="/profiteertext-200h.png"
                className="home-image1"
              />
            </div>
            <h1 className="home-text09">A New Financial Frontier</h1>
            <Link
              to="/register"
              className="home-register3 button button-style-2"
            >
              <span className="home-text10">Register now</span>
              <svg viewBox="0 0 1024 1024" className="home-icon10">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </Link>
          </div>
          <img
            alt="image"
            src="https://media.discordapp.net/attachments/1197952780447514785/1215436307057090620/profiteerguy.png?ex=65fcbe45&amp;is=65ea4945&amp;hm=53f8ac60237576b3b73dceb60f65e0df0f9456df82671882e3e5ee9a8bb9dc4d&amp;=&amp;format=webp&amp;quality=lossless"
            className="home-image2"
          />
        </div>
      </section>
      <div className="home-second">
        <animate-on-reveal
          animation="fadeIn"
          duration="300ms"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <div
            data-aos="fade-up-left"
            data-thq-animate-on-reveal="true"
            className="home-content"
          >
            <h1 className="home-text11">Meet Your Financial Goals</h1>
            <span className="home-text12">
              Through Profiteer, meeting financial goals has never been easier.
              The Profiteer web application allows you to add your own financial
              goals, whether it’s saving up for a car or wanting to reduce
              unnecessary spending overall. Profiteer can connect to your
              financial institution (opt-in) to provide personalized
              recommendations based on your unique financial situation. Sign up
              now to access the dashboard and begin the journey on your new
              financial frontier!
            </span>
          </div>
        </animate-on-reveal>
        <animate-on-reveal
          animation="fadeIn"
          duration="3s"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <img
            alt="image"
            src="/_eac2bdf1-0d77-466f-a545-97bc42988d6d-1500h.jpg"
            data-thq-animate-on-reveal="true"
            className="home-image3 image-notes"
          />
        </animate-on-reveal>
      </div>
      <div className="home-first">
        <animate-on-reveal
          animation="fadeIn"
          duration="300ms"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <div
            data-aos="fade-up-right"
            data-thq-animate-on-reveal="true"
            className="home-content1"
          >
            <h1 className="home-text13">Gamified Budgeting</h1>
            <p className="home-text14">
              Profiteer makes the rigorous journey of finance much more
              enjoyable. Understanding the intricacies of finance can be
              difficult for some, if not most. Through Gamified Budgeting,
              Profiteer allows you to improve your financial habits in a fun and
              easy to understand way. Profiteer will also analyze your personal
              financial information and provide a complete budgeting plan to
              allow you to have great budgeting habits and therefore have a
              sustainable future.
            </p>
          </div>
        </animate-on-reveal>
        <animate-on-reveal
          animation="fadeIn"
          duration="3s"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <img
            alt="image"
            src="/_946eeef7-2461-4292-b5af-c32610e69038-1500w.jpg"
            data-thq-animate-on-reveal="true"
            className="home-image4 image-notes"
          />
        </animate-on-reveal>
      </div>
      <div className="home-first1">
        <animate-on-reveal
          animation="fadeIn"
          duration="3s"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <img
            alt="image"
            src="/_71708491-a3b1-48e4-83ae-4b779164ca6b-700h.jpg"
            data-thq-animate-on-reveal="true"
            className="home-image5 image-notes"
          />
        </animate-on-reveal>
        <animate-on-reveal
          animation="fadeIn"
          duration="300ms"
          delay="0s"
          direction="normal"
          easing="ease"
          iteration="1"
        >
          <div
            data-aos="fade-up-right"
            data-thq-animate-on-reveal="true"
            className="home-content2"
          >
            <h2 className="home-header">Connect With Friends</h2>
            <div className="home-list">
              <p className="home-text15">
                Have you ever wondered if your financial habits are better than
                those of your peers? With Profiteer, you can connect with your
                friends and compare your financial habits without compromising
                privacy or revealing any personal financial information.
                Profiteer will automatically convert your weekly financial
                habits to a point-based system, which can then be compared with
                friends on the Leaderboard.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </p>
            </div>
          </div>
        </animate-on-reveal>
      </div>
      <div className="home-social-bar">
        <span className="home-text16">© Profiteer 2024</span>
      </div>
    </div>
  )
}

export default Home
