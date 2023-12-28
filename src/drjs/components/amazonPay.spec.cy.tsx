/// <reference types="../../../cypress/cypress" />

import {mount} from 'cypress/react18';
import {AmazonPay} from './amazonPay';
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import demoConfigJson from "../../../configuration/demo.config.json";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('AmazonPay Component', () => {
    let paymentSession: any = null;
    before(() => {
        cy.wrap(null).then(() => {
            return cy.getPaymentSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((_paymentSession) => {
                paymentSession = _paymentSession;
                expect(paymentSession).to.exist;
            });
        });
    });
    it('renders AmazonPay with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress}
                                sessionId={paymentSession.session.id}
                                country={paymentSession.session.customer.country}
                                currency={paymentSession.session.currency}
                                returnUrl="http://localhost:3001"
                                cancelUrl="http://localhost:3001"
                >
                    <AmazonPay
                        elementId="dr-amazon-pay"
                        resultReturnUrl="http://localhost:3001"
                        onError={(error) => {
                            console.error(error);
                            expect(error).not.to.exist;
                        }}
                    />
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-amazon-pay>div[id^="amazonpay-"]', {timeout: 10000}).should('exist');
    });

    /*
    it('triggers onError when an error occurs', () => {
        const onErrorSpy = cy.spy();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress}
                                returnUrl="http://localhost:3001"
                                cancelUrl="http://localhost:3001"
                >
                    <AmazonPay
                        elementId = "dr-amazon-pay"
                        resultReturnUrl="http://localhost:3001"
                        onError={onErrorSpy}
                    />
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.wait(10000);
        expect(onErrorSpy).to.have.been.called;
    });
    */
});