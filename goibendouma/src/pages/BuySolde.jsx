import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { carousel } from "../constants/data";
import { useSelector, useDispatch } from "react-redux";

import { removeUser } from "../features/userSlice";

const BuySolde = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { soldes } = useSelector((state) => state.soldes);

  const [myData, setMyData] = useState(soldes);
  const { language } = useSelector((state) => state.language);

  const handleLogout = () => {
    dispatch(removeUser());
  };


  return (
    <div className="container-solde">
      <div className="buy-solde">
        <div className="dofus-category">
          <h1>{language === "anglais" ? "category" : "Categories"}</h1>
          <ul>
            <li>
              <Link to="/sell-kamas/#kamas">Dofus</Link>
            </li>
            <li>
              <Link to="/sell-kamas/#touch">Dofus Touch</Link>
            </li>
            <li>
              <Link to="/sell-kamas/#retro">Dofus Retro</Link>
            </li>
            <li>
              <Link to="/kamas-exchange">
                {language === "anglais" ? "Trade kamas" : "Echange Kamas"}{" "}
              </Link>
            </li>
            <li>
              <Link to="/buy-solde">
                {language === "anglais" ? "Balances" : "Soldes"}{" "}
              </Link>
            </li>
          </ul>
        </div>
        <div className="dofus-desc">
          <h1>
            {" "}
            {language === "anglais" ? "Sell ​​balance" : "Vendre du solde"}
          </h1>
          <div className="buy-solde-content">
            <table>
              <thead>
                <tr>
                  <th>Solde</th>
                  <th>Prix(Dh)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myData.map((data) => (
                  <tr>
                    <td>{data.solde}</td>
                    <td className="amount">
                      {data.priceDh}{" "}
                      <span
                        style={{
                          color: "#ff0000",
                          fontWeight: 400,
                        }}
                      >
                        Dh/U
                      </span>{" "}
                    </td>

                    <td
                      className={
                        data.status === "Vendre rapidement"
                          ? "success"
                          : "no-success"
                      }
                    >
                      {data.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dofus-acount">
          <h1>{language === "anglais" ? "My account" : "Mon compte"}</h1>
          <ul>
            <li>
              {language === "anglais" ? "Edit profil" : "Modifier Profil"}
            </li>
            <li>
              <Link to="/profil">
                {language === "anglais" ? "My sales" : "Mes ventes"}
              </Link>
            </li>
            <li>
              <Link to="/profil">
                {language === "anglais" ? "My trades" : "Mes echanges"}
              </Link>
            </li>
            <li>
              <Link to="/profil">
                {language === "anglais" ? "My balances" : "Mes soldes"}
              </Link>
            </li>
            {user.user && (
              <li
                style={{
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
                className="logout"
                onClick={handleLogout}
              >
                {language === "anglais" ? "Logout" : "Déconnexion"}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="solde-security-section">
        {carousel?.map((carous, i) => (
          <div className="carousel-container" key={i}>
            <span className="carousel-icon">{carous.icon}</span>
            <h3 className="carousel-title">{carous.title}</h3>
            <p className="carousel-desc">{carous.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuySolde;
