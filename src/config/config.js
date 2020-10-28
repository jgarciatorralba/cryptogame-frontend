// Domain URL
export const apiDomain = "http://localhost:3000/";

// Auth URIs
export const loginUrl = apiDomain + "login";
export const registerUrl = apiDomain + "register";
// export const resetUrl = apiDomain + "reset";

// User URIs
export let transactionsUrl = function(page, results) {
  return apiDomain + "api/trades/" + page + "&" + results;
};
export const walletUrl = apiDomain + "user/wallet";
export const buyUrl = apiDomain + "user/buy";
export const sellUrl = apiDomain + "user/sell";
export const rankingUrl = apiDomain + "api/ranking";
export const coinsTableUrl = apiDomain + "api/coins";
export const coinPriceUrl = apiDomain + "api/coin";
export const userUpdateUrl = apiDomain + "user";

// External API coingecko
export let coinDetailsUrl = function(coinId) {
  return `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`;
};
export let coinChartUrl = function(id, currency, days) {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
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
