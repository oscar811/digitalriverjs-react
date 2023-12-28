/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {Konbini} from './konbini.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('Konbini Component', () => {
    it('renders Konbini with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"ja-JP"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"JPY"}>
                    <Konbini/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-konbini').should('exist');
    });

    it('renders Konbini with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"ja-JP"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"JPY"}>
                    <Konbini elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onChange event when input changes', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"ja-JP"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"JPY"}>
                    <Konbini onChange={onChange}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="konbini-"]');
        cy.iframe('iframe[id^="konbini-"]').find('.custom-select-opener').click();
        cy.iframe('iframe[id^="konbini-"]').find('[role=listbox]>[role=option]').eq(1).click({force: true});
        cy.wrap(onChange).should('be.called');
    });

});