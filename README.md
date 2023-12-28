# Digital River React component

This is a React library for integrating Digital River's APIs, including Digital River API, Digital River Checkout, and
Dynamic Pricing.

### Prerequisites

This library requires React version 17 or 18. Make sure to have one of these versions installed in your project:

### Installing

```bash
npm install digitalriverjs-react
```

## How to use

Import the necessary components from the library:

```javascript
import {DigitalRiverContainer, PaymentContext} from 'digitalriverjs-react';
```

Use the components in your application:

```javascript
<DigitalRiverContainer publicApiKey="your-public-api-key" locale="en-US">
    <PaymentContext billingAddress={billingAddress} amount={amount} currency={currency}>
        {/* Your components here */}
    </PaymentContext>
</DigitalRiverContainer>
```

In this example, replace `"your-public-api-key"` with your actual public API key from Digital River.
The `billingAddress` object should contain the billing address details, and the `amount` and `currency` props should
reflect the total amount and currency of the transaction. Remember to wrap your components with the `PaymentContext`
and `DigitalRiverContainer` components to ensure they have access to the necessary context and functionality provided by
the Digital River API.

## Running the tests

To run the automated tests for this system, use the command `npm run test`.
To run the demo, use the command `npm run start`.

