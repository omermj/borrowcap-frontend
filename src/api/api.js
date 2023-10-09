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

  /** Get all Pledged Investments by InvestorId */
  static async getPledgedInvestmentsByInvestorId(id) {
    const res = await this.request(`users/${id}/pledgedinvestments`);
    return res.pledgedInvestments;
  }

  /** Get all available investments */
  static async getAvailableInvestments() {
    const res = await this.request(`approvedrequests/available`);
    return res.availableInvestments;
  }

  /** Get approved requests */
  static async getApprovedRequests() {
    const res = await this.request(`approvedrequests`);
    return res.approvedRequests;
  }

  /** Get current user */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Login user */
  static async login(loginData) {
    const res = await this.request(`auth/token`, loginData, "post");
    return res.token;
  }

  /** Signup User */
  static async signup(signupData) {
    const res = await this.request(`auth/register`, signupData, "post");
    return res.token;
  }
}

export default BorrowcapApi;
