import React, { useState } from "react";
import { useSelector } from "react-redux";

const DofusTouch = () => {
  const { user } = useSelector((state) => state.user);
  const { servers } = useSelector((state) => state.servers);

  const [data, setData] = useState(
    servers.filter((server) => server.serverCategory === "dofus-kamas")
  );
  const { language } = useSelector((state) => state.language);

  const { eurorate } = useSelector((state) => state.eurorate);
  const { dollarate } = useSelector((state) => state.dollarate);
  const { usdtra } = useSelector((state) => state.usdtra);
  const { cnyrate } = useSelector((state) => state.cnyrate);

  return (
    <div className="dofus-touch">
      <h1 className="dofus-touch-title">Dofus Touch</h1>
      <table id="touch">
        <thead>
          {language === "anglais" ? (
            <tr>
              <th>Server</th>
              <th>Price</th>
              <th>USDT</th>
              <th>Paypal</th>
              <th>Skrill</th>
              <th>Paylib</th>
              <th>Sepa</th>
              <th>Payeer</th>
              <th>Status</th>
            </tr>
          ) : (
            <tr>
              <th>Serveur</th>
              <th>Prix</th>
              <th>USDT</th>
              <th>Paypal</th>
              <th>Skrill</th>
              <th>Paylib</th>
              <th>Sepa</th>
              <th>Payeer</th>
              <th>Status</th>
            </tr>
          )}
        </thead>

        {language === "anglais" ? (
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>{item.serverPriceDh}Dhs/M</td>
                <td>{(item.serverPriceDh / usdtra).toFixed(2)}Usdt/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible" && "Clic here to sell"}
                    {item.serverStatus === "Vendre rapidement" &&
                      "Sell quickly"}
                    {item.serverStatus === "Stock complet" && "Full Stock"}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.serverName}</td>
                <td>{item.serverPriceDh}Dhs/M</td>
                <td>{(item.serverPriceDh / usdtra).toFixed(2)}Usdt/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <td>{(item.serverPriceDh / eurorate).toFixed(2)}€/M</td>
                <a href="javascript:void(Tawk_API.toggle())">
                  <td
                    className={
                      item.serverStatus === "Disponible"
                        ? "success"
                        : item.serverStatus === "Stock complet"
                        ? "no-success"
                        : "quickly"
                    }
                  >
                    {item.serverStatus === "Disponible"
                      ? "Cliquer ici pour vendre"
                      : item.serverStatus}
                  </td>
                </a>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DofusTouch;
