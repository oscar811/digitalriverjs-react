/// <reference types="cypress-iframe" />
/// <reference types="../../../cypress/cypress" />

import {mount} from 'cypress/react18';
import {GooglePay, GooglePayButtonColor, GooglePayButtonType, GooglePayPaymentRequest} from './googlePay.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('GooglePay Component', () => {
    let paymentSession: any = null;
    before(() => {
        cy.wrap(null).then(() => {
            return cy.getPaymentSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((_paymentSession) => {
                paymentSession = _paymentSession;
                expect(paymentSession).to.exist;
            });
        });
    });

    it('renders GooglePay with default props', () => {
        const _paymentRequest: GooglePayPaymentRequest = {
            sessionId: paymentSession.session.id,
            country: "US",
            currency: "USD",
            total: {
                label: "Order Total",
                amount: 48
            },
            displayItems: [
                {
                    label: "Product 1",
                    amount: 10,
                },
                {
                    label: "Product 2",
                    amount: 15,
                },
                {
                    label: "Product 2",
                    amount: 15,
                }
            ],
            shippingOptions: [
                {
                    id: "overnight-shipping",
                    label: "Overnight Shipping",
                    amount: 10,
                    detail: "Get this in 1 business day."
                },
                {
                    id: "default-shipping",
                    label: "Default Shipping",
                    amount: 2,
                    detail: "Get this in 7 business day.",
                    selected: true
                },
            ],
            style: {
                buttonType: GooglePayButtonType.Plain,
                buttonColor: GooglePayButtonColor.Dark,
                //buttonLanguage: "en"
            },
            requestShipping: true,
            waitOnClick: true,
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <GooglePay paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-google-pay').should('exist');
    });

    it('renders GooglePay with custom elementId', () => {
        const _paymentRequest: GooglePayPaymentRequest = {
            sessionId: paymentSession.session.id,
            country: "US",
            currency: "USD",
            total: {
                label: "Order Total",
                amount: 48
            },
            displayItems: [
                {
                    label: "Product 1",
                    amount: 10,
                },
                {
                    label: "Product 2",
                    amount: 15,
                },
                {
                    label: "Product 2",
                    amount: 15,
                }
            ],
            shippingOptions: [
                {
                    id: "overnight-shipping",
                    label: "Overnight Shipping",
                    amount: 10,
                    detail: "Get this in 1 business day."
                },
                {
                    id: "default-shipping",
                    label: "Default Shipping",
                    amount: 2,
                    detail: "Get this in 7 business day.",
                    selected: true
                },
            ],
            style: {
                buttonType: GooglePayButtonType.Plain,
                buttonColor: GooglePayButtonColor.Dark,
                //buttonLanguage: "en"
            },
            requestShipping: true,
            waitOnClick: true,
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <GooglePay elementId="custom-id" paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onReady event when input changes', () => {
        const _paymentRequest: GooglePayPaymentRequest = {
            sessionId: paymentSession.session.id,
            country: "US",
            currency: "USD",
            total: {
                label: "Order Total",
                amount: 48
            },
            displayItems: [
                {
                    label: "Product 1",
                    amount: 10,
                },
                {
                    label: "Product 2",
                    amount: 15,
                },
                {
                    label: "Product 2",
                    amount: 15,
                }
            ],
            shippingOptions: [
                {
                    id: "overnight-shipping",
                    label: "Overnight Shipping",
                    amount: 10,
                    detail: "Get this in 1 business day."
                },
                {
                    id: "default-shipping",
                    label: "Default Shipping",
                    amount: 2,
                    detail: "Get this in 7 business day.",
                    selected: true
                },
            ],
            style: {
                buttonType: GooglePayButtonType.Plain,
                buttonColor: GooglePayButtonColor.Dark,
                //buttonLanguage: "en"
            },
            requestShipping: true,
            waitOnClick: true,
        };
        const onReady = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <GooglePay onReady={onReady} paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="googlepay-"]');
        cy.iframe('iframe[id^="googlepay-"]').find('button',).should('be.exist');
        cy.wrap(onReady).should('be.called');
    });

    /*
    it('handles invalid paymentRequest correctly', () => {
        const _paymentRequest: GooglePayPaymentRequest = {
            sessionId: paymentSession.session.id,
            country: "US",
            currency: "USD",
            total: {
                label: "Order Total",
                amount: 48
            },
            requestShipping: false,
        };
        const onError = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <GooglePay elementId="error" onError={onError} paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="googlepay-"]');
        cy.wrap(onError).should('be.called');
    });
    */
});