import React, { useState, useEffect } from "react";
import { PageArea } from "./styled.js";
import {
  PageContainer,
  PageTitle,
  ErrorMessage,
} from "../../components/MainComponents";
import useApi from "../../helpers/OlxApi";
import { doLogin } from "../../helpers/AuthHandler";
const App = () => {
  const api = useApi();
  const [name, setName] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [stateList, setStateList] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabeled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabeled(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Senhas não batem");
      setDisabeled(false);
      return;
    }

    const json = await api.register(name, email, password, stateLoc);
    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabeled(false);
  };
  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome completo:</div>
            <div className="area--input">
              <input
                type="text"
                placeholder="Digite o seu nome"
                disabled={disabled}
                require
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado:</div>
            <div className="area--input">
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option></option>
                {stateList.map((i, k) => (
                  <option key={k} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">E-mail:</div>
            <div className="area--input">
              <input
                type="email"
                placeholder="Digite o seu e-mail"
                disabled={disabled}
                require
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha:</div>
            <div className="area--input">
              <input
                type="password"
                placeholder="Digite o seu password"
                disabled={disabled}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Confirmar senha:</div>
            <div className="area--input">
              <input
                type="password"
                placeholder="Digite o seu password"
                disabled={disabled}
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button>Cadastrar</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
};

export default App;
