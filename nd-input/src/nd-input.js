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

    valiateInput(e) {
        // TODO: Add functionality to validate input 
        // depending on the element type.
    }
}
customElements.define('nd-input', NdInput);
