/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {OfflineRefund} from './offlineRefund.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('OfflineRefund Component', () => {
    it('renders OfflineRefund with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OfflineRefund offlineRefundOptions={{refundToken: 'test-token'}}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-offline-refund').should('exist');
    });

    it('renders OfflineRefund with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OfflineRefund elementId="custom-id" offlineRefundOptions={{refundToken: 'test-token'}}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

});