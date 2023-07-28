import { parseISO, isBefore, startOfToday, isAfter } from 'date-fns';
import { ISearchFlightsResponse } from "../config/type/tequilaType";
import { Request } from 'express';
import { BadRequestError } from "../utils/customErrors";


const isNight_in_dst = (from: number, to: number): boolean => !from && !to || (from >= 0 && to >= from);
const isPositiveNum = (value: number): boolean => !value || value >= 0;

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
    isValidFlyDays(req.body.fly_days, req.body.fly_days_type) && isValidFlyDays(req.body.ret_fly_days, req.body.ret_fly_days_type)
  ) {
    // call service method
  }
  throw new BadRequestError('src/controllers/searchFlight.controller.ts', 'getFlights');
};
