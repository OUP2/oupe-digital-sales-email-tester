import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const [currentClickedTimes, setCurrentClickedTimes] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="section">
      <h1 className="title is-2 block">{t("homepage.title")}</h1>
      <div className="is-medium block">
        <p className="block">{t("homepage.subtitle")}</p>
        <button
          className="button is-primary block"
          onClick={() => setCurrentClickedTimes(currentClickedTimes + 1)}
        >
          {t("homepage.clickMeBtn")}
        </button>
        <p>
          {t("homepage.testClickCounterText", { count: currentClickedTimes })}
        </p>
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
