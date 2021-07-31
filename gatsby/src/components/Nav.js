import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  /* margin-bottom: 3rem; */

  .logo {
    transform: translateY(-25%);
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    margin: 0;
    margin-top: -6rem;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  li {
    --rotate: -2deg;
    order: 1;
    transform: rotate(var(--rotate));

    &:nth-child(1) {
      --rotate: 1deg;
    }

    &:nth-child(2) {
      --rotate: -2.5deg;
    }

    &:nth-child(4) {
      --rotate: -2.5deg;
    }

    &:hover {
      --rotate: 3deg;
    }
  }

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }

    &[aria-current='page'] {
      /* anywhay to not have nav change red when home or logo is clicked? */
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Not Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/orders">Order</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
