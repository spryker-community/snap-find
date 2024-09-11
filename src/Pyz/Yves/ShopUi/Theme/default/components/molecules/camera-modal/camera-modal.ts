import Component from "ShopUi/models/component";

export default class CameraModal extends Component {
    protected button;
    protected canvas;
    protected video;
    protected formInput;

    protected readyCallback(): void {}

    protected init(): void {
        this.button = <HTMLElement>document.getElementById('captureBtn');
        this.canvas = <HTMLElement>document.getElementById('canvas');
        this.video = <HTMLElement>document.getElementById('camera');
        this.formInput = <HTMLElement>document.getElementById('image_upload_form_image');

        this.mapEvents();
        this.startCamera();
    }

    protected mapEvents(): void {
        this.button.addEventListener('click', (event: Event) => this.captureImage(event));
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
                console.log(result.url);
                window.location.href = result.url;
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }, 'image/jpeg'); // Specify the image format (JPEG)
    }

    async startCamera() {
        console.log(navigator);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            this.video.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    }
}

