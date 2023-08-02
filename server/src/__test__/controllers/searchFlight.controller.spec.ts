import { add, format, startOfToday } from 'date-fns'
import { ISearchFlightRequest } from '../../config/type/tequilaType';
import { Request } from 'express';
import * as controller from '../../controllers/searchFlight.controller';
import * as searchFlightService from '../../service/searchFlight.service';
import { BadRequestError } from '../../utils/customErrors';

jest.mock('../../service/searchFlight.service.ts');

const requiredData: ISearchFlightRequest = {
  fly_from: "ARN",
  date_from: `${format(startOfToday(), 'MM-dd-yyyy')}`,
  date_to: `${format(add(startOfToday(), { weeks: 1 }), 'MM-dd-yyyy')}`
}

const data = {
  fly_from: 'ARN',
  fly_to: 'CDG',
  date_from: `${format(startOfToday(), 'MM-dd-yyyy')}`,
  date_to: `${format(add(startOfToday(), { weeks: 1 }), 'MM-dd-yyyy')}`,
  return_from: `${format(add(startOfToday(), { weeks: 1, days: 1 }), 'MM-dd-yyyy')}`,
  return_to: `${format(add(startOfToday(), { weeks: 1, days: 3 }), 'MM-dd-yyyy')}`,
  nights_in_dst_from: 2,
  nights_in_dst_to: 3,
  max_fly_duration: 20,
  ret_from_diff_city: true,
  ret_to_diff_city: true,
  one_for_city: 0,
  one_per_date: 0,
  adults: 2,
  children: 2,
  infants: 0,
  selected_cabins: 'C',
  mix_with_cabins: 'M',
  adult_hold_bag: '1,0',
  adult_hand_bag: '1,1',
  child_hold_bag: '2,1',
  child_hand_bag: '1,1',
  fly_days: 'fly_days=0',
  fly_days_type: 'departure',
  ret_fly_days: 'ret_fly_days=0',
  ret_fly_days_type: 'departure',
  only_working_days: false,
  only_weekends: false,
  partner_market: 'us',
  curr: 'SEK',
  locale: 'en',
  price_from: 500,
  price_to: 2000,
  dtime_from: '11:00',
  dtime_to: '23:00',
  atime_from: '10:00',
  atime_to: '20:00',
  ret_dtime_from: '9:00',
  ret_dtime_to: '23:00',
  ret_atime_from: '8:00',
  ret_atime_to: '23:00',
  stopover_from: '48:00',
  stopover_to: '48:00',
  max_stopovers: 2,
  max_sector_stopovers: 2,
  conn_on_diff_airport: 0,
  ret_from_diff_airport: 1,
  ret_to_diff_airport: 0,
  select_airlines: 'MMA',
  select_airlines_exclude: true,
  select_stop_airport: 'MMA',
  select_stop_airport_exclude: false,
  vehicle_type: 'aircraft',
  enable_vi: false,
  sort: 'duration',
  limit: 300
}

describe('searchFlight controller test', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockGetFlightsService = jest.spyOn(searchFlightService, 'getFlights');
    const mockResponse = 'Service called successfully';
    mockGetFlightsService.mockResolvedValue(Promise.resolve(mockResponse as any));
  });

  describe('successufull request', () => {
    it('controller pass successfully with required data', async () => {
      const req: Request = {
        body: requiredData,
      } as Request;

      expect(await controller.getFlights(req)).toBe('Service called successfully');
    });

    it('controller pass successfully with all data', async () => {
      const req: Request = {
        body: data,
      } as Request;

      expect(await controller.getFlights(req)).toBe('Service called successfully');
    });
  });

  describe('failed request', () => {
    it('request failed vrong value in date_from ', async () => {
      const failedRequest = { ...requiredData, date_from: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

  });
});