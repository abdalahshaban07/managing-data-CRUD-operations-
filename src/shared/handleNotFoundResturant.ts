import { HttpStatus } from '@nestjs/common';

export let handleNotFound = (res, value) => {
  if (!value)
    return res.status(HttpStatus.NOT_FOUND).json({ message: 'Item not found' });
  return res.status(HttpStatus.OK).json(value);
};
