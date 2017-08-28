export class Settings {
    public saveLocation: string;
    public imageType: string;

    constructor(saveLocation: string, imageType: string){
        this.saveLocation = saveLocation;
        this.imageType = imageType;
    }
}