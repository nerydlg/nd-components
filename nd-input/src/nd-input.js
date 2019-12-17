import { LitElement, html, css } from 'lit-element';


const InputType = {
    TEXT: 'text',
    PASSWORD: 'password',
    PHONE: 'phone',
    NUM: 'num'
};

const NdInputConstant = {
    ACCEPT_ALL_REGEX: '.',
    MAX_LENGTH: -1
    
}

class NdInput extends LitElement {

    static get properties(){
        return {
            label: { type: String },
            value: { type: String, observe: true },
            type: { type: String, reflect: true },
            isValid: { type: Boolean, reflect: true },
            max: { type: Number, reflect: true },
            regex: { type: String}
        };
    }

    constructor() {
        super();
        this.label = '';
        this.type = InputType.TEXT;
        this.isValid = false;
        this.value = '';
        this.regex = NdInputConstant.ACCEPT_ALL_REGEX;
        this.max = NdInputConstant.MAX_LENGTH;
    }

    firstUpdated(changedProperties) {
        
    }

    render() {
        return html`
            <div class="inputContainer">
                <div class="label"><label>${this.label}:</label></div>
                <div class="inputElement">
                    <input type="${this.type}" value="${this.value}" class="nd-input nd-${this.type}"
                            @keydown="${this.validateInput}" maxlength="${this.max}"/>
                </div>
            </div>
        `;
    }

    validateInput(e) {
        if(this.isNotValidInput(e)){
            e.preventDefault();
        }
    }

    isNotValidInput(e) {
        
        switch(this.type) {
            case InputType.TEXT:
                this.isValid = this.isWord(e.key);
                break;
            case InputType.PHONE:
                this.isValid = this.isNumber(e.key);
                break;
            case InputType.PASSWORD:
            default:
               this.isValid = true; 
        }
        return !this.isValid;
    }


    isNumber(input) {
        return this.inputMatchesRegex(input, /\d/) || this.isSpecialKey(input);
    }

    isWord(input) {
        return this.inputMatchesRegex(input, /\w/);
    }

    inputMatchesRegex(input, regex) {
        return regex.test(input);
    }

    isSpecialKey(input) {
        return input.length > 1;
    }
}
customElements.define('nd-input', NdInput);
