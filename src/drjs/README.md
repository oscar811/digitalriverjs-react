# DigitalRiver.js with Elements

* ## [Credit Card Elements](#creditCard)

    ### Configuration
    
    ```javascript
    const styleOption = {
    style: {},
    classes: {
        base: "dr_creditCard",
        complete: "dr_complete",
        empty: "dr_empty",
        focus: "dr_focus",
        invalid: "dr_error",
        webkitAutofill: "autofill"
    }
    };
    ```

    ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={publicApiKey} locale={locale}>
    <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
        <div>
            <label>CardNumber: <CardNumber options={styleOption}/> </label>
            <label>CardExpiration: <CardExpiration options={styleOption}/> </label>
            <label>CardCvv: <CardCvv options={styleOption}/> </label>
        </div>
    </PaymentContext>
    </DigitalRiverContainer>
    ```

* ## [Amazon Pay Element](#amazonPay)

    ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={publicApiKey} locale={locale}>
        <PaymentContext country={"US"}
                        sessionId={paymentSessionId}
                        returnUrl={location.href}
                        cancelUrl={location.href}>
            <AmazonPay
                onReady={onReady}
                onSuccess={onSuccess}
                onError={onError}
                resultReturnUrl={location.href}
            />
        </PaymentContext>
    </DigitalRiverContainer>
    ```

* ## [Apple Pay Element](#applePay)

  ### Configuration

    ```javascript
	 const paymentRequest: ApplePayPaymentRequest = {
        sessionId: data.session.id,
        country: "US",
        currency: "USD",
        total: {
            label: "Order Total",
            amount: 48
        },
        displayItems: [
            {
                label: "Product 1",
                amount: 10,
            },
            {
                label: "Product 2",
                amount: 15,
            },
            {
                label: "Product 2",
                amount: 15,
            }
        ],
        shippingOptions: [
            {
                id: "overnight-shipping",
                label: "Overnight Shipping",
                amount: 10,
                detail: "Get this in 1 business day."
            },
            {
                id: "default-shipping",
                label: "Default Shipping",
                amount: 2,
                detail: "Get this in 7 business day.",
                selected: true
            },
        ],
        style: {
            buttonType: ApplePayButtonType.Plain,
            buttonColor: ApplePayButtonColor.Dark,
            //buttonLanguage: "en"
        },
        requestShipping: true,
        waitOnClick: true,
    };
    ```

    ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={publicApiKey} locale={locale}>
        <ApplePay
            paymentRequest={paymentRequest}
            onClick={onClick}
            onReady={onReady}
            onCancel={onCancel}
            onShippingAddressChange={onShippingAddressChange}
            onShippingOptionChange={onShippingOptionChange}
            onSuccess={onSuccess}
            onError={onError}
        />
    </DigitalRiverContainer>
    ```


* ## [Google Pay Element](#googlePay)

    ### Configuration
    
    ```javascript
     const paymentRequest: GooglePayPaymentRequest = {
        sessionId: data.session.id,
        country: "US",
        currency: "USD",
        total: {
            label: "Order Total",
            amount: 48
        },
        displayItems: [
            {
                label: "Product 1",
                amount: 10,
            },
            {
                label: "Product 2",
                amount: 15,
            },
            {
                label: "Product 2",
                amount: 15,
            }
        ],
        shippingOptions: [
            {
                id: "overnight-shipping",
                label: "Overnight Shipping",
                amount: 10,
                detail: "Get this in 1 business day."
            },
            {
                id: "default-shipping",
                label: "Default Shipping",
                amount: 2,
                detail: "Get this in 7 business day.",
                selected: true
            },
        ],
        style: {
            buttonType: GooglePayButtonType.Plain,
            buttonColor: GooglePayButtonColor.Dark,
            //buttonLanguage: "en"
        },
        requestShipping: true,
        waitOnClick: true,
    };
    ```
    
    ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <GooglePay
            paymentRequest={paymentRequest}
            onClick={onClick}
            onReady={onReady}
            onCancel={onCancel}
            onShippingAddressChange={onShippingAddressChange}
            onShippingOptionChange={onShippingOptionChange}
            onSuccess={onSuccess}
            onError={onError}
        />
    </DigitalRiverContainer>
    ```

* ## [PayPal Element](#payPal)

  ### Configuration

    ```javascript
    const paymentRequest: PayPalPaymentRequest = {
        style: {
            label: 'checkout',
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
            layout: 'horizontal',
            fundingicons: 'false',
            tagline: 'false'
        },
        sourceData: {
            type: "payPal",
            sessionId: data.session.id,
            payPal: {
                returnUrl: location.href,
                cancelUrl: location.href
            }
        }
    };
    ```

  ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <PayPal
            paymentRequest={paymentRequest}
            onClick={onClick}
            onReady={onReady}
            onCancel={onCancel}
            onSuccess={onSuccess}
            onError={onError}
        />
    </DigitalRiverContainer>
    ```

* ## [iDEAL Element](#ideal)

  ### Configuration

    ```javascript
     const idealOptions: IDEALElementOptions = {
        ideal: {
            sessionId: data.session.id
        }
    };
    ```
  ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <PaymentContext billingAddress={billingAddress} sessionId={idealOptions?.ideal.sessionId} >
            <IDEAL idealOptions={idealOptions} onChange={onChange} onReady={onReady}/>
        </PaymentContext>
    </DigitalRiverContainer>
    ```

* ## [Konbini Element](#konbini)

  ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <PaymentContext billingAddress={billingAddress} sessionId={sessionId} >
            <Konbini konbiniOptions={konbiniOptions} onChange={onChange} onReady={onReady} onFocus={onFocus} onBlur={onBlur}/>
        </PaymentContext>
    </DigitalRiverContainer>
    ```

* ## [Online Banking (IBP) Element](#onlineBanking)

  ### Configuration

    ```javascript
    const onlineBankingOptions: OnlineBankingOptions = {
        onlineBanking: {
            currency: "USD",
            country: "US"
        }
    };
    ```

  ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <PaymentContext billingAddress={billingAddress} sessionId={sessionId} >
            <OnlineBanking onlineBankingOptions={onlineBankingOptions} onChange={onChange} onReady={onReady} onFocus={onFocus} onBlur={onBlur}/>
        </PaymentContext>
    </DigitalRiverContainer>
    ```

* ## [Offline Refund Element](#offlineRefund)

  ### Configuration

    ```javascript
    const offlineRefundOptions: OfflineRefundOptions = {
        refundToken: "fb19fceb-a5e7-454d-af1a-017b7bd73d5b"
    };
    ```

  ### React component
    ```javascript
    <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
        <OfflineRefund offlineRefundOptions={offlineRefundOptions} onChange={onChange} onReady={onReady}/>
    </DigitalRiverContainer>
    ```