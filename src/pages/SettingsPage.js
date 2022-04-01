import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <section className="section">
      <h1 className="title is-2 block">{t("settingsPage.title")}</h1>
    </section>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <SettingsPage />
    </Suspense>
  );
}
