/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {CardCvv} from './cardCvv.tsx';
import demoConfigJson from "../../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../../digitalriver";
import {AddressEntry} from "../../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;


describe('CardCvv Component', () => {
    it('renders CardCvv with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en_US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardCvv/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-card-cvv').should('exist');
    });

    it('renders CardCvv with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en_US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardCvv elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onChange event when input changes', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en_US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardCvv onChange={onChange}/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="cardcvv-"]');
        cy.iframe('iframe[id^="cardcvv-"]').find('input[type=text]').first().trigger('onfocus');
        cy.iframe('iframe[id^="cardcvv-"]').find('input[type=text]').first().type('123', {force: true});
        cy.focused().then(console.log);
        cy.get('#btn').focus();
        cy.wrap(onChange).should('be.called');
    });


    it('handles invalid input correctly', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en_US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardCvv elementId="error"/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="cardcvv-"]');
        cy.iframe('iframe[id^="cardcvv-"]').find('input[type=text]').first().trigger('onfocus');
        cy.iframe('iframe[id^="cardcvv-"]').find('input[type=text]').first().type('0', {force: true});
        cy.focused().then(console.log);
        cy.get('#btn').focus();
        cy.get('#error').should('have.class', 'DRElement--invalid');

    });
});