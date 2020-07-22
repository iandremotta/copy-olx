import React, { useState, useEffect } from "react";
import { PageArea, SearchArea } from "./styled.js";
import { PageContainer } from "../../components/MainComponents";
import useApi from "../../helpers/OlxApi";
import { Link } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";
const App = () => {
  const api = useApi();
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, []);
  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="get" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((i, k) => (
                  <option key={k} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver todos
          </Link>
          <hr />
          Mussum Ipsum, cacilds vidis litro abertis. Posuere libero varius.
          Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Em pé
          sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose.
          Quem num gosta di mé, boa gentis num é. Detraxit consequat et quo num
          tendi nada.
        </PageArea>
      </PageContainer>
    </>
  );
};

export default App;
