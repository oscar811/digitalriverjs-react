/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {CardNumber} from "./cardNumber.tsx";
import demoConfigJson from "../../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../../digitalriver";
import {AddressEntry} from "../../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('CardNumber Component', () => {
    it('renders without crashing', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardNumber/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-card-number').should('exist');
    });

    it('renders CardNumber with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardNumber elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('handles invalid input correctly', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardNumber/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="cardnumber-"]');
        cy.iframe('iframe[id^="cardnumber-"]').find('input[type=text]').click({force: true});
        cy.iframe('iframe[id^="cardnumber-"]').find('input[type=text]').focus().type('99999999');
        cy.get('#btn').focus();
        cy.get('#dr-card-number').should('have.class', 'DRElement--invalid');
    });

    it('triggers onChange event when input changes', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardNumber onChange={onChange}/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.frameLoaded('iframe[id^="cardnumber-"]');
        cy.iframe('iframe[id^="cardnumber-"]').find('input[type=text]').click({force: true});
        cy.iframe('iframe[id^="cardnumber-"]').find('input[type=text]').focus().type('444442222233331111');
        cy.get('#btn').focus();
        cy.wrap(onChange).should('be.called');
    });

});