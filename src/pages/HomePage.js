import { useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { constants } from "../utils/constants";
import axios from "axios";

const HomePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        closeModal(document.querySelector(".modal"));
      }
    });

    retrieveTest();
  }, []);

  const retrieveTest = async () => {
    const result = await axios.get(`${constants.BACKEND_URL}/`);
    console.log(result.data);
  };

  const openModal = (modal) => {
    modal.classList.add("is-active");
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-active");
  };

  return (
    <section className="section">
      <h1 className="title is-2 block">{t("homepage.title")}</h1>
      <div className="is-medium block">
        <p className="block">{t("homepage.subtitle")}</p>
        <button
          className="button is-primary block"
          onClick={() => openModal(document.querySelector(".modal"))}
        >
          {t("homepage.displayModalBtn")}
        </button>
        <div className="modal">
          <div
            className="modal-background"
            onClick={() => closeModal(document.querySelector(".modal"))}
          ></div>
          <div className="modal-content">
            <div className="box">
              <div>Tabula rasa</div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => closeModal(document.querySelector(".modal"))}
          ></button>
        </div>
      </div>
    </section>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
