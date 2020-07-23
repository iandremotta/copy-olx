import styled from "styled-components";

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;

  .leftSide {
    flex: 250px;
    margin-right: 10px;

    .filterName {
      fontsize: 15px;
      margint: 10px 0;
    }
    input,
    select {
      width: 100%;
      height: 40px;
      border: 2px solid #9bb83c;
      border-radius: 5px;
      outline: 0;
      font-size: 15px;
      color: #000;
      padding: 10px;
    }

    .categoryItem {
      display: flex;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      color: #000;
      cursor: pointer;

      img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }

      span {
        font-size: 14px;
      }
    }
    .categoryItem:hover,
    .categoryItem.active {
      background-color: #9bb83c;
      color: #fff;
    }
    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
  .rightSide {
    flex: 1;
    h2 {
      margin-top: 0px;
      font-size: 18px;
    }

    .listWarning {
      padding: 30px;
      text-align: center;
    }
    .list {
      display: flex;
      flex-wrap: wrap;

      .aditem {
        width: 33%;
      }
    }
  }
`;
