import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Aggiorna lo stato per indicare che si è verificato un errore
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puoi registrare l'errore, inviarlo a un servizio di registrazione degli errori, ecc.
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Qui puoi definire un componente di fallback o un messaggio di errore
            return <h1>Qualcosa è andato storto.</h1>;
        }

        // Se non ci sono errori, renderizza i componenti figli normalmente
        return this.props.children;
    }
}

export default ErrorBoundary;
