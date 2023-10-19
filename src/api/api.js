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

  /** Submit Loan Application */
  static async submitLoanApplication(data) {
    // const test = { ...data, borrowerId: 1 };
    const res = await this.request(`activerequests`, data, "post");
    console.log(res);
    return res.loanRequest;
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

  /** Get all Approved Requests by BorrowerId(id) */
  static async getApprovedRequestsByBorrowerId(id) {
    const res = await this.request(`users/${id}/approvedrequests`);
    return res.approvedRequests;
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

  /** Get details on a specific available investment */
  static async getApprovedRequest(id) {
    const res = await this.request(`approvedrequests/${id}`);
    return res.approvedRequest;
  }

  /** Get active request by id */
  static async getActiveRequest(id) {
    const res = await this.request(`activerequests/${id}`);
    return res.activeRequest;
  }

  /** Get approved requests */
  static async getApprovedRequests() {
    const res = await this.request(`approvedrequests`);
    return res.approvedRequests;
  }

  /** Fund Approved Request */
  static async fundApprovedRequest(reqId, data) {
    const res = await this.request(
      `approvedrequests/${reqId}/fund`,
      data,
      "patch"
    );
    return res.approvedRequest;
  }

  /** Enable funding for Approved Request */
  static async enableFundingForApprovedRequest(req_id) {
    const res = await this.request(
      `approvedrequests/${req_id}/enablefunding`,
      {},
      "patch"
    );
    return res.message;
  }

  /** Cancel an approved funding request */
  static async cancelApprovedRequest(id) {
    const res = await this.request(
      `approvedrequests/${id}/cancel`,
      {},
      "patch"
    );
    return res.message;
  }

  /** Approve request (By underwritter) */
  static async approveRequest(id, data) {
    const res = await this.request(
      `activerequests/${id}/approve`,
      data,
      "patch"
    );
    return res.approvedRequest;
  }

  /** Reject request (By underwriter) */
  static async rejectRequest(id) {
    const res = await this.request(`activerequests/${id}/reject`, {}, "patch");
    return res;
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

  /** Update User */
  static async updateUser(username, updateData) {
    const res = await this.request(`users/${username}`, updateData, "patch");
    return res.user;
  }

  /** Change user password */
  static async changePassword(username, data) {
    const res = await this.request(
      `users/${username}/changepassword`,
      data,
      "patch"
    );
    return res.user;
  }

  /** Get list of existing roles */
  static async getRoles() {
    const res = await this.request("roles");
    return Object.keys(res.roles);
  }

  /** Get list of existing loan purpose */
  static async getPurposes() {
    const res = await this.request("purposes");
    return res.purposes;
  }

  /** Get list of terms (in months) */
  static async getTerms() {
    const res = await this.request("terms");
    return res.terms;
  }

  /** Deposit funds in user's wallet */
  static async depositFunds(id, data) {
    const res = await this.request(`users/${id}/deposit`, data, "patch");
    return res.accountBalance;
  }

  /** Withdraw funds in user's wallet */
  static async withdrawFunds(id, data) {
    const res = await this.request(`users/${id}/withdraw`, data, "patch");
    return res.accountBalance;
  }

  /** Pay Loan Installment */
  static async payInstallment(id) {
    const res = await this.request(`fundedloans/pay/${id}`, {}, "patch");
    return res.fundedLoan;
  }
}

export default BorrowcapApi;
