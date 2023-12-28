/// <reference types="cypress-iframe" />
/// <reference types="cypress-iframe" />
/// <reference types="../../../cypress/cypress" />


import {mount} from 'cypress/react18';

import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer} from "../../digitalriver";
import {Wallet} from "./wallet";
import {OrderSummary} from "./orderSummary";
import {Address} from "./address";
import {Components} from "./components";
import {Shipping} from "./shipping";
import {TaxIdentifier} from "./taxIdentifier";
import {TaxExemption} from "./taxExemption";
import {InvoiceAttribute} from "./invoiceAttribute";
import {Payment} from "./payment";
import {ThankYou} from "./thankYou";
import {Compliance} from "./compliance";
import React from "react";

const publicApiKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;


describe('Digital River Components Checkout', () => {
    let checkoutSessionLink: any = null;
    before(() => {
        cy.wrap(null).then(async () => {
            return cy.getCheckoutSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((response) => {
                checkoutSessionLink = response.body;
                expect(checkoutSessionLink).to.exist;
            });
        });
    });

    it('renders Components Checkout with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={publicApiKey}
                                   locale={locale}
                                   enableDigitalRiverCheckout={true}
                                   enableDigitalRiver={true}>
                <Components checkoutSessionLink={checkoutSessionLink}>
                    <Wallet/>
                    <OrderSummary/>
                    <Address/>
                    <Shipping/>
                    <TaxIdentifier/>
                    <TaxExemption/>
                    <InvoiceAttribute/>
                    <Payment/>
                    <ThankYou/>
                    <Compliance/>
                </Components>
            </DigitalRiverContainer>
        );
        cy.get('#dr-wallet').should('exist');
        cy.get('#dr-order-summary').should('exist');
        cy.get('#dr-shipping').should('exist');
        cy.get('#dr-tax-identifier').should('exist');
        cy.get('#dr-tax-exemption').should('exist');
        cy.get('#dr-invoice-attribute').should('exist');
        cy.get('#dr-payment').should('exist');
        cy.get('#dr-thank-you').should('exist');
    });

    it('triggers onReady event when input changes', () => {
        const onReady = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={publicApiKey}
                                   locale={locale}
                                   enableDigitalRiverCheckout={true}
                                   enableDigitalRiver={true}>
                <Components checkoutSessionLink={checkoutSessionLink} onReady={onReady}>
                    <Wallet/>
                    <OrderSummary/>
                    <Address/>
                    <Shipping/>
                    <TaxIdentifier/>
                    <TaxExemption/>
                    <InvoiceAttribute/>
                    <Payment/>
                    <ThankYou/>
                    <Compliance/>
                </Components>
            </DigitalRiverContainer>
        );
        cy.wrap(onReady).should('be.called');
    });
});