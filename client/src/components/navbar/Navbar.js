import React, { useEffect, useState } from 'react';
import styles from './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ className, style, user }) => {
    const [navbar, setNavbar] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const changeNavbar = () => {
      if (window.scrollY > 0) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    }

    window.addEventListener('scroll', changeNavbar);

    function renderNavlinks() {
      return <>
        <Link to='/movies' className="hidden-link real-link">
          <div className='nav-link'>
            <span className='nav-item'>Movies</span>
          </div>
        </Link>
        <Link to='/shows' className="hidden-link real-link">
          <div className='nav-link'>
            <span className='nav-item'>Shows</span>
          </div>
        </Link>
      </>
    }

    const getNavState = () => {
      if (menuOpen && window.screen.width <- 768) {
        return 'solid';
      } else if (!navbar) {
        return 'transparent';
      }
      return ' solid '
    }

    const getIsShadow = () => {
      if (menuOpen || !navbar) {
        return '';
      }
      return ' shadow '
    }

    function renderLoginLinks() {
      return <>
        <Link to='/login' className="hidden-link real-link">
          <div className='nav-link'>
            <span className='nav-item'>Sign In</span>
          </div>
        </Link>
        <Link to='/register' className="hidden-link real-link">
          <div className='nav-link'>
            <span className='nav-item'>Become a Critic</span>
          </div>
        </Link>
      </>
    }

    function renderLoginButtons() {
      return <>
      < Link to='/register' className='hidden-link'>
              <div className='btn-signup'>
                <span className='signup-text'>Become</span>
                <span className='signup-text'> a Critic</span>
              </div>
        </Link>
        <Link to='/login' className='hidden-link'>
              <button className='btn-large'>
                <span className='btn-text'>Sign In</span>
              </button>
        </Link>
      </>
    }

    function renderUserButtons() {
      return <>
        <Link to={`/profile/${user.username}`} className='hidden-link'>
              <button className='btn-large'>
                <span className='btn-text'>{user.firstName}</span>
              </button>
        </Link>
      </>
    }

    return <div className={className + ' navbar ' + getNavState() + getIsShadow()} style={styles.Navbar}>
        <div className='nav-menu'>
          <div className={'menu-icon-container'+(menuOpen ? ' open' : '')} onClick={() => setMenuOpen(!menuOpen)}>
            <i className='fas fa-bars menu-icon'></i>
          </div>
          <div className={'menu '+(!menuOpen ? 'hidden' : '')}>
            <div className={"menu-links"}>
              {renderNavlinks()}
              {renderLoginLinks()}
            </div>
            <div className={'menu-cover'} onClick={() => setMenuOpen(false)}></div>
          </div>
          
        </div>
        <Link className='hidden-link logo-container' to='/'>
          <div className='logo'>
            <i className="fa fa-film icon" aria-hidden="true"></i>
            <span className='text'>Critic</span>
          </div>
        </Link>
        <div className='nav-main'>
          <div className='nav-left'>
            <div className='nav-links'>
              {renderNavlinks()}
            </div>
          </div>

          <div className='nav-right'>
            { !user.hasOwnProperty("username") ?
              renderLoginButtons()
              :
              renderUserButtons()
            }
          </div>
        </div>
        
    </div>
}

function mapStateToProps(state) {
  const data = {
    user: {...state.users.loggedOnUser}
  }
  return {
    user: data.user
  }
}

export default connect(mapStateToProps)(Navbar);