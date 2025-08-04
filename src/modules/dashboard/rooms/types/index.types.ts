export type RooomsResponseType = {
  message: string;
  skip: number;
  total: number;
  totalPages: number;
  data: Array<RoomType>;
};

export type RoomType = {
  amenities: Array<string>;
  bedType: string;
  capacity: number;
  description: string;
  images: Array<string>;
  isAvailable: boolean;
  isFeatured: boolean;
  name: string;
  pricePerNight: string | number;
  slug: string;
  _id: string;
};
