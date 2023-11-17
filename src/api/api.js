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

  /****************************************************
   ***************** API Methods
   ****************************************************/

  /**
   * Active Requests
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
    return res.loanRequest;
  }

  /** Get all Active Loan Requests by BorrowerId */
  static async getActiveRequestsByBorrowerId(id) {
    const res = await this.request(`activerequests/users/${id}`);
    return res.activeRequests;
  }

  /** Get active request by id */
  static async getActiveRequest(id) {
    const res = await this.request(`activerequests/${id}`);
    return res.activeRequest;
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

  /**
   * Funded Loans
   */

  /** Get all Active Loan Requests */
  static async getFundedLoans() {
    const res = await this.request("fundedloans");
    return res.fundedLoans;
  }

  /** Get all Funded Loans by UserId */
  static async getFundedLoansByUserId(id) {
    const res = await this.request(`fundedloans/${id}/users`);
    return res.fundedLoans;
  }

  /** Pay Loan Installment */
  static async payInstallment(id) {
    const res = await this.request(
      `fundedloans/${id}/payinstallment`,
      {},
      "patch"
    );
    return res.fundedLoan;
  }

  /**
   * Approved Requests
   */

  /** Get all Approved Requests by UserId */
  static async getApprovedRequestsByUserId(id) {
    const res = await this.request(`approvedrequests/users/${id}`);
    return res.approvedRequests;
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
  static async enableFundingForApprovedRequest(reqId) {
    const res = await this.request(
      `approvedrequests/${reqId}/enablefunding`,
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
      "delete"
    );
    return res.message;
  }

  /**
   * Users
   */

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

  /** Get list of existing user roles */
  static async getRoles() {
    const res = await this.request("roles");
    return Object.keys(res.roles);
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

  /**
   * Helpers
   */

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
}

export default BorrowcapApi;
