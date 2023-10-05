"use strict";

import axios from "axios";

const BASE_URL = "http://localhost:3001";

/** API Class used to provide access to BorrowCap Backend */

class BorrowcapApi {
  /** Auth token */
  static token;

  /** General API reqest method */
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BorrowcapApi.token}` };
    const params = method === "get" ? data : {};

    try {
      const res = (await axios({ url, method, data, params, headers })).data;
      return res;
    } catch (e) {
      console.error("API Error:", e.response);
      let message = e.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * API Methods
   */

  /** Get all Active Loan Requests */
  static async getLoanRequests() {
    const res = await this.request("activerequests");
    return res.activeRequests;
  }

  /** Get all Active Loan Requests */
  static async getFundedLoans() {
    const res = await this.request("fundedloans");
    return res.fundedLoans;
  }

  /** Get all Active Loan Requests by BorrowerId */
  static async getLoanRequestsByBorrowerId(id) {
    const res = await this.request(`users/${id}/activerequests`);
    return res.activeRequests;
  }

  /** Get all Funded Loans by BorrowerId */
  static async getFundedLoansByBorrowerId(id) {
    const res = await this.request(`users/${id}/fundedloans`);
    return res.fundedLoans;
  }

  /** Get all Active Investments by InvestorId */
  static async getActiveInvestmentsByInvestorId(id) {
    const res = await this.request(`users/${id}/activeinvestments`);
    return res.activeInvestments;
  }
}

export default BorrowcapApi;
