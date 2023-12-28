/// <reference types="cypress-iframe" />
/// <reference types="../../../cypress/cypress" />

import {mount} from 'cypress/react18';
import {PayPal, PayPalPaymentRequest} from './payPal.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('PayPal Component', () => {

    let paymentSession: any = null;
    before(() => {
        cy.wrap(null).then(() => {
            return cy.getPaymentSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((_paymentSession) => {
                paymentSession = _paymentSession;
                expect(paymentSession).to.exist;
            });
        });
    });

    it('renders PayPal with default props', () => {
        const _paymentRequest: PayPalPaymentRequest = {
            style: {
                label: 'checkout',
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
                layout: 'horizontal',
                fundingicons: 'false',
                tagline: 'false'
            },
            sourceData: {
                type: "payPal",
                sessionId: paymentSession.session.id,
                payPal: {
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000'
                }
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <PayPal paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-paypal').should('exist');
    });

    it('renders PayPal with custom elementId', () => {
        const _paymentRequest: PayPalPaymentRequest = {
            style: {
                label: 'checkout',
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
                layout: 'horizontal',
                fundingicons: 'false',
                tagline: 'false'
            },
            sourceData: {
                type: "payPal",
                sessionId: paymentSession.session.id,
                payPal: {
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000'
                }
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <PayPal elementId="custom-id" paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onReady event when input changes', () => {
        const _paymentRequest: PayPalPaymentRequest = {
            style: {
                label: 'checkout',
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
                layout: 'horizontal',
                fundingicons: 'false',
                tagline: 'false'
            },
            sourceData: {
                type: "payPal",
                sessionId: paymentSession.session.id,
                payPal: {
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000'
                }
            }
        };
        const onReady = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <PayPal paymentRequest={_paymentRequest} onReady={onReady}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.frameLoaded('iframe[id^="paypal-"]');
        cy.iframe('iframe[id^="paypal-"]').find('iframe',).should('be.exist');
        cy.wrap(onReady).should('be.called');
    });

    it('handles invalid input correctly', () => {
        const onError = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <PayPal elementId="error" onError={onError} paymentRequest={{
                        sourceData: {
                            type: 'paypal',
                            sessionId: paymentSession.session.id,
                            payPal: {returnUrl: 'http://localhost:3000', cancelUrl: 'http://localhost:3000'}
                        }
                    }}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="paypal-"]');
        cy.iframe('iframe[id^="paypal-"]').find('#paypal').should('exist');
    });

});