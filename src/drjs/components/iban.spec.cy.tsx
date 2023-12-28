/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {IBAN} from './iban.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('IBAN Component', () => {
    it('renders IBAN with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <IBAN/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-iban').should('exist');
    });

    it('renders IBAN with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <IBAN elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onChange event when input changes', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <IBAN onChange={onChange}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="iban-"]');

        cy.iframe('iframe[id^="iban-"]').find('input[type=text]').trigger('onfocus');
        cy.iframe('iframe[id^="iban-"]').find('input[type=text]').first().type('123', {force: true});
        cy.wrap(onChange).should('be.called');
    });

});