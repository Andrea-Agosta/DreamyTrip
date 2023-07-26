import { getLocations, updateLocation } from "../../repositories/locations.repository";
import { location } from "../utils/test-location-data";

jest.mock('../../utils/dbConnection.ts');


describe('Location Repository', () => {

  beforeEach(async () => {
    await updateLocation(location);
  });

  it('Get all Locations', async () => {
    const response = await getLocations();
    expect(response.length).toBe(1);
  });

  it('Save new Location', async () => {
    const customLocation = { ...location, name: 'customName' };
    await updateLocation(customLocation);
    const response = await getLocations()
    expect(response[0]?.name).toBe(customLocation.name);
  });
});