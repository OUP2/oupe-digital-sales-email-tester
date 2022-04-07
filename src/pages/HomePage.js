/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { constants } from "../utils/constants";
import axios from "axios";

const HomePage = () => {
  const [testCasePanelContent, setTestCasePanelContent] = useState([]);
  const [testCaseCheckboxesContent, setTestCaseCheckboxesContent] = useState(
    []
  );
  const [currentTestCase, setCurrentTestCase] = useState("");
  const [emailSettings, setEmailSettings] = useState(null);
  const [platformTypeInfo, setPlatformTypeInfo] = useState([]);
  const [emailTemplateResult, setEmailTemplateResult] = useState("");
  const [formIsIncomplete, setFormIsIncomplete] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        closeAllModals(document.querySelectorAll(".modal"));
      }
    });
    retrieveTestCases();
  }, []);

  useEffect(() => {
    if (emailSettings) {
      if (
        emailSettings.receivesInvoice === false &&
        emailSettings.receivesLicenses === false &&
        emailSettings.platformType === [] &&
        emailSettings.isReturn === false
      ) {
        setFormIsIncomplete(true);
      } else {
        document.querySelector("#submit-form-btn").disabled = false;
        retrieveEmailTemplate(emailSettings);
      }
    } else {
      document.querySelector("#submit-form-btn").disabled = true;
    }
  }, [emailSettings]);

  useEffect(() => {
    if (formIsIncomplete) {
      document.querySelector("#submit-form-btn").disabled = true;
    } else {
      document.querySelector("#submit-form-btn").disabled = false;
    }
  }, [formIsIncomplete]);

  const openModal = (modal) => {
    modal.classList.add("is-active");
  };

  const closeModal = (modal) => {
    modal.classList.remove("is-active");
  };

  const closeAllModals = (modalAll) => {
    modalAll.forEach((modal) => {
      modal.classList.remove("is-active");
    });
  };

  const retrieveTestCases = async () => {
    const translationsJSON = await axios.get(
      `${process.env.PUBLIC_URL}/locales/en/translation.json`
    );
    const translationsArray = [];
    const platformTypesArray = [];

    for (let test in translationsJSON.data.testCases) {
      if (translationsJSON.data.testCases.hasOwnProperty(test)) {
        translationsArray.push(translationsJSON.data.testCases[test]);
      }
    }

    for (let platform in translationsJSON.data.platformTypes) {
      if (translationsJSON.data.platformTypes.hasOwnProperty(platform)) {
        platformTypesArray.push(translationsJSON.data.platformTypes[platform]);
      }
    }

    setTestCasePanelContent(translationsArray);
    setTestCaseCheckboxesContent(platformTypesArray);
  };

  const retrieveEmailTemplate = async (emailSettings) => {
    const result = await axios.post(`${constants.BACKEND_URL}/getEmail`, {
      receivesInvoice: emailSettings.receivesInvoice,
      receivesLicenses: emailSettings.receivesLicenses,
      platformType: emailSettings.platformType,
      isReturn: emailSettings.isReturn,
    });

    if (result.status === 200) {
      if (result.data === "") {
        setFormIsIncomplete(true);
      }
      setEmailTemplateResult(result.data);
    }
  };

  const submitSettings = () => {
    setFormIsIncomplete(false);
    setEmailSettings({
      receivesInvoice: document.querySelector("#receives-invoice-true").checked,
      receivesLicenses: document.querySelector("#receives-licenses-true")
        .checked,
      platformType: platformTypeInfo,
      isReturn: document.querySelector("#is-return-true").checked,
    });
  };

  const resetSettings = () => {
    document.querySelectorAll("input[type='checkbox']").forEach((elem) => {
      elem.checked = false;
      elem.disabled = false;
      setEmailSettings(null);
      setPlatformTypeInfo([]);
      setEmailTemplateResult("");
    });
    document.querySelector("#receives-invoice-true").checked = false;
    document.querySelector("#receives-licenses-true").checked = false;
    document.querySelector("#is-return-true").checked = false;
    document.querySelector("#receives-invoice-false").checked = true;
    document.querySelector("#receives-licenses-false").checked = true;
    document.querySelector("#is-return-false").checked = true;
  };

  return (
    <div className="container">
      <section className="section">
        <h1 className="title is-2 block">{t("homepage.title")}</h1>
      </section>

      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <h1 className="title is-3 block">{t("homepage.settings")}</h1>
            <label className="label">
              {t("homepage.form.receiveInvoiceQuestion")}
            </label>
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="receives-invoice"
                    onChange={() => submitSettings()}
                    id="receives-invoice-true"
                  />
                  {t("homepage.form.yes")}
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="receives-invoice"
                    id="receives-invoice-false"
                    onChange={() => submitSettings()}
                    defaultChecked
                  />
                  {t("homepage.form.no")}
                </label>
              </div>
            </div>

            <label className="label">
              {t("homepage.form.receiveLicensesQuestion")}
            </label>
            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    type="radio"
                    name="receives-licenses"
                    id="receives-licenses-true"
                    onChange={() => submitSettings()}
                  />
                  {t("homepage.form.yes")}
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    name="receives-licenses"
                    id="receives-licenses-false"
                    onChange={() => submitSettings()}
                    defaultChecked
                  />
                  {t("homepage.form.no")}
                </label>
              </div>
            </div>

            <label className="label">{t("homepage.form.platforms")}</label>
            <div className="field">
              {testCaseCheckboxesContent.map((platform, key) => (
                <div className="control" key={key}>
                  <input
                    type="checkbox"
                    id={platform.id}
                    value={platform.id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlatformTypeInfo([
                          ...platformTypeInfo,
                          e.target.value,
                        ]);

                        if (e.target.value === "blinkIndividual") {
                          document.querySelector("#blinkUses").disabled = true;
                          document.querySelector(
                            "#blinkAcademy"
                          ).disabled = true;
                        } else if (e.target.value === "blinkUses") {
                          document.querySelector(
                            "#blinkIndividual"
                          ).disabled = true;
                          document.querySelector(
                            "#blinkAcademy"
                          ).disabled = true;
                        } else if (e.target.value === "blinkAcademy") {
                          document.querySelector(
                            "#blinkIndividual"
                          ).disabled = true;
                          document.querySelector("#blinkUses").disabled = true;
                        }
                      } else {
                        setPlatformTypeInfo(
                          platformTypeInfo.filter(
                            (platform) => platform.id !== e.target.value
                          )
                        );

                        if (e.target.value === "blinkIndividual") {
                          document.querySelector("#blinkUses").disabled = false;
                          document.querySelector(
                            "#blinkAcademy"
                          ).disabled = false;
                        } else if (e.target.value === "blinkUses") {
                          document.querySelector(
                            "#blinkIndividual"
                          ).disabled = false;
                          document.querySelector(
                            "#blinkAcademy"
                          ).disabled = false;
                        } else if (e.target.value === "blinkAcademy") {
                          document.querySelector(
                            "#blinkIndividual"
                          ).disabled = false;
                          document.querySelector("#blinkUses").disabled = false;
                        }
                      }
                    }}
                  />
                  <label htmlFor={platform.id}>
                    {t(`platformTypes.${platform.id}.name`)}
                  </label>
                </div>
              ))}

              <label className="label control">
                {t("homepage.form.isReturnQuestion")}
              </label>
              <div className="field">
                <div className="control">
                  <label className="radio">
                    <input
                      type="radio"
                      name="is-return"
                      id="is-return-true"
                      onChange={() => submitSettings()}
                    />
                    {t("homepage.form.yes")}
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="is-return"
                      id="is-return-false"
                      onChange={() => submitSettings()}
                      defaultChecked
                    />
                    {t("homepage.form.no")}
                  </label>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-link"
                    onClick={() => {
                      submitSettings();
                      if (!formIsIncomplete)
                        openModal(document.querySelector("#email-modal"));
                    }}
                    id="submit-form-btn"
                  >
                    {t("homepage.form.submitBtn")}
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-link is-light"
                    onClick={() => resetSettings()}
                  >
                    {t("homepage.form.resetBtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <nav className="panel">
              <p className="panel-heading">{t("homepage.testCasesTitle")}</p>
              <p className="panel-tabs">
                <a className="is-active" data-tab="cases">
                  {t("homepage.casesTabTitle")}
                </a>
              </p>

              {testCasePanelContent.map((test, key) => (
                <a
                  key={key}
                  className="panel-block is-active"
                  data-content="cases"
                  onClick={() => {
                    setCurrentTestCase(test);
                    openModal(document.querySelector("#test-case-modal"));
                  }}
                >
                  <span className="panel-icon">
                    <i
                      className=" fas fa-vial-circle-check"
                      aria-hidden="true"
                    />
                  </span>
                  {t(`testCases.${test.id}.name`)}
                </a>
              ))}
            </nav>
          </div>

          <div className="modal" id="email-modal">
            <div
              className="modal-background"
              onClick={() => closeModal(document.querySelector("#email-modal"))}
            />
            <div className="modal-content">
              <div className="box">
                <div
                  className="content block"
                  dangerouslySetInnerHTML={{ __html: emailTemplateResult }}
                />
              </div>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => closeModal(document.querySelector("#email-modal"))}
            />
          </div>

          <div className="modal" id="test-case-modal">
            <div
              className="modal-background"
              onClick={() =>
                closeModal(document.querySelector("#test-case-modal"))
              }
            ></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  {t(`testCases.${currentTestCase.id}.name`)}
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={() =>
                    closeModal(document.querySelector("#test-case-modal"))
                  }
                ></button>
              </header>
              <section className="modal-card-body">
                <h5 className="title is-5 block">
                  {t("homepage.testCasesModal.descriptionTitle")}
                </h5>
                <p className="content block">
                  {t(`testCases.${currentTestCase.id}.descriptionText`)}
                </p>
                <h5 className="title is-5 block">
                  {t("homepage.testCasesModal.settingsTitle")}
                </h5>
                <ul>
                  <li>
                    <b>{`${t("homepage.testCasesModal.invoiceLabel")}: `}</b>
                    {currentTestCase.receivesInvoice ? (
                      <span className="icon has-text-success">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      <span className="icon has-text-danger">
                        <i className="fas fa-xmark" />
                      </span>
                    )}
                  </li>
                  <li>
                    <b>{`${t("homepage.testCasesModal.licensesLabel")}: `}</b>
                    {currentTestCase.receivesLicenses ? (
                      <span className="icon has-text-success">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      <span className="icon has-text-danger">
                        <i className="fas fa-xmark" />
                      </span>
                    )}
                  </li>
                  <li>
                    <b>{`${t(
                      "homepage.testCasesModal.platformTypeLabel"
                    )}: `}</b>
                    {!currentTestCase.platformType ? (
                      <span className="icon has-text-danger">
                        <i className="fas fa-xmark" />
                      </span>
                    ) : (
                      currentTestCase.platformType.join(", ")
                    )}
                  </li>
                  <li>
                    <b>{`${t("homepage.testCasesModal.isReturnLabel")}: `}</b>
                    {currentTestCase.isReturn ? (
                      <span className="icon has-text-success">
                        <i className="fas fa-check" />
                      </span>
                    ) : (
                      <span className="icon has-text-danger">
                        <i className="fas fa-xmark" />
                      </span>
                    )}
                  </li>
                </ul>
                <ul className="content block">
                  <li>{}</li>
                </ul>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-success"
                  onClick={() => {
                    setEmailSettings({
                      receivesInvoice: currentTestCase.receivesInvoice,
                      receivesLicenses: currentTestCase.receivesLicenses,
                      platformType: currentTestCase.platformType,
                      isReturn: currentTestCase.isReturn,
                    });
                    closeModal(document.querySelector("#test-case-modal"));
                    openModal(document.querySelector("#email-modal"));
                  }}
                >
                  {t("homepage.testCasesModal.useSettingsBtn")}
                </button>
                <button
                  className="button"
                  onClick={() =>
                    closeModal(document.querySelector("#test-case-modal"))
                  }
                >
                  {t("homepage.testCasesModal.cancelBtn")}
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
