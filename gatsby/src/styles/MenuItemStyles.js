import styled from 'styled-components';

const MenuItemStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100px 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;

  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 1.5rem;
  }

  /* when there is a button that comes next to a button */

  button + button {
    margin-left: 1rem;
  }

  .remove {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    color: var(--red);
    box-shadow: none;
    font-size: 3rem;
    line-height: 1rem;
  }
`;

export default MenuItemStyles;
