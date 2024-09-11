import Component from "ShopUi/models/component";

export default class CameraModal extends Component {
    protected button;
    protected canvas;
    protected video;
    protected formInput;
    protected modal;
    protected closeButton;

    protected readyCallback(): void {}

    protected init(): void {
        this.button = <HTMLElement>document.getElementById('captureBtn');
        this.canvas = <HTMLElement>document.getElementById('canvas');
        this.video = <HTMLElement>document.getElementById('camera');
        this.formInput = <HTMLElement>document.getElementById('image_upload_form_image');
        this.modal = <HTMLElement>document.getElementById('modal-1');
        this.closeButton = <HTMLElement>document.getElementById('closeBtn');


        this.mapEvents();
    }

    protected mapEvents(): void {
        this.button.addEventListener('click', (event: Event) => this.captureImage(event));
        this.closeButton.addEventListener('click', (event: Event) => this.closeModal());
        window.addEventListener('click', (event: Event) => this.outsideClick(event));


    }


// Close modal
    protected closeModal(){
        this.modal.style.display = 'none';
        this.stopCamera();
    }

// Click outside and close
    protected outsideClick(e){
        console.log(e.target, this.modal);
        if(e.target == this.modal){
            this.modal.style.display = 'none';
            this.stopCamera();
        }
    }


    protected captureImage(event) {
        const context = this.canvas.getContext('2d');

        // Set canvas size to video size
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;

        // Draw the current frame of the video onto the canvas
        context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        // Convert canvas to Blob (binary data)
        this.canvas.toBlob(async function (blob) {

            // Create a FormData object and append the image as a file
            const formData = new FormData();
            formData.append('image_upload_form[image]', blob, 'captured_image.jpg');

            // Send the image to the server
            try {
                const response = await fetch('http://yves.de.spryker.local/snap-find', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response;
                window.location.href = result.url;
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }, 'image/jpeg'); // Specify the image format (JPEG)
    }

    async startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            this.video.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }

    async stopCamera() {
        const videoEl = document.getElementById('camera');
        // now get the steam
        const stream = videoEl.srcObject;
        const tracks = stream.getTracks();
        // now close each track by having forEach loop
        tracks.forEach(function(track) {
            // stopping every track
            track.stop();
        });
        // assign null to srcObject of video
        videoEl.srcObject = null;
    }
}

