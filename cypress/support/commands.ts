/// <reference types="cypress-iframe" />

import 'cypress-iframe';
import demoConfigJson from "../../configuration/demo.config.json";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/*
Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.ready(function() {
            resolve($iframe.contents().find('body'));
        });
    });
});
 */

Cypress.Commands.add('getPaymentSession', (apiKey: string, secretApiKey: string, type: string = 'digital', country: string = 'US', recurring: string = 'false'): any => {
    return cy.request(`https://tools.drapi.io/cm/drop-in/drRequestPaymentSession.php?type=${type}&country=${country}&recurring=${recurring}&apiKey=${apiKey}&secretKey=${secretApiKey}`, (response: any) => {
        return response.body;
    }).then((data) => {
        return data.body;
    });
});

Cypress.Commands.add('getCheckoutSession', (apiKey: string, secretApiKey: string, type: string = 'digital', country: string = 'US', recurring: string = 'false', currency: string = 'USD'): any => {

    const checkoutSessionRequest: any = {
        "currency": currency,
        "items": [],
    };
    return cy.request({
        url: 'https://api.digitalriver.com/skus',
        headers: {
            'Authorization': 'Bearer ' + secretApiKey,
            'Content-Type': 'application/json',
        }
    }).then((response: any) => {
        const skuData = response.body;

        let physical = false;
        let shipFrom;
        if (!demoConfigJson.defaultAddress.shipTo.hasOwnProperty(country)) {
            shipFrom = demoConfigJson.defaultAddress.shipTo['us'];
        } else {
            // @ts-ignore
            shipFrom = demoConfigJson.defaultAddress.shipTo[country];
        }
        if (type === 'physical') {
            physical = true;
            if (shipFrom) {
                checkoutSessionRequest["shipFrom"] = shipFrom;
            }
            checkoutSessionRequest["options"] = {
                "shippingMethods": [
                    {
                        "amount": 5,
                        "description": "Standard",
                        "serviceLevel": "SG"
                    },
                    {
                        "amount": 15,
                        "description": "Express",
                        "serviceLevel": "EX"
                    }
                ]
            }
        }
        const skuItem = skuData.data.find((sku: any) => {
            return sku.physical === physical;
        });
        if (skuItem) {
            checkoutSessionRequest.items.push({
                "skuId": skuItem.id,
                "quantity": 1,
                "price": 99,
            });
        }
        return cy.request({
            method: 'POST',
            url: 'https://api.digitalriver.com/drop-in/checkout-sessions',
            headers: {
                'Authorization': 'Bearer ' + secretApiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutSessionRequest),
        });
    });
});
