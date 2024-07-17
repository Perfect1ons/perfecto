"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { getSettingsNotification } from "@/api/clientRequest";
import { settingsNotificationType } from "@/types/Profile/settingsNotification";

const NotificationSettings = () => {
  const [data, setData] = useState<settingsNotificationType>();
  const [initialData, setInitialData] = useState<settingsNotificationType>();
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
        .then((data) => {
          setData(data);
          setInitialData(data); // Сохраняем начальные данные
        })
        .catch((error) => setError(error.message));
    }
  }, [accessToken]);
  return (
    <section className={styles.settings}>
      <div className="container">
        <div className={styles.settings__container}>
          <h1>hello world</h1>
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;
