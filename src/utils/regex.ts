export const emailRegexp =
  // process.env.NODE_ENV === 'production'
  //   ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ :
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~*!@$#%^&(){}\]:;<>,.?~_+\-=|\\])[A-Za-z\d~*!@$#%^&(){}\]:;<>,.?~_+\-=|\\]{8,15}$/;
