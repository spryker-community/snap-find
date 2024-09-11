import Component from "ShopUi/models/component";

export default class SearchForm extends Component {
    protected button;
    protected canvas;
    protected video;

    protected readyCallback(): void {}

    protected init(): void {
        this.button = <HTMLElement>document.getElementById('cameraButton');
        this.canvas = <HTMLElement>document.getElementById('canvas');
        this.video = <HTMLElement>document.getElementById('camera');

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
            // Show the captured image in the img element
            const imageUrl = URL.createObjectURL(blob);
            img.src = imageUrl;

            // Create a FormData object and append the image as a file
            const formData = new FormData();
            formData.append('image', blob, 'captured_image.jpg');

            // Send the image to the server
            try {
                const response = await fetch('http://localhost:4000', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                console.log(result);
                if (result.success) {
                    console.log('Image uploaded successfully:', result.image_url);
                } else {
                    console.error('Upload failed:', result.message);
                }
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
