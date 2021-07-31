import React from 'react';
import 'normalize.css'; // reset
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto; /* if browser doesn't like clamp */
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  border: 5px solid var(--white);
  background: var(--white) url(${stripes});
  background-size: 1500px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);

  @media (max-width: 1100px) {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
`;

const ContentStyles = styled.div`
  padding: 2rem;
  background: var(--white);
`;

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // console.log(props);
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
