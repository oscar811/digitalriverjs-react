import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, ElementEventArgument} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {IDEAL, IDEALElementOptions, IDEALOnChangeArgument} from "../../src/drjs/components/ideal.tsx";

const elementType = 'ideal';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const IDEALDemo = ({}) => {

    const [idealOptions, setIdealOptions] = React.useState<IDEALElementOptions>();
    useEffect(() => {
        fetch(`/api/payment-session?country=NL&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', data);
            const _idealOptions: IDEALElementOptions = {
                ideal: {
                    sessionId: data.session.id
                }
            };
            setIdealOptions(_idealOptions);
        });
    }, []);

    const onChange = (data: IDEALOnChangeArgument) => {
        console.log('onChange', data);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <IDEAL idealOptions={idealOptions} onChange={onChange} onReady={onReady}/>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <IDEALDemo/>
    </React.StrictMode>
)