/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {IDEAL} from './ideal.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('IDEAL Component', () => {
    it('renders IDEAL with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <IDEAL/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-ideal').should('exist');
    });

    it('renders IDEAL with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <IDEAL elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

});