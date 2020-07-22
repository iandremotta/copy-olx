import styled from "styled-components";

export const HeaderArea = styled.div`
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ccc;
  .container {
    max-width: 1000px;
    margin: auto;
    display: flex;
  }
  a {
    text-decoration: none;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;
    .logo-1,
    .logo-2,
    .logo-3 {
      font-size: 27px;
      font-weight: bold;
    }
    .logo-1 {
      color: red;
    }
    .logo-2 {
      color: green;
    }
    .logo-3 {
      color: blue;
    }
  }

  nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }
    li {
      margin-left: 10px;
      margin-right: 10px;

      a,
      button {
        border: 0;
        outline: 0;
        background: none;
        text-decoration: none;
        color: black;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #999;
        }
        &.button {
          background-color: #ff8100;
          padding: 10px;
          color: white;
          border-radius: 20px;
        }
        &.button:hover {
          background-color: #e57706;
        }
      }
    }
  }
`;
