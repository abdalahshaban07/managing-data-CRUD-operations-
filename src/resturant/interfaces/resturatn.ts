export interface IResturant {
  name: string;
  uniqueName: string;
  cuisine: string;
  location: ILocation;
}

export interface ILocation {
  type: string;
  coordinates: [Number];
}
