import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getI18nTranslations = async (
  locale: string,
  namespaces: string[] = ["common"],
) => {
  return await serverSideTranslations(locale || "en", namespaces);
};

export const getI18nProps = (
  namespaces: string[] = ["common"],
): GetStaticProps => {
  return async ({ locale }) => ({
    props: {
      ...(await getI18nTranslations(locale || "en", namespaces)),
    },
  });
};
