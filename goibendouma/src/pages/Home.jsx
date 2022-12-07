import React, { useState, useEffect } from "react";

// import tombraider from "../assets/tombraider.jpg";

import axios from "axios";

import { addServers } from "../features/serverSlices";

import { getAllSoldes } from "../features/soldeSlices";

import { useSelector, useDispatch } from "react-redux";

import { removeUser } from "../features/userSlice";

import { getRate } from "../features/rateSlice";

import { getEuroRate } from "../features/rateEuroSlice";

import { getDollarRate } from "../features/rateDollarSlices";

import { getUsdtRa } from "../features/rateUsdtSlices";

import { getCnyRate } from "../features/rateCnySlices";
// import { FaExchangeAlt, FaDollarSign, FaDonate } from "react-icons/fa";

import { Link } from "react-router-dom";

import { carousel } from "../constants/data";
import { Signin } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(carousel);
  const { language } = useSelector((state) => state.language);

  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CLIENT_URL}/users/logout`,
      withCredentials: true,
    })
      .then(() => {
        dispatch(removeUser());
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getServers = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/server`)
        .then((res) => dispatch(addServers(res.data)));
    };
    getServers();
  }, [dispatch]);

  useEffect(() => {
    const getSoldes = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/solde`)
        .then((res) => dispatch(getAllSoldes(res.data)));
    };
    getSoldes();
  }, [dispatch]);

  useEffect(() => {
    const getRater = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/order/rate`)
        .then((res) => dispatch(getRate(res?.data[0]?.rate)));
    };
    getRater();
  }, [dispatch]);

  useEffect(() => {
    const getEuro = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/euro`)
        .then((res) => dispatch(getEuroRate(res?.data[0]?.euro)));
    };
    getEuro();
  }, [dispatch]);

  useEffect(() => {
    const getDollar = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/dollar`)
        .then((res) => dispatch(getDollarRate(res?.data[0]?.dollar)));
    };
    getDollar();
  }, [dispatch]);

  useEffect(() => {
    const getUsdt = async () => {
      await axios
        .get(`${process.env.REACT_APP_CLIENT_URL}/usdt`)
        .then((res) => dispatch(getUsdtRa(res?.data[0]?.usdt)));
    };
    getUsdt();
  }, [dispatch]);

  // useEffect(() => {
  //   const getCny = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_CLIENT_URL}/cny`)
  //       .then((res) => dispatch(getCnyRate(res?.data[0]?.cny)));
  //   };
  //   getCny();
  // }, [dispatch]);

  return (
    <div className="home">
      {/* <img src={tombraider} alt="tomb raider" className="img-home-container" /> */}
      {/* <div className="in-the-banner"> */}
      {/* <div className="in-the-banner-citation">
          <p className="banner-citataion">
            {" "}
            Il est hélas devenu évident aujourd'hui que notre{" "}
            <span className="nuances-white">technologie</span> a dépassé notre{" "}
            <span className="nuances-white">humanité</span> .
          </p>
        </div> */}
      {/* <div className="in-the-banner-buttons-exchange"></div>
      </div> */}
      {/* <div className="in-the-banner-buttons-sell">
        <Link to="/sell-kamas">
          <div>
            <span className="icon-kamas">
              <FaDonate />
            </span>
            <span className="text-kamas">Vendre kamas</span>
          </div>
        </Link>
      </div> */}
      {/* <div className="in-the-banner-buttons-exchange">
        <Link to="/kamas-exchange">
          <div>
            <span className="icon-kamas">
              <FaExchangeAlt />
            </span>
            <span className="text-kamas">Échanger kamas</span>
          </div>
        </Link>
      </div> */}
      {/* <div className="in-the-banner-buttons-buy">
        <a href="https://ibendouma.com" target="__blank">
          <div>
            <span className="icon-kamas">
              <FaDollarSign />
            </span>
            <span className="text-kamas">Acheter kamas</span>
          </div>
        </a>
      </div> */}
      <div className="home-sidebar-desc">
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
                {language === "anglais" ? "Kamas exchanges" : "Echange Kamas"}
              </Link>
            </li>
            <li>
              <Link to="/buy-solde">
                {language === "anglais" ? "Balances" : "Soldes"}{" "}
              </Link>
            </li>
          </ul>
        </div>
        {language === "anglais" ? (
          <div className="dofus-desc">
            <p>
              Welcome to our webesite go.iBenouma where you can resell your
              kamas, Want to profit from the in-game economy to make some money?
              go.iBendouma is here to buy all your stocks of kamas. Payments are
              secure and are made within 24 hours, working days. The iBendouma
              team remains at your disposal for more information, and will do
              everything in their power to offer you the best service. meilleur
              service.
            </p>
            <p>
              <span>Late Payments:</span>
              Bugs in the game may cause us to delay payouts, as a security
              measure.
              <br />
              Bugs on the bank's application, can lead to a delay of the
              payments concerned.
            </p>
            <p>
              Minimum Sale: Bank transfer 200MAD/24h working days
              <br />
              - SEPA: payment sent in a 24 to 48 hours delay after the delivery
              (minimum: 100 euro worth of kamas)
              <br />
              - Paypal/Skrill/Payeer/PAYLIB: payment sent in a 6 to 24 hours
              after delivery (minimum: 20 euros worth of kamas)
              <br />- USDT: payment sent in a 6 to 24 hours after delivery
              (minimum: 20 USDT worth of kamas)
            </p>
            <p></p>
            <p>
              <span>Warning:</span>
              iBendouma will never ask you to return your kamas or Dofus items
              in the game, we will always ask you to come to the "Live Chat" to
              discuss any problem. Never give your kamas or Dofus items to
              someone who claims to be iBendouma.
            </p>
            <p>
              <span>Beware of fakes:</span>
              Scammers can use the same nickname with a letter difference.
            </p>
            <p>iBendouma thanks you for your trust.</p>
            <div className="selling-process">
              <div class="comment-icon">1</div>
              <p>Check the price and availability of the server.</p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">2</div>
              <p>Register.</p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">3</div>
              <p>
                {" "}
                Talk to the chat agent so he can give you the delivery details.
              </p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">4</div>
              <p>
                Exchange the kamas to the delivery person so he can create your
                order.
              </p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">5</div>
              <p>Check that the order has been created on your sales page.</p>
            </div>
          </div>
        ) : (
          <div className="dofus-desc">
            <p>
              Bienvenue sur notre site go.iBendouma ou vous pourrez revendre vos
              kamas, Envie d’utiliser l’économie du jeu pour vous faire de
              l’argent? go.iBendouma est là pour vous acheter tous vos stocks de
              kamas. Les paiements sont sécurisés et se font dans un délai de
              24h, jours ouvrables. L’équipe iBendouma reste à votre écoute pour
              plus d’informations, et fera le nécessaire pour vous offrir le
              meilleur service.
            </p>
            <p>
              <span>Retards de paiements:</span>
              Des bugs sur le jeu peuvent nous amener à retarder les paiements,
              par mesure de sécurité. Des bugs sur l'application d'une banque,
              peut à amener à un retard des paiements concernés.
            </p>
            <p>
              Equivalent minimum: Virement bancaires 200MAD/24h ouvrables <br />
              - SEPA: paiement entre 24 et 48 heures aprés la livraison des
              kamas (100 euro de kamas au minimum)
              <br />
              - Paypal/Skrill/Payeer/PAYLIB: Paiement entre 6 et 24 heures aprés
              la livraison des kamas (20 euro de kamas au minimum)
              <br />- USDT: 6 et 24 heures aprés la livraison de kamas (20 USDT
              de kamas minimum)
            </p>
            <p>
              <span>Attention:</span>
              iBendouma ne vous demandera jamais de rendre vos kamas ou objets
              dofus dans le jeu, nous vous demanderons toujours de venir sur le
              “Chat en Direct” pour discuter de n’importe quel problème. Ne
              donnez jamais vos kamas ou objets dofus à quelqu’un qui prétend
              être iBendouma.
            </p>
            <p>
              <span>Attention aux fakes:</span>
              des arnaqueurs peuvent utiliser le même pseudo avec une lettre de
              différence.
            </p>
            <p>iBendouma vous remercie de votre confiance.</p>
            <div className="selling-process">
              <div class="comment-icon">1</div>
              <p>Vérifiez le prix et la disponibilité du serveur.</p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">2</div>
              <p>Inscrivez vous.</p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">3</div>
              <p>
                {" "}
                Parlez à l'agent du chat pour qu'il vous donne les détails de
                livraison.
              </p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">4</div>
              <p>
                Echangez les kamas au livreur pour qu'il puisse créer votre
                commande.
              </p>
            </div>
            <div className="selling-process">
              <div class="comment-icon">5</div>
              <p>
                Vérifier que la commande a bien été créer sur la pages de vos
                ventes.
              </p>
            </div>
          </div>
        )}

        {user?.user ? (
          <div className="dofus-acount">
            <h1>{language === "anglais" ? "My account" : "Mon compte"}</h1>
            <ul>
              <li>
                <Link to="/profil/edit-profil">
                  {language === "anglais" ? "Edit profil" : "Modifier Profil"}
                </Link>
              </li>
              <li>
                <Link to="/profil/mes-ventes">
                  {language === "anglais" ? "My sales" : "Mes ventes"}
                </Link>
              </li>
              <li>
                <Link to="/profil/mes-echanges">
                  {language === "anglais" ? "My trades" : "Mes echanges"}
                </Link>
              </li>
              <li>
                <Link to="/profil/mes-soldes">
                  {language === "anglais" ? "My balances" : "Mes soldes"}
                </Link>
              </li>
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
            </ul>
          </div>
        ) : (
          <Signin />
        )}
      </div>
      {language === "anglais" ? (
        <div className="carousel-text-slider">
          {data?.map((carousel, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carousel.icon}</span>
              <h3 className="carousel-title">{carousel.titleEn}</h3>
              <p className="carousel-desc">{carousel.contentEn}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="carousel-text-slider">
          {data?.map((carousel, i) => (
            <div className="carousel-container" key={i}>
              <span className="carousel-icon">{carousel.icon}</span>
              <h3 className="carousel-title">{carousel.title}</h3>
              <p className="carousel-desc">{carousel.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
