import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  fieldset {
    display: grid;
    grid-column: span 2;
    gap: 1rem;
    align-content: start;
    overflow: auto;
    max-height: 600px;

    &.menu,
    &.order {
      grid-column: span 1;
    }

    /* &menu (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
  }

  .blackhole {
    display: none;
  }
`;

export default OrderStyles;
