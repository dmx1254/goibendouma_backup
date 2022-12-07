import React, { useState, useEffect } from "react";

import resume from "../assets/profile/resume.png";
import buying from "../assets/profile/buying.png";
import saleimg from "../assets/profile/sales.png";
import bag from "../assets/profile/shopping-bag.png";
import { ModifyProfil, MyBalances, MyExchanges, MySales } from "../components";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import axios from "axios";

const Profil = () => {

  const profilPrams = useParams();
  const [toggleParams, setToggleParams] = useState(profilPrams.profilname);

  const { user } = useSelector((state) => state.user);
  const [exchanges, setExchanges] = useState([]);
  const [myBuy, setMyBuy] = useState([]);
  const [balance, setBalance] = useState([]);
  const { language } = useSelector((state) => state.language);
  const [setProfil, setSetProfil] = useState(false);
  const [mySale, setMySale] = useState(false);
  const [myExchange, setMyExchange] = useState(false);
  const [myBalance, setMyBalance] = useState(false);
  const [saleSin, setSaleSin] = useState(false);
  const [balanceSin, setBalanceSin] = useState(false);
  const [exchangeSin, setExchangeSin] = useState(false);

  const toggleSaleExchangeAndBalance = (e) => {
    if (toggleParams === "edit-profil") {
      setSetProfil(true);
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
    } else if (toggleParams === "mes-ventes") {
      setSaleSin(true);
      setSetProfil(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
    } else if (toggleParams === "mes-soldes") {
      setBalanceSin(true);
      setSetProfil(false);
      setSaleSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
    } else if (toggleParams === "mes-echanges") {
      setExchangeSin(true);
      setBalanceSin(false);
      setSetProfil(false);
      setSaleSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
    } else if (e.target.id === "salesingle") {
      setSaleSin(true);
      setBalanceSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setToggleParams("");
    } else if (e.target.id === "balancesingle") {
      setBalanceSin(true);
      setSaleSin(false);
      setExchangeSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setToggleParams("");
    } else if (e.target.id === "exchangesingle") {
      setExchangeSin(true);
      setBalanceSin(false);
      setSaleSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setToggleParams("");
    } else {
      setSetProfil(true);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setMySale(false);
      setMyBalance(false);
      setMyExchange(false);
      setSetProfil(false);
      setToggleParams("");
    }
  };

  const handleDisplay = (e) => {
    if (e.target.id === "profil") {
      setSetProfil(true);
      setMySale(false);
      setMyExchange(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setToggleParams("");
    }
    if (e.target.id === "sale") {
      setMySale(true);
      setSetProfil(false);
      setMyExchange(false);
      setMyBalance(false);
      setSaleSin(false);
      setBalanceSin(false);
      setExchangeSin(false);
      setToggleParams("");
    } else if (e.target.id === "exchange") {
      setMyExchange(true);
      setMySale(false);
      setSetProfil(false);
      setMyBalance(false);
      setExchangeSin(false);
      setBalanceSin(false);
      setSaleSin(false);
      setToggleParams("");
    } else if (e.target.id === "balance") {
      setMyBalance(true);
      setMySale(false);
      setSetProfil(false);
      setMyExchange(false);
      setToggleParams("");
    } else {
      setSetProfil(true);
      setMyExchange(false);
      setMyBalance(false);
      setMySale(false);
      setBalanceSin(false);
      setSaleSin(false);
      setExchangeSin(false);
      setToggleParams("");
    }
  };

  useEffect(() => {
    const getExchanges = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/exchange/user/${user?.user}`)
        .then((res) => setExchanges(res.data));
    };
    getExchanges();
  }, [user?.user]);

  useEffect(() => {
    const getUsersBuys = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/buy/user/${user?.user}`)
        .then((res) => setMyBuy(res.data));
    };
    getUsersBuys();
  }, [user?.user]);

  useEffect(() => {
    const getSoldes = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_CLIENT_URL}/soldeorder/user/${user?.user}`
        )
        .then((res) => setBalance(res.data));
    };
    getSoldes();
  }, [user?.user]);

  // const handleLogout = () => {
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_CLIENT_URL}/users/logout`,
  //     withCredentials: true,
  //   })
  //     .then(() => {
  //       dispatch(removeUser());
  //       window.location.reload();
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="profil">
      <div className="profil-component">
        {(setProfil || toggleParams === "edit-profil") && <ModifyProfil />}
        {(mySale || saleSin || toggleParams === "mes-ventes") && (
          <MySales
            myBuy={myBuy}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
        {(myExchange || exchangeSin || toggleParams === "mes-echanges") && (
          <MyExchanges
            exchanges={exchanges}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
        {(myBalance || balanceSin || toggleParams === "mes-soldes") && (
          <MyBalances
            balance={balance}
            toggleSaleExchangeAndBalance={toggleSaleExchangeAndBalance}
          />
        )}
      </div>

      <div className="profil-menu">
        <ul>
          <li onClick={handleDisplay}>
            <img src={resume} alt="resume" />
            <span id="profil">
              {language === "anglais" ? "Edit profil" : "Modifier profile"}
            </span>
          </li>
          <li onClick={handleDisplay}>
            <img src={buying} alt="resume" />
            <span id="sale">
              {language === "anglais" ? "My sales" : "Mes ventes"}
            </span>
          </li>
          <li onClick={handleDisplay}>
            <img src={bag} alt="resume" />
            <span id="balance">
              {language === "anglais" ? "My balances" : "Mes soldes"}
            </span>
          </li>
          <li id="exchange" onClick={handleDisplay}>
            <img src={saleimg} alt="resume" />
            <span id="exchange">
              {language === "anglais" ? "My trades" : "Mes Echanges"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profil;
