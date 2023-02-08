const attachCookie = ({ res, token, remember }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const thirtyDays = oneDay * 30;
  const expireDay = remember ? thirtyDays : oneDay;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + expireDay),
    secure: process.env.NODE_ENV === 'production',
  });
};

export default attachCookie;
