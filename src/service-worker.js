/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Файлы сборки (CRA автоматически вставит список)
precacheAndRoute(self.__WB_MANIFEST);

// Кэшируем запросы к API
registerRoute(
  ({ url }) => url.origin === "https://your-api-server.com",
  new StaleWhileRevalidate()
);

// Событие для обновления
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});