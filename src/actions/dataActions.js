export const DATA_ADD_FLIGHTLOG = 'DATA_ADD_FLIGHTLOG';

export function addFlightLogData(data) {
  return {
    type: DATA_ADD_FLIGHTLOG,
    data,
  };
}
