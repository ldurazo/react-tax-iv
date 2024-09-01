import { getRequestConfig } from "next-intl/server";

/** Hard coding the default locale for now, the goal is to prevent the use of magic strings day one */
export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
