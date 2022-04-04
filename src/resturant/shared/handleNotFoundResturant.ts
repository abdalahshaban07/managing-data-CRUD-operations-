import { HttpStatus } from '@nestjs/common';

export let handleNotFoundResturant = (res, resturant) => {
  if (!resturant)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: 'Resturant not found' });
  return res.status(HttpStatus.OK).json(resturant);
};
