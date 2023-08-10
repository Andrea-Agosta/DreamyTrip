import format from 'date-fns/format';
import { ISearchFlightRequest, ISearchFlightsResponse } from '../types/tequila.type';
import { Request } from 'express';
import { tequilaClient } from '../utils/apiConnection';


export const getFlights = async (req: Request): Promise<ISearchFlightsResponse[]> => {
  try {
    const data: ISearchFlightRequest = {
      fly_from: req.body.fly_from,
      date_from: format(new Date(req.body.date_from), 'dd/MM/yyyy'),
      date_to: format(new Date(req.body.date_to), 'dd/MM/yyyy'),
    };
    req.body.fly_to && (data.fly_to = req.body.fly_to);
    req.body.return_from && (data.return_from = format(new Date(req.body.return_from), 'dd/MM/yyyy'));
    req.body.return_to && (data.return_to = format(new Date(req.body.return_to), 'dd/MM/yyyy'));
    req.body.nights_in_dst_from && (data.nights_in_dst_from = Math.floor(req.body.nights_in_dst_from));
    req.body.nights_in_dst_to && (data.nights_in_dst_to = Math.floor(req.body.nights_in_dst_to));
    req.body.max_fly_duration && (data.max_fly_duration = Math.floor(req.body.max_fly_duration));
    req.body.ret_from_diff_city && (data.ret_from_diff_city = req.body.ret_from_diff_city);
    req.body.ret_to_diff_city && (data.ret_to_diff_city = req.body.ret_to_diff_city);
    req.body.one_for_city && (data.one_for_city = Math.floor(req.body.one_for_city));
    req.body.one_per_date && (data.one_per_date = Math.floor(req.body.one_per_date));
    req.body.adults && (data.adults = Math.floor(req.body.adults));
    req.body.children && (data.children = Math.floor(req.body.children));
    req.body.infants && (data.infants = Math.floor(req.body.infants));
    req.body.selected_cabins && (data.selected_cabins = req.body.selected_cabins);
    req.body.mix_with_cabins && (data.mix_with_cabins = req.body.mix_with_cabins);
    req.body.adult_hold_bag && (data.adult_hold_bag = req.body.adult_hold_bag);
    req.body.adult_hand_bag && (data.adult_hand_bag = req.body.adult_hand_bag);
    req.body.child_hold_bag && (data.child_hold_bag = req.body.child_hold_bag);
    req.body.child_hand_bag && (data.child_hand_bag = req.body.child_hand_bag);
    req.body.fly_days && (data.fly_days = req.body.fly_days);
    req.body.fly_days_type && (data.fly_days_type = req.body.fly_days_type);
    req.body.ret_fly_days && (data.ret_fly_days = req.body.ret_fly_days);
    req.body.ret_fly_days_type && (data.ret_fly_days_type = req.body.ret_fly_days_type);
    req.body.only_working_days && (data.only_working_days = req.body.only_working_days);
    req.body.only_weekends && (data.only_weekends = req.body.only_weekends);
    req.body.partner_market && (data.partner_market = req.body.partner_market);
    req.body.curr && (data.curr = req.body.curr);
    req.body.locale && (data.locale = req.body.locale);
    req.body.price_from && (data.price_from = Math.floor(req.body.price_from));
    req.body.price_to && (data.price_to = Math.floor(req.body.price_to));
    req.body.dtime_from && (data.dtime_from = req.body.dtime_from.split(':')[0] + ':00');
    req.body.dtime_to && (data.dtime_to = req.body.dtime_to.split(':')[0] + ':00');
    req.body.atime_from && (data.atime_from = req.body.atime_from.split(':')[0] + ':00');
    req.body.atime_to && (data.atime_to = req.body.atime_to.split(':')[0] + ':00');
    req.body.ret_dtime_from && (data.ret_dtime_from = req.body.ret_dtime_from.split(':')[0] + ':00');
    req.body.ret_dtime_to && (data.ret_dtime_to = req.body.ret_dtime_to.split(':')[0] + ':00');
    req.body.ret_atime_from && (data.ret_atime_from = req.body.ret_atime_from.split(':')[0] + ':00');
    req.body.ret_atime_to && (data.ret_atime_to = req.body.ret_atime_to.split(':')[0] + ':00');
    req.body.stopover_from && (data.stopover_from = req.body.stopover_from);
    req.body.stopover_to && (data.stopover_to = req.body.stopover_to);
    req.body.max_stopovers && (data.max_stopovers = Math.floor(req.body.max_stopovers));
    req.body.max_sector_stopovers && (data.max_sector_stopovers = Math.floor(req.body.max_sector_stopovers));
    req.body.conn_on_diff_airport && (data.conn_on_diff_airport = Math.floor(req.body.conn_on_diff_airport));
    req.body.ret_from_diff_airport && (data.ret_from_diff_airport = Math.floor(req.body.ret_from_diff_airport));
    req.body.ret_to_diff_airport && (data.ret_to_diff_airport = Math.floor(req.body.ret_to_diff_airport));
    req.body.select_airlines && (data.select_airlines = req.body.select_airlines);
    req.body.select_airlines_exclude && (data.select_airlines_exclude = req.body.select_airlines_exclude);
    req.body.select_stop_airport && (data.select_stop_airport = req.body.select_stop_airport);
    req.body.select_stop_airport_exclude && (data.select_stop_airport_exclude = req.body.select_stop_airport_exclude);
    req.body.vehicle_type && (data.vehicle_type = req.body.vehicle_type);
    req.body.enable_vi && (data.enable_vi = req.body.enable_vi);
    req.body.sort && (data.sort = req.body.sort);
    req.body.limit && (data.limit = req.body.limit);

    const flights = await tequilaClient(data, '/search');
    return flights.data;
  } catch (error) {
    throw new Error(error.message);
  }
};