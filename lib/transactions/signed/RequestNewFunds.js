"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestNewFunds = void 0;
const validation_1 = require("../../utils/validation");
const SignedTransaction_1 = require("./SignedTransaction");
class RequestNewFunds extends SignedTransaction_1.SignedTransaction {
    constructor({ amount, chainCode, encryptPrivateKey = null, hash = null, maxFee, memo = null, offlineUrl = null, payeeFioAddress, payeeTokenPublicAddress, payerFioAddress, payerFioPublicKey, technologyProviderId = '', tokenCode, }) {
        super();
        this.ENDPOINT = 'chain/new_funds_request';
        this.ACTION = 'newfundsreq';
        this.ACCOUNT = 'fio.reqobt';
        this.validationData = { payerFioAddress, payeeFioAddress, tokenCode, tpid: technologyProviderId || null };
        this.validationRules = validation_1.validationRules.newFundsRequest;
        this.payerFioAddress = payerFioAddress;
        this.payerFioPublicKey = payerFioPublicKey;
        this.payeeFioAddress = payeeFioAddress;
        this.chainCode = chainCode;
        this.tokenCode = tokenCode;
        this.maxFee = maxFee;
        this.content = {
            payee_public_address: payeeTokenPublicAddress,
            amount: `${amount}`,
            chain_code: chainCode,
            token_code: tokenCode,
            memo,
            hash,
            offline_url: offlineUrl,
        };
        this.encryptPrivateKey = encryptPrivateKey;
        if (technologyProviderId) {
            this.technologyProviderId = technologyProviderId;
        }
        else {
            this.technologyProviderId = '';
        }
    }
    getData() {
        const actor = this.getActor();
        const cipherContent = this.getCipherContent('new_funds_content', this.content, this.encryptPrivateKey || this.privateKey, this.payerFioPublicKey);
        const data = {
            payer_fio_address: this.payerFioAddress,
            payee_fio_address: this.payeeFioAddress,
            content: cipherContent,
            max_fee: this.maxFee,
            tpid: this.technologyProviderId,
            actor,
        };
        return data;
    }
}
exports.RequestNewFunds = RequestNewFunds;
