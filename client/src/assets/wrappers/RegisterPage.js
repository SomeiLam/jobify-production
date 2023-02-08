import styled from 'styled-components'

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .checkbox {
    display: block;
    position: relative;
    padding-left: 2.5rem;
    
    label {
      text-transform: capitalize;
    }

    input[type=checkbox] {
      visibility: hidden;
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      border: 1px solid var(--grey-200);
    }
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    input:checked ~ .checkmark:after {
      display: block;
    }
    .checkmark:after {
      left: 8px;
      bottom: 5px;
      width: 6px;
      height: 12px;
      border: solid var(--primary-500);
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    span {
      border-radius: 4px;
      cursor: pointer;
    }
  }
`
export default Wrapper
