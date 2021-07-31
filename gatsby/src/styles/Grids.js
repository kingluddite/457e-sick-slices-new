import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  gap: 2rem;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

/* Single Grid Item (for home page) */
export const ItemStyles = styled.div`
  @keyframes shine {
    from {
      background-position: 200%;
    }

    to {
      background-position: -40px;
    }
  }

  position: relative;
  text-align: center;

  img {
    height: auto;
    font-size: 0;
  }

  p {
    position: absolute;
    left: 0;
    width: 100%;
    transform: rotate(-2deg) translateY(-140%);
  }

  .mark {
    display: inline;
  }

  img.loading {
    --shine: var(--white);
    --background: var(--grey);
    background-image: linear-gradient(90deg, var(--background) 0px, var(--shine) 40px, var(--background) 80px);
    background-size: 500px;
    animation: shine 1s infinite linear;
  }
`;
