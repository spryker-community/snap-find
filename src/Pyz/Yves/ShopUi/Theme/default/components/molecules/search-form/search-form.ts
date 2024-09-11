import Component from "ShopUi/models/component";

export default class SearchForm extends Component {
    protected button;
    protected modal;
    protected cameraButtonMini;

    protected readyCallback(): void {}

    protected init(): void {
        this.button = <HTMLElement>document.getElementById('cameraButton');
        this.modal = <HTMLElement>document.getElementById('modal-1');
        this.cameraButtonMini = <HTMLElement>document.getElementById('cameraButtonMini');

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.button.addEventListener('click', (event: Event) => this.showModal(event));
        this.cameraButtonMini.addEventListener('click', (event: Event) => this.showModal(event));
    }

    protected showModal(event) {
        this.modal.style.display = "block";
    }
}
