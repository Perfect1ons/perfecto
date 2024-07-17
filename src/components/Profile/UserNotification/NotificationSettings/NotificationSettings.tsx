"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
import {
  getSettingsNotification,
  getSettingsNotificationUpdate,
  postNotificationSettings,
} from "@/api/clientRequest";
import {
  Avto,
  settingsNotificationType,
} from "@/types/Profile/settingsNotification";
import Image from "next/image";
import cn from "clsx";
import { settingsNotificationUpdateType } from "@/types/Profile/settingsNotificationUpdaet";

const NotificationSettings = () => {
  const [data, setData] = useState<settingsNotificationType>();
  const [dataSetting, setDataSettings] =
    useState<settingsNotificationUpdateType>();
  const [initialData, setInitialData] =
    useState<settingsNotificationUpdateType>();
  const [nds, setNds] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState("");

  const getToken = async () => {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();
      if (response.ok) {
        setAccessToken(data.accessToken.value);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to fetch access token");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getSettingsNotification(accessToken)
        .then((data) => setData(data))
        .catch((error) => setError(error.message));
    }
    if (accessToken) {
      getSettingsNotificationUpdate(accessToken)
        .then((data) => {
          setDataSettings(data);
          setInitialData(data); // Сохраняем начальные данные
        })
        .catch((error) => setError(error.message));
    }
  }, [accessToken]);
  const ndsHandler = useCallback(() => {
    setNds((prevNds) => !prevNds);
  }, []);
  const isActive = (key: string, value: string) => {
    if (!dataSetting) return false;

    switch (key) {
      case "avto":
        return dataSetting.avto?.includes(value);
      case "interest":
        return dataSetting.interest?.hasOwnProperty(value);
      case "langs":
        return dataSetting.langs?.includes(value);
      case "animals":
        return dataSetting.animals?.hasOwnProperty(value);
      default:
        return false;
    }
  };
  const handleItemClick = useCallback(
    (key: string, value: string) => {
      if (!dataSetting) return;

      setDataSettings((prevSettings: any) => {
        const newSettings = { ...prevSettings };
        let isCheck = 0;

        switch (key) {
          case "avto":
            if (newSettings.avto?.includes(value)) {
              newSettings.avto = newSettings.avto.filter(
                (item: any) => item !== value
              );
              isCheck = 0;
            } else {
              newSettings.avto = [...(newSettings.avto || []), value];
              isCheck = 1;
            }
            break;
          case "interest":
            if (newSettings.interest?.hasOwnProperty(value)) {
              const { [value]: _, ...rest } = newSettings.interest;
              newSettings.interest = rest;
              isCheck = 0;
            } else {
              newSettings.interest = {
                ...newSettings.interest,
                [value]: value,
              };
              isCheck = 1;
            }
            break;
          case "langs":
            if (newSettings.langs?.includes(value)) {
              newSettings.langs = newSettings.langs.filter(
                (item: any) => item !== value
              );
              isCheck = 0;
            } else {
              newSettings.langs = [...(newSettings.langs || []), value];
              isCheck = 1;
            }
            break;
          case "animals":
            if (newSettings.animals?.hasOwnProperty(value)) {
              const { [value]: _, ...rest } = newSettings.animals;
              newSettings.animals = rest;
              isCheck = 0;
            } else {
              newSettings.animals = {
                ...newSettings.animals,
                [value]: value,
              };
              isCheck = 1;
            }
            break;
          default:
            break;
        }

        postNotificationSettings(accessToken, key, value, isCheck).catch(
          (error) => setError(error.message)
        );

        return newSettings;
      });
    },
    [accessToken, dataSetting]
  );
  const [showAllStates, setShowAllStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleShowAll = useCallback((key: string) => {
    setShowAllStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);
  return (
    <section className={styles.settings}>
      <div className="container">
        <div className={styles.settingsNotification}>
          <div className={styles.settingsHeader}>
            <div className={styles.settingsHeader__ndsMain}>
              <p className={styles.wrap_organization_dropdown_nds_title}>
                Уведомления по смс
              </p>
              <label className={styles.settingsHeader__ndsMain__nds}>
                <input onClick={ndsHandler} type="checkbox" />
                <span className={styles.settingsHeader__ndsMain__slider}></span>
              </label>
            </div>
            <div className={styles.settingsHeader__ndsMain}>
              <p className={styles.wrap_organization_dropdown_nds_title}>
                Уведомить по e-mail
              </p>
              <label className={styles.settingsHeader__ndsMain__nds}>
                <input onClick={ndsHandler} type="checkbox" />
                <span className={styles.settingsHeader__ndsMain__slider}></span>
              </label>
            </div>
            <div className={styles.settingsHeader__ndsMain}>
              <p className={styles.wrap_organization_dropdown_nds_title}>
                Уведомить в личном кабинете
              </p>
              <label className={styles.settingsHeader__ndsMain__nds}>
                <input onClick={ndsHandler} type="checkbox" />
                <span className={styles.settingsHeader__ndsMain__slider}></span>
              </label>
            </div>
          </div>
          <div className={styles.settingsFooter}>
            <h3 className={styles.settingsFooter__title}>
              Укажите ваши интересы по которым вы бы хотели получать уведомления
              о скидках и выгодных предложений.
            </h3>
            <div className={styles.childContainer}>
              {data &&
                Object.keys(data).map((key) => {
                  const item = data[key as keyof settingsNotificationType];
                  return (
                    <div className={styles.childContainer__interest} key={key}>
                      <h2 className={styles.childContainer__interest__title}>
                        {item.title}
                      </h2>
                      <ul
                        className={styles.childContainer__interest__ulContainer}
                      >
                        {Object.entries(item.values)
                          .slice(0, showAllStates[key] ? undefined : 8)
                          .map(([index, value]) => {
                            const isActiveValue = isActive(key, index);
                            return (
                              <li
                                key={index}
                                className={
                                  styles.childContainer__interest__ulContainer__title
                                }
                                onClick={() => handleItemClick(key, index)}
                              >
                                <span
                                  className={cn(
                                    "showFiltersUlContainer__check",
                                    {
                                      ["showFiltersUlContainer__checkActive"]:
                                        isActiveValue,
                                    }
                                  )}
                                >
                                  {isActiveValue ? (
                                    <Image
                                      src="/img/checkIconWhite.svg"
                                      width={15}
                                      height={15}
                                      alt="check"
                                    />
                                  ) : (
                                    <Image
                                      src="/img/checkIconWhite.svg"
                                      width={15}
                                      height={15}
                                      alt="check"
                                    />
                                  )}
                                </span>
                                {value}
                              </li>
                            );
                          })}
                      </ul>
                      {Object.keys(item.values).length > 8 && (
                        <>
                          {!showAllStates[key] ? (
                            <button
                              className="showAllButton"
                              onClick={() => handleShowAll(key)}
                            >
                              Показать все
                            </button>
                          ) : (
                            <button
                              className="showAllButton"
                              onClick={() => handleShowAll(key)}
                            >
                              Свернуть
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;
