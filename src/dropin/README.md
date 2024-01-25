# Drop-In Payments

The Drop-In Payment feature provides a fast and easy way to add payment methods to your store’s checkout experience. It simplifies the process of integrating various payment methods into your application by providing a single, unified payment interface.  

### Overview

The Drop-In Payment feature is designed to handle the complexity of payment processing for you, so you can focus on building your application. It supports a wide range of payment methods, including credit cards, digital wallets, and more.  


For more information on Drop-In payments, please refer to the Digital River documentation:
[Drop-In Payments Documentation](https://docs.digitalriver.com/digital-river-api/payments/payment-integrations-1/drop-in)


### Configuration
```javascript
const dropInConfig: DropInOptions = {
    sessionId: paymentSessionId,
    options: {
        redirect: {
            disableAutomaticRedirects: true,
            returnUrl: location.href,
            cancelUrl: location.href,
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
```

### React component
```javascript
<DigitalRiverContainer publicApiKey={publicApiKey} locale={locale}>
    <DropIn dropInConfiguration={dropInConfig}/>
</DigitalRiverContainer>
```

