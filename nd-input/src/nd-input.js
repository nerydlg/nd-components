import { LitElement, html, css } from 'lit-element';


const InputType = {
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
            isValid: { type: Boolean },
            max: { type: Number },
            complexType: { type: Object }
        };
    }

    constructor() {
        super();
        this.label = '';
        this.type = InputType.TEXT;
        this.isValid = false;
        this.value = '';
        this.regex = '.';
        this.max = -1;
        this.complexType = {};
    }

    render() {
        return html`
            <div class="inputContainer">
                <div class="label"><label>${this.label}:</label></div>
                <div class="inputElement">
                    <input type="${this.type}" value="${this.value}" class="nd-input" @keydown="${this.validateInput}"
                            maxlength="${this.max}"/>
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
            case InputType.ALPHA:
                this.isValid = this.isWord(e.key) || this.isNumber(e.key);
                break; 
            case InputType.PASSWORD:
            default:
               this.isValid = true; 
        }
        return !this.isValid;
    }


    isNumber(input) {
        return this.inputMatchesRegex(input, /\d/);
    }

    isWord(input) {
        return this.inputMatchesRegex(input, /\w/);
    }

    inputMatchesRegex(input, regex) {
        return regex.test(input) || this.isSpecialKey(input);
    }

    isSpecialKey(input) {
        return input.length > 1;
    }
}
customElements.define('nd-input', NdInput);
