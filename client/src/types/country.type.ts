export interface ICountry {
  country_name: string;
  country_currency: string;
  country_flag: string;
}

export interface CountryInfo {
  [key: string]: string;
}

export interface ICountryCurrencyList {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
}
