interface Itransalation {
  translation: {
    [key: string]: string;
  };
}

export interface I18NextProps {
  lng: string;
  debug: boolean;
  resources: {
    en: Itransalation;
    zh: Itransalation;
    zk: Itransalation;
  };
}
