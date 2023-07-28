import { parseISO, isBefore, startOfToday, isAfter } from 'date-fns';
import { ISearchFlightsResponse } from "../config/type/tequilaType";
import { Request } from 'express';
import { BadRequestError } from "../utils/customErrors";
import { countryCodes } from '../utils/data/countryCode_ISO 3166';
import { currenciesList } from '../utils/data/currenciesList';
import { getFlights as getFlightsService } from '../service/searchFlight.service';


const isNight_in_dst = (from: number, to: number): boolean => !from && !to || (from >= 0 && to >= from);
const isPositiveNum = (value: number): boolean => !value || value >= 0;
const ispartner_market = (market: string) => (!market || countryCodes.includes(market));
const isCurrency = (currency: string) => (!currency || currenciesList.includes(currency));

const isValidCabin = (cabin?: string, mix?: string): boolean => {
  const validCabinValues = new Set(['M', 'W', 'C', 'F']);
  return !cabin || validCabinValues.has(cabin) && (!mix || validCabinValues.has(mix));
}

const isValidHoldBags = (bags: string): boolean => {
  if (!bags) {
    return true;
  }
  const bagCounts = bags.split(',').map(Number);
  const isInvalidCount = bagCounts.some((count) => isNaN(count) || count < 0 || count > 2);
  return !isInvalidCount;
};

const isValidHandBags = (bags: string): boolean => {
  if (!bags) {
    return true;
  }
  const bagCounts = bags.split(',').map(Number);
  return bagCounts.every((count) => count >= 0 && count <= 1);
};

const isValidFlyDays = (days: string | undefined, daysType: string | undefined): boolean => {
  if (!days && !daysType) {
    return true;
  }

  const regex = /(\d+)/g;
  const flyDays = (days?.match(regex) || []).map(Number);

  const isValidDay = (day: number) => day >= 0 && day <= 6;
  const areAllDaysValid = flyDays.every(isValidDay);

  if (!daysType) {
    return areAllDaysValid;
  }

  return areAllDaysValid && (daysType === 'departure' || daysType === 'arrival');
};

export const isValidHourFormat = (hour: string | undefined): boolean => {
  const hourRegex = /^(0\d|1\d|2[0-3]):[0-5]\d$/;
  return !hour || hourRegex.test(hour);
};

export const isValidStopoverFormat = (stopover: string | undefined): boolean => {
  const stopoverRegex = /^\d{1,9}:[0-5]\d$$/;
  return !stopover || stopoverRegex.test(stopover);
};

export const isZeroOrOne = (value: number | undefined): boolean => {
  return !value || (value === 0 || value === 1);
};


export const getFlights = async (req: Request): Promise<ISearchFlightsResponse[]> => {
  const today: Date = startOfToday();
  if (
    parseISO(req.body.date_from) &&
    parseISO(req.body.date_to) &&
    isBefore(req.body.date_from, req.body.date_to) &&
    isAfter(req.body.date_from, today) &&
    isNight_in_dst(req.body.nights_in_dst_from, req.body.nights_in_dst_to) &&
    isPositiveNum(req.body.max_fly_duration) &&
    isPositiveNum(req.body.one_for_city) &&
    isPositiveNum(req.body.one_per_date) &&
    isPositiveNum(req.body.adults) &&
    isPositiveNum(req.body.children) &&
    isPositiveNum(req.body.infants) &&
    isValidCabin(req.body.selected_cabins, req.body.mix_with_cabins) &&
    isValidHoldBags(req.body.adult_hold_bag) && isValidHoldBags(req.body.child_hold_bag) &&
    isValidHandBags(req.body.adult_hand_bag) && isValidHandBags(req.body.child_hand_bag) &&
    isValidFlyDays(req.body.fly_days, req.body.fly_days_type) && isValidFlyDays(req.body.ret_fly_days, req.body.ret_fly_days_type) &&
    ispartner_market(req.body.partner_market) &&
    isCurrency(req.body.curr) &&
    req.body.locale || req.body.locale === 'en' &&
    isValidHourFormat(req.body.dtime_from) && isValidHourFormat(req.body.dtime_to) && isValidHourFormat(req.body.atime_from) && isValidHourFormat(req.body.atime_to) &&
    isValidHourFormat(req.body.ret_dtime_from) && isValidHourFormat(req.body.ret_dtime_to) && isValidHourFormat(req.body.ret_atime_from) && isValidHourFormat(req.body.ret_atime_to) &&
    isValidStopoverFormat(req.body.stopover_from) && isValidStopoverFormat(req.body.stopover_to) &&
    (!req.body.max_stopovers || req.body.max_stopovers >= 0) &&
    (!req.body.max_sector_stopovers || req.body.max_sector_stopovers >= 0) &&
    isZeroOrOne(req.body.conn_on_diff_airport) && isZeroOrOne(req.body.ret_from_diff_airport) && isZeroOrOne(req.body.ret_to_diff_airport) &&
    (!req.body.vehicle_type || req.body.vehicle_type === 'aircraft' || req.body.vehicle_type === 'bus' || req.body.vehicle_type === 'train') &&
    (!req.body.sort || req.body.sort === 'price' || req.body.sort === 'duration' || req.body.sort === 'quality' || req.body.sort === 'date') &&
    !req.body.limit || (req.body.limit >= 1 && req.body.limit <= 1000)
  ) {
    return getFlightsService(req);
  }
  throw new BadRequestError('src/controllers/searchFlight.controller.ts', 'getFlights');
};
