import { LitElement, html, css } from 'lit-element';

export const InputType = {
    TEXT: 'text',
    PASSWORD: 'password',
    PHONE: 'phone',
    ALPHA: 'alpha',
    NUM: 'num'
};

export const InputKeys = {
    BACKSPACE: 'Backspace',
    SHIFT: 'Shift',
    ENTER: 'enter',
    ALT: 'Alt',
    CTRL: 'Control',
    DELETE: 'Delete'
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
        this.max = -1;
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
        console.log(e.key);
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
                this.format(e.key); 
                break;
            case InputType.ALPHA:
                this.isValid = this.isWord(e.key) || this.isNumber(e.key);
                break; 
            case InputType.PASSWORD:
            default:
               console.log('default'); 
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
        return regex.test(input);
    }

    format(input) {
        if(!(input == InputKeys.BACKSPACE) && 
             (this.value.length == 3 ||
              this.value.length == 6 ) ){ 
            this.value = this.value + "-";
        }
        if(input == InputKeys.BACKSPACE && this.value.length == 4) {  
            this.value = this.value.substr(0, this.value.length-2);
        }    
        
    }
}
customElements.define('nd-input', NdInput);
