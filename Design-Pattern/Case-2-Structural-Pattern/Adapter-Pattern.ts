// 1. The Target Interface (What the new system expects)
interface USBCPort {
    connectUSBC(): void;
    readData(): void;
}

// 2. The Adaptee (The old incompatible system)
class OldSDCard {
    public insertIntoSDSlot(): void {
        console.log("SD Card inserted into SD Slot.");
    }

    public copyPhotos(): void {
        console.log("Copying photos from SD Card...");
    }
}

// 3. The Adapter (Makes the old system work with the new one)
class SDCardToUSBCAdapter implements USBCPort {
    private oldCard: OldSDCard;

    constructor(oldCard: OldSDCard) {
        this.oldCard = oldCard;
    }

    public connectUSBC(): void {
        console.log("Adapter plugged into USB-C port.");
        this.oldCard.insertIntoSDSlot(); // Translating the connection
    }

    public readData(): void {
        console.log("Adapter translating signals...");
        this.oldCard.copyPhotos();
    }
}

// --- CLIENT CODE ---
console.log("\n--- CASE 2: ADAPTER PATTERN ---");

// The new laptop only knows how to use USBCPort
function laptopReadData(device: USBCPort) {
    device.connectUSBC();
    device.readData();
}

const myOldSDCard = new OldSDCard();
const adapter = new SDCardToUSBCAdapter(myOldSDCard);

console.log("User trying to read old SD Card on new Laptop:");
laptopReadData(adapter);