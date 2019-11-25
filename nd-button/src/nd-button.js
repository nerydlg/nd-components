import { LitElement, html, css } from 'lit-element';

const DEFAULT = css `#0069d9`;
const SECONDARY = css `#5a6268`;
const CANCEL = css `#c82333`;
const ACCEPT = css `#218838`;


export const ButtonTypes = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    LINK: 'link',
    ACCEPT: 'accept',
    CANCEL: 'cancel',
    SUBMIT: 'submit'
};

class NdButton extends LitElement {

    static get properties() {
        return {
            label: { type: String },
            type: { type: String }
        };    
    }

    constructor() {
       super();
       this.label = '';
       this.type = ButtonTypes.PRIMARY;
    }


    static get styles() {
      
      return css`

        .nd-button {
            position: relative;
            display: block;
            margin: 30px;
            padding: 0;

            overflow: hidden;
            border-width: 0;
            outline: none;

            box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
            transition: background-color .3s;
        }

        .primary {
            background-color: #0059c9;
            color: #fff;
        }

        .primary:hover, primary:focus {
            background-color: #1169d9;
            color: #fff;
        }
        .secondary {
            background-color: #5a6268;
            color: #fff;
        }

        .secondary:hover, secondary:focus {
            background-color: #6b7278;
            color: #fff;
        }

        .cancel {
            background-color: #c92333;
            color: #fff;
        }

        .cancel:hover, cancel:focus {
            background-color: #da3344;
            color: #fff;
        }

        .accept {
            background-color: #218838;
            color: #fff;
        }

        .accept:hover, accept:focus {
            background-color: #329939;
            color: #fff;
        }


        .nd-button:hover, .nd-button:focus {
            backgroud-color: var(--bright-color-btn);
        }

        .nd-button > * {
            position: relative;
        }

        .nd-button span {
            display: block;
            padding: 12px 24px;
        }

        .nd-button:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 0;
            padding-top: 0;
            border-radius: 100%;
            background-color: var(--primary-color);
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .nd-button:active:before {
            width: 120%;
            padding-top: 120%;
            transition: width .2s ease-out, padding-top .2s ease-out;
        }
      `;
    }
    
    render() {
        return html`
            <button class="nd-button ${this.type}" @click="${(e) => console.log('works in component')}"><span>${this.label}</span></button>
        `;
    }

    updated(changedProperties) {
        let click = new Event('click');
        this.dispatchEvent(click);
    }

}

customElements.define('nd-button', NdButton);
