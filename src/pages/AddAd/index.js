import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PageArea } from "./styled.js";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxApi";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const App = () => {
  const api = useApi();

  const fileField = useRef();
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesct] = useState("");
  const [category, setCategory] = useState("");
  const [disabled, setDisabeled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabeled(true);
    setError("");
    let errors = [];

    if (!title.trim()) {
      errors.push("Sem titulo");
    }

    if (!category) {
      errors.push("Sem categoria");
    }

    if (errors.lenght === 0) {
      const fData = new FormData();
      fData.append("title", title);
      fData.append("price", price);
      fData.append("priceneg", priceNegotiable);
      fData.append("desc", desc);
      fData.append("cat", category);

      if (fileField.current.files.lenght > 0) {
        for (let i = 0; i < fileField.current.files.lenght; i++) {
          fData.append("img", fileField.current.files[i]);
        }
      }

      const json = await api.addAd(fData);
      if (!json.error) {
        history.push(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }
    } else {
      setError(errors.join("\n"));
    }
    setDisabeled(false);
  };

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título:</div>
            <div className="area--input">
              <input
                type="text"
                placeholder="Digite o titulo"
                disabled={disabled}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria:</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories &&
                  categories.map((i) => (
                    <option key={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço</div>
            <MaskedInput
              mask={priceMask}
              placeholder="R$"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={disabled || priceNegotiable}
            />
          </label>
          <label className="area">
            <div className="area--title">Preço negocíavel</div>
            <div className="area--input">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={(e) => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição:</div>
            <div className="area--input">
              <textarea
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesct(e.target.value)}
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagens (1 ou Mais):</div>
            <div className="area--input">
              <input type="file" disabled={disabled} multiple ref={fileField} />
            </div>
          </label>
          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button>Cadastrar anúncio</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default App;
