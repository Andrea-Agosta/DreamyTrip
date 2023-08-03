import { add, format, startOfToday, startOfYesterday } from 'date-fns'
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
    it('wrong value in date_from ', async () => {
      const failedRequest = { ...requiredData, date_from: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('wrong value in date_to ', async () => {
      const failedRequest = { ...requiredData, date_to: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('date_from it is before of today', async () => {
      const failedRequest = { ...requiredData, date_from: startOfYesterday() };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('date_to it is before of date_from', async () => {
      const failedRequest = { ...requiredData, date_to: startOfYesterday(), date_from: startOfToday() };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('wrong value in return_from ', async () => {
      const failedRequest = { ...requiredData, return_from: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('wrong value in return_to ', async () => {
      const failedRequest = { ...requiredData, return_to: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('return_from it is before of date_to', async () => {
      const failedRequest = { ...requiredData, return_from: startOfToday() };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('return_to it is before of return_from', async () => {
      const failedRequest = {
        ...requiredData,
        return_from: `${format(add(startOfToday(), { weeks: 1, days: 3 }), 'MM-dd-yyyy')}`,
        return_to: `${format(add(startOfToday(), { weeks: 1, days: 1 }), 'MM-dd-yyyy')}`
      };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('nights_in_dst_from is defined but not nights_in_dst_to', async () => {
      const failedRequest = { ...requiredData, nights_in_dst_from: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('nights_in_dst_to is defined but not nights_in_dst_from', async () => {
      const failedRequest = { ...requiredData, nights_in_dst_to: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('nights_in_dst_from is minor of 0', async () => {
      const failedRequest = { ...requiredData, nights_in_dst_from: -2, nights_in_dst_to: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('nights_in_dst_to is minor of nights_in_dst_from', async () => {
      const failedRequest = { ...requiredData, nights_in_dst_from: 3, nights_in_dst_to: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('is isPositiveNum function receive a negative number', async () => {
      const failedRequest = { ...requiredData, max_fly_duration: -3 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('number of passengers are less than 1', async () => {
      const failedRequest = { ...requiredData, adults: -3 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('number of passengers are greater than 9', async () => {
      const failedRequest = { ...requiredData, adults: 4, children: 4, infants: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adults are less than infants', async () => {
      const failedRequest = { ...requiredData, adults: 1, infants: 4 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('selected_cabins wrong value', async () => {
      const failedRequest = { ...requiredData, selected_cabins: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('mix_with_cabins id declered but selected_cabins is undefined', async () => {
      const failedRequest = { ...requiredData, mix_with_cabins: 'C' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('mix_with_cabins have a wrong value', async () => {
      const failedRequest = { ...requiredData, mix_with_cabins: 'wrong value', selected_cabins: 'C' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hold_bag have a wrong value', async () => {
      const failedRequest = { ...requiredData, adult_hold_bag: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hold_bag have more than 2 baggage for adults', async () => {
      const failedRequest = { ...requiredData, adult_hold_bag: '2,3', adults: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hold_bag have more baggage than adults', async () => {
      const failedRequest = { ...requiredData, adult_hold_bag: '2,1,1', adults: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hand_bag have a wrong value', async () => {
      const failedRequest = { ...requiredData, adult_hand_bag: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hand_bag have more than 1 baggage for adults', async () => {
      const failedRequest = { ...requiredData, adult_hand_bag: '2,3', adults: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('adult_hand_bag have more baggage than adults', async () => {
      const failedRequest = { ...requiredData, adult_hand_bag: '1,1,1', adults: 2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('fly_days have a wrong value', async () => {
      const failedRequest = { ...requiredData, fly_days: 'wrong value', ret_fly_days_type: 'departure' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('ret_fly_days_type have a wrong value', async () => {
      const failedRequest = { ...requiredData, fly_days: '&ret_fly_days=0', ret_fly_days_type: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('partner_market have a wrong value', async () => {
      const failedRequest = { ...requiredData, partner_market: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('curr have a wrong value', async () => {
      const failedRequest = { ...requiredData, curr: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('locale have a wrong value', async () => {
      const failedRequest = { ...requiredData, locale: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('dtime_from have a wrong value', async () => {
      const failedRequest = { ...requiredData, dtime_from: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('stopover_from have a wrong value', async () => {
      const failedRequest = { ...requiredData, stopover_from: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('max_stopovers have a negative value', async () => {
      const failedRequest = { ...requiredData, max_stopovers: -2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('conn_on_diff_airport have a negative value', async () => {
      const failedRequest = { ...requiredData, conn_on_diff_airport: -2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('conn_on_diff_airport have a value grater than 2', async () => {
      const failedRequest = { ...requiredData, conn_on_diff_airport: 4 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('vehicle_type have a wrong value', async () => {
      const failedRequest = { ...requiredData, vehicle_type: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('sort have a wrong value', async () => {
      const failedRequest = { ...requiredData, sort: 'wrong value' };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });

    it('limit have a negative value', async () => {
      const failedRequest = { ...requiredData, limit: -2 };
      const req: Request = {
        body: failedRequest,
      } as Request;
      expect(async () => await controller.getFlights(req)).rejects.toThrowError(BadRequestError);
    });
  });
});