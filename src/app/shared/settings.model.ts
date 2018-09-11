export class Settings {
    saveLocation: string;
    imageType: string;

    constructor(saveLocation: string, imageType){
        this.saveLocation = saveLocation;
        this.imageType = imageType;
    }

    // Returns a clone of the settings object
    clone(): Settings {
        return new Settings(this.saveLocation, this.imageType);
    }
}