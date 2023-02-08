import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: ${props => {
    return props.dark ? `var(--darkModeThirdBackgroundColor)` : `var(--white)`
  }};
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
    color: ${props => {
    return props.dark ? `var(--darkModeTextColor)` : `var(--textColor)`
  }};
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    color: ${props => {
    return props.dark ? `var(--darkModeTextColor)` : `var(--textColor)`
  }};
    background: ${props => {
    return props.dark ? `var(--darkModeThirdBackgroundColor)` : `var(--white)`
  }};
  }
  .form-row {
    margin-bottom: 0;
    input, select {
      background-color: ${props => {
    return props.dark ? `var(--darkModeBackgroundColor)` : `var(--white)`
  }};
      color: ${props => {
    return props.dark ? `var(--darkModeTextColor)` : `var(--black)`
  }};
    }
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: ${props => {
    return props.dark ? `var(--darkModeTextColor)` : `var(--black)`
  }};
  }
  .small-text {
    font-size: 0.875em;
    margin-top: 2rem;
    color: ${props => {
    return props.dark ? `var(--darkModeTextColor)` : `var(--black)`
  }};
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 1rem;
      grid-column-end: 3;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 1.5rem;
    }
    .btn-container {
      margin-top: 1rem;
      grid-column-end: 4;
    }
  }
`

export default Wrapper
