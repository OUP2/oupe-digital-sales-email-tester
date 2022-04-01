import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="notification is-danger">
      <h1 className="title is-2 block">{t("notFoundPage.title")}</h1>
      <h2 className="subtitle is-2 block">{t("notFoundPage.subtitle")}</h2>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <NotFoundPage />
    </Suspense>
  );
}
