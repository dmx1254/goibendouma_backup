import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

// import { soldeData } from "../constants/solde";

const MyBalances = ({ balance, toggleSaleExchangeAndBalance }) => {
  const { language } = useSelector((state) => state.language);

  // const { user } = useSelector((state) => state.user);

  const [dataOrder, setDataOrder] = useState(balance);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (dataOrder.length === 1) {
      if (dataOrder[0].status === "Terminée") {
        setTotalPrice(dataOrder[0]?.totalPrice);
      } else {
        setTotalPrice(0);
      }
    } else if (dataOrder.length > 1) {
      let total = 0;
      let myTab = dataOrder.filter((data) => data.status === "Terminée");
      for (let i = 0; i < myTab.length; i++) {
        total += myTab[i]?.totalPrice;
      }
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [dataOrder, dataOrder?.status]);

  const convertDate = (date) => {
    const dateConverted = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  const convertDateAndAddDay = (date) => {
    const myDate = new Date(date);
    const day = myDate.getDay();
    myDate.setDate(day === 6 ? myDate.getDate() + 2 : myDate.getDate() + 1);
    const dateConverted = new Date(myDate).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateConverted;
  };

  return (
    <div className="mybalances">
      <div className="mysales-alert">
        <span className="mysales-alert-title">
          {language === "anglais" ? "Warning: " : "Attention: "}
        </span>
        {language === "anglais" ? (
          <p>
            Pay attention to the fees deducted by your online bank or any
            platform you may use.
          </p>
        ) : (
          <p>
            Attention aux frais déduits par votre banque en ligne ou autre
            plateforme utilisée.
          </p>
        )}
      </div>
      <div className="mysales-menu-list" onClick={toggleSaleExchangeAndBalance}>
        <span id="salesingle">
          {language === "anglais" ? "My sales" : "Mes ventes"}
        </span>
        <span id="exchangesingle" onClick={toggleSaleExchangeAndBalance}>
          {language === "anglais" ? "My trade" : "Mes échanges"}
        </span>
        <span id="balancesingle">
          {language === "anglais" ? "My balances" : "Mes soldes"}
        </span>
      </div>
      <div className="mysales-search">
        <span>
          <FiSearch />
        </span>{" "}
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={
            language === "anglais" ? "N° order..." : "N° de commande..."
          }
        />{" "}
      </div>
      <div className="mysales-total">
        <span className="mysales-total-title">Total:</span>
        <span className="mysales-total-price">{totalPrice} DH</span>
      </div>
      <div className="mysales-table">
        <table>
          <thead>
            {language === "anglais" ? (
              <tr>
                <th>N° Order</th>
                <th>Balance</th>
                <th>Qty</th>
                <th>UP</th>
                <th>Total</th>
                {/* {user?.person?.isAdmin && <th>payment details</th>} */}
                <th>Status</th>
                <th>Date</th>
                <th>Payment date</th>
              </tr>
            ) : (
              <tr>
                <th>N° Commande</th>
                <th>Solde</th>
                <th>Qté</th>
                <th>PU</th>
                <th>Total</th>
                {/* {user?.person?.isAdmin && <th>Coordonnées de paiement</th>} */}
                <th>Status</th>
                <th>Date</th>
                <th>Date de paiement</th>
              </tr>
            )}
          </thead>
          <tbody>
            {dataOrder
              .filter((data) => data.numSolde.includes(searchTerm))
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.numSolde}</td>
                  <td
                    className={
                      order.solde === "euro"
                        ? "dofuskamas"
                        : order.solde === "USDT"
                        ? "dofustouch"
                        : "dofusretro"
                    }
                  >
                    {order.solde}
                  </td>
                  <td>{order.qte}</td>
                  <td>{order.pu}</td>
                  <td>
                    {order.totalPrice}
                    {/* {user?.person?.currency === "euro"
                        ? "£"
                        : user?.person?.currency} */}
                  </td>
                  {/* {user?.person?.isAdmin && (
                      <td className="details-of-payment">
                        {user?.person?.currencymethod}:{" "}
                        {user?.person?.currency === "dhs"
                          ? user?.person?.dhsRib
                          : user?.person?.currency === "euro"
                          ? user?.person?.emailCurrencyEuro
                          : user?.person?.currency === "usdt"
                          ? user?.person?.usdtAdressTrx
                          : user?.person?.cnyacount}
                      </td>
                    )} */}

                  {language === "anglais" ? (
                    <td
                      className={
                        order.status === "Terminée"
                          ? "success"
                          : order.status === "Annulée"
                          ? "no-success"
                          : order.status === "En cours"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {order.status === "Terminée"
                        ? "Completed"
                        : order.status === "Annulée"
                        ? "Canceled"
                        : order.status === "En cours"
                        ? "Pending"
                        : order.status}
                    </td>
                  ) : (
                    <td
                      className={
                        order.status === "Terminée"
                          ? "success"
                          : order.status === "Annulée"
                          ? "no-success"
                          : order.status === "En cours"
                          ? "pending"
                          : "no-pending"
                      }
                    >
                      {order.status}
                    </td>
                  )}
                  <td>{convertDate(order.createdAt)}</td>
                  <td>{convertDateAndAddDay(order.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mysales-extra"></div>
    </div>
  );
};

export default MyBalances;
