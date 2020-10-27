export const apiDomain = "http://localhost:3000/";

export const loginUrl = apiDomain + "login";
export const registerUrl = apiDomain + "register";
export const resetUrl = apiDomain + "reset";

export const transactionsUrl = apiDomain + "api/trades";
export const coinsUrl = apiDomain + "api/coins";
export const walletUrl = apiDomain + "api/wallet";
export const buyUrl = apiDomain + "api/buy";
export const sellUrl = apiDomain + "api/sell";
export const rankingUrl = apiDomain + "api/ranking";

export const getHeader = function() {
  const token = localStorage.getItem("access_token");
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token
  };
  return headers;
};
