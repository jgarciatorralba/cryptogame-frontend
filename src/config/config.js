// Domain URL
export const apiDomain = "http://localhost:3000/";

// Auth URIs
export const loginUrl = apiDomain + "login";
export const registerUrl = apiDomain + "register";
// export const resetUrl = apiDomain + "reset";

// User URIs
export const transactionsUrl = apiDomain + "api/trades";
export const walletUrl = apiDomain + "api/wallet";
export const buyUrl = apiDomain + "api/buy";
export const sellUrl = apiDomain + "api/sell";
export const rankingUrl = apiDomain + "api/ranking";
export const coinsTableUrl = apiDomain + "api/coins";
// export const coinChartUrl = apiDomain + "api/coin/";

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
