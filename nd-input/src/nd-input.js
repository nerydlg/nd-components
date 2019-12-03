import { LitElement, html, css } from 'lit-element';

export const InputType = {
    TEXT: 'text',
    PASSWORD: 'password',
    PHONE: 'phone',
    ALPHA: 'alpha',
    NUM: 'num'
};

class NdInput extends LitElement {
    static get properties(){
        return {
            label: { type: String },
            value: { type: String },
            type: { type: String },
            isValid: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.label = '';
        this.type = InputType.TEXT;
        this.isValid = false;
        this.value = '';
        this.regex = '.';
    }

    render() {
        return html`
            <div class="inputContainer">
                <div class="label"><label>${this.label}:</label></div>
                <div class="inputElement">
                    <input type="${this.type}" value="${this.value}" class="nd-input" @keyup="${this.validateInput}"/>
                </div>
            </div>
        `;
    }

    validateInput(e) {
        // TODO: Add functionality to validate input 
        // depending on the element type.
        let isValid = false;
        switch(this.type) {
            case InputType.TEXT:
                console.log('is text');
                isValid = this.isValidText(e.key);
                break;
            default:
               console.log('default'); 
               isValid = true; 
        }
        console.log(`is valid: ${isValid}`);
        return isValid;
    }

    isValidText(input) {
        return this.isValidInput(input, /\w/);
    }

    isValidInput(input, regex) {
        return regex.test(input);
    }
}
customElements.define('nd-input', NdInput);
