/// <reference types="cypress-iframe" />
/// <reference types="../../../cypress/cypress" />

import {mount} from 'cypress/react18';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";
import {ApplePay, ApplePayButtonColor, ApplePayButtonType, ApplePayPaymentRequest} from "./applePay";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;


describe('ApplePay Component', () => {
    let paymentSession: any = null;
    before(() => {
        cy.wrap(null).then(() => {
            return cy.getPaymentSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((_paymentSession) => {
                paymentSession = _paymentSession;
                expect(paymentSession).to.exist;
            });
        });
    });

    it('renders ApplePay with default props', () => {


        const _paymentRequest: ApplePayPaymentRequest = {
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
                buttonType: ApplePayButtonType.Plain,
                buttonColor: ApplePayButtonColor.Dark,
                //buttonLanguage: "en"
            },
            requestShipping: true,
            waitOnClick: true,
        };

        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <ApplePay paymentRequest={_paymentRequest}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-apple-pay').should('exist');
    });
});