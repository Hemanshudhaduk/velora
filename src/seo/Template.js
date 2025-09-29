export const SeoTemplate = _value => {
  return {
    title: _value.title,
    description: _value.description,
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: _value.metadataBase,
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        sv: "/sv",
      },
    },
    openGraph: {
      title: _value.title,
      description: _value.description,
      url: _value.metadataBase,
      siteName: _value.title,
      // need to add the images
      images: [],
      locale: "en",
      type: "website",
    },
    // add twitter and facebook access for marketing
  };
};
