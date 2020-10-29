// Domain URL
export const apiDomain = "http://localhost:3000/";

// Auth URIs
export const loginUrl = apiDomain + "login";
export const registerUrl = apiDomain + "register";
export const resetUrl = apiDomain + "password/forgot";
export const newPasswordUrl = apiDomain + "password/reset";

// User URIs
export let transactionsUrl = function(page, results) {
  return apiDomain + "api/trades/" + page + "&" + results;
};
export const walletUrl = apiDomain + "user/wallet";
export const buyUrl = apiDomain + "user/buy";
export const sellUrl = apiDomain + "user/sell";
export const rankingUrl = apiDomain + "api/ranking";
export const coinsTableUrl = apiDomain + "api/coins/"; // + page&limit (pagination)
export const coinPriceUrl = apiDomain + "api/coin";
export const userUpdateUrl = apiDomain + "user";
export let coinChartUrl = function(symbol, days) {
  if (days == 0) {
    return apiDomain + "api/coin/" + symbol.toLowerCase() + "/8h";
  } else if (days == 1) {
    return apiDomain + "api/coin/" + symbol.toLowerCase() + "/24h";
  } else if (days == 7) {
    return apiDomain + "api/coin/" + symbol.toLowerCase() + "/7d";
  }
};

// External API coingecko
export let coinDetailsUrl = function(coinId) {
  return `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`;
};

// Admin URIs
export const coinUrl = apiDomain + "admin/coin/"; // + coinId (e.g. 1)
export const paginatedUsersUrl = apiDomain + "admin/users/"; // + limit&offset (e.g. 2&2)

// Function to include token in ajax request header
export const getHeader = function() {
  const token = localStorage.getItem("access_token");
  const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token
  };
  return headers;
};
