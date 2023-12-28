/// <reference types="cypress-iframe" />
/// <reference types="../../cypress/cypress" />

import {mount} from 'cypress/react18';
import {
    DropIn,
    DropInOnCancelArgument,
    DropInOnErrorArgument,
    DropInOnReadyArgument,
    DropInOptions
} from './dropIn.tsx';
import demoConfigJson from "../../configuration/demo.config.json";
import {DigitalRiverContainer} from "../digitalriver";
import {AddressEntry, PaymentSourceData} from "../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('DropIn Component', () => {
    let paymentSession: any = null;
    before(() => {
        cy.wrap(null).then(async () => {
            return cy.getPaymentSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((_paymentSession) => {
                paymentSession = _paymentSession;
                expect(paymentSession).to.exist;
            });
        });
    });


    it('renders DropIn with default props', () => {
        const dropInConfig: DropInOptions = {
            sessionId: '',
            options: {
                redirect: {
                    disableAutomaticRedirects: true,
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000',
                }
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <DropIn dropInConfiguration={dropInConfig}/>
            </DigitalRiverContainer>
        );
        cy.get('#dr-dropin').should('exist');
        //cy.get('div[id^="dr-accordion-controller-"]').should('be.exist');
        //cy.wrap(onReady).should('be.called');
    });


    it('renders DropIn with custom elementId', () => {
        const dropInConfig: DropInOptions = {
            sessionId: '',
            options: {
                redirect: {
                    disableAutomaticRedirects: true,
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000',
                }
            },
            onSuccess(source: PaymentSourceData) {
                console.log('onSuccess', source);
            },
            onError(error: DropInOnErrorArgument) {
                console.log('onError', error);
            },
            onCancel(data: DropInOnCancelArgument) {
                console.log('onCancel', data);
            },
            onReady(data: DropInOnReadyArgument) {
                console.log('onReady', data);
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <DropIn elementId="custom-id" dropInConfiguration={dropInConfig}/>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onReady event when input changes', () => {
        const onReady = cy.stub();
        const dropInConfig: DropInOptions = {
            sessionId: paymentSession.session.id,
            options: {
                redirect: {
                    disableAutomaticRedirects: true,
                    returnUrl: 'http://localhost:3000',
                    cancelUrl: 'http://localhost:3000',
                }
            },
            onSuccess(source: PaymentSourceData) {
                console.log('onSuccess', source);
            },
            onError(error: DropInOnErrorArgument) {
                console.log('onError', error);
            },
            onCancel(data: DropInOnCancelArgument) {
                console.log('onCancel', data);
            },
            onReady(data: DropInOnReadyArgument) {
                console.log('onReady', data);
                onReady();
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <DropIn dropInConfiguration={dropInConfig}/>
            </DigitalRiverContainer>
        );
        cy.get('#DR-Legal-Footer').should('be.exist');
        //cy.get('div[id^="dr-accordion-controller-"]').should('be.exist');
        //cy.frameLoaded('iframe[id^="controller-"]');

        cy.wrap(onReady).should('be.called');
    });
});