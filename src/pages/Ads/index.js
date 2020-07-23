import React, { useState, useEffect } from "react";
import { PageArea, SearchArea } from "./styled.js";
import { PageContainer } from "../../components/MainComponents";
import useApi from "../../helpers/OlxApi";
import { useLocation, useHistory } from "react-router-dom";
import AdItem from "../../components/partials/AdItem";
const App = () => {
  const api = useApi();
  const history = useHistory();
  let timer;
  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQueryString();
  // alert(query.get("cat")); pega a categoria
  const [q, setQ] = useState(query.get("q") != null ? query.get("q") : "");
  const [cat, setCat] = useState(
    query.get("cat") != null ? query.get("cat") : ""
  );
  const [state, setState] = useState(
    query.get("state") != null ? query.get("state") : ""
  );

  const [adsTotal, setAdsTotal] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);
  const [resultOpacity, setResultOpacity] = useState(1);
  const [warningMessage, setWarningMessage] = useState("Carregando");
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  let pagination = [];
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i);
  }

  const getAdsList = async () => {
    setLoading(true);
    const json = await api.getAds({
      sorte: "desc",
      limit: 1,
      q,
      cat,
      state,
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(() => {
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }
    history.replace({
      search: `?${queryString.join("&")}`,
    });
    if (timer) {
      clearTimeout(timer);
      setResultOpacity(0.3);
    }
    timer = setTimeout(getAdsList, 2000);
  }, [q, cat, state]);

  useEffect(() => {
    if (adList.lenght > 0) {
      setPageCount(Math.ceil(adsTotal / adList.lenght));
    } else {
      setPageCount(0);
    }
  }, [adsTotal]);

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

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="get">
            <input
              type="text"
              name="q"
              placeholder="O que você procura?"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="filterName" value={state}>
              Estado:
            </div>
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option></option>
              {stateList.map((i, k) => (
                <option key={k} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((i, k) => (
                <li
                  key={k}
                  className={
                    cat === i.slug ? "categoryItem active" : "categoryItem"
                  }
                  onClick={() => setCat(i.slug)}
                >
                  <img src={i.img} alt="" />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>
          {loading && <div className="listWarning">{warningMessage}</div>}
          {!loading && adList.lenght === 0 && (
            <div className="listWarning">Não foram encontrados resultados</div>
          )}
          <div className="list" style={{ opacity: resultOpacity }}>
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>

          <div className="pagination">Count: {pageCount}</div>
        </div>
      </PageArea>
    </PageContainer>
  );
};

export default App;
