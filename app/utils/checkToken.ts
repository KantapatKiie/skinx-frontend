const checkTokenExpire = (token: string) => {
  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
  const isExpired = Date.now() >= jwtPayload.exp * 1000;
  return isExpired;
};

export default checkTokenExpire;
