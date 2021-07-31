import React from 'react';
import styled from 'styled-components';
import stripes from '../assets/images/stripes.svg';

const LogoStyles = styled.div`
  /* This value controls the entire size of the logo */
  --borderSize: 1em;
  display: flex;
  width: 30em;
  height: 30em;
  margin: 0;
  border: var(--borderSize) solid var(--white);
  background: var(--white) url(${stripes});
  background-size: 150em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-size: 6px;
  font-size: clamp(1px, 0.65vw, 8px);

  .inner {
    display: grid;
    flex: 1;
    grid-template-rows: 20% 1fr 1fr;
    align-content: center;
    margin: var(--borderSize);
    background: var(--white);
  }

  .est {
    align-self: center;
    font-size: 1.5em;
  }

  h1 {
    display: grid;
    grid-template-rows: 8fr 2fr;
    grid-row: 2 / span 2;
    grid-gap: 2em;
    align-items: center;
    margin: 0;
    transform: translateY(-0.7em);
  }

  .slices {
    font-size: 3.2em;
    letter-spacing: 0.2em;
    transform: translateY(-0.15em);
  }

  .slicks {
    display: block;
    text-shadow: 0.18em 0.18em 0 rgba(0, 0, 0, 0.05);
    transform: scale(1.4);
    perspective: 100px;
  }

  .letter {
    --scale: 1;
    --rotate: -10deg;
    --translateX: 0;
    --translateY: 0;
    --rotateX: 0deg;
    display: inline-block;
    color: var(--red);
    font-size: 5em;
    line-height: 1;
    transition: transform 0.3s;
    transform: scale(var(--scale)) rotate(var(--rotate)) translateX(var(--translateX)) translateY(var(--translateY))
      rotateX(var(--rotateX));

    &.S {
      --translateX: -0.05;
    }

    &.l {
      --rotate: 2deg;
      --scale: 1.4;
      --translateX: 0.05em;
      --translateY: -0.05em;
    }

    &.i {
      --scale: 0.9;
      --translateY: -0.1em;
      --translateX: 0.1em;
    }

    &.c {
      --rotate: 3deg;
      --scale: 0.9;
      --translateX: 0.1em;
      --translateY: 0.23em;
    }

    &.k {
      --rotate: -12deg;
      --scale: 1.2;
      --translateX: 0.06em;
    }

    &.apos {
      --translateX: 0.1em;
    }

    &.s {
      --rotate: 12deg;
      --scale: 0.9;
      --translateY: -0.14em;
    }
  }
`;

export default function Logo() {
  return (
    <LogoStyles className="logo">
      <div className="inner">
        <span className="est">EST 1994</span>
        <h1>
          <span className="slicks">
            <span className="letter S">S</span>
            <span className="letter l">l</span>
            <span className="letter i">i</span>
            <span className="letter c">c</span>
            <span className="letter k">k</span>
            <span className="letter apos">'</span>
            <span className="letter s">s</span>
          </span>
          <span className="slices">slices</span>
        </h1>
      </div>
    </LogoStyles>
  );
}
