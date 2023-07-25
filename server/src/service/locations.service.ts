import { tequilaClient } from "../utils/apiConnection";
import { ILocationQueryOptions, ILocationResponse } from "../config/type/tequilaType";

export const getLocation = async (queryParams: ILocationQueryOptions, path: string) => {
  try {
    const places = await tequilaClient(queryParams, path);
    places.locations.forEach((location: ILocationResponse) => {
      try {
        updateLocation(location);
      } catch (error) {
        addLocation(location);
      }
    });
    if (places.locations.length > 0) {

      //todo: make a recursive call to the API
      
    }
    console.log(places.locations.length, 'places');
  } catch (error) {
    throw new Error(error.message);
  }





  // .then(async resp => {
  //   if (resp.status === 200) {
  //     const msg = 'All location was saved successfully'
  //     let places = [];

  //     // STORE ALL DATA IN places ARRAY
  //     await resp.data.locations.forEach(location => {
  //       places.push(new Location(location));
  //     });

  //     // SAVE OR UPDATE ALL DATA IN DB
  //     await places.forEach(place => {
  //       Location.findOneAndUpdate(
  //         { name: place.name },
  //         { $set: place },
  //         { upsert: true, useFindAndModify: false }, () => { }
  //       );
  //     });
  //     await saveLog(msg, file);
  //     return resp;
  //   } else {
  //     return resp;
  //   }
  // });


}
