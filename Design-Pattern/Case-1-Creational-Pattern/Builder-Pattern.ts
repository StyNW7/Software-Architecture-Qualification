// 1. The Product: Complex Object
class VacationPackage {
    private hotel: string = "";
    private flight: string = "";
    private tourGuide: boolean = false;
    private insurance: boolean = false;

    public setHotel(hotel: string): void { this.hotel = hotel; }
    public setFlight(flight: string): void { this.flight = flight; }
    public setTourGuide(hasGuide: boolean): void { this.tourGuide = hasGuide; }
    public setInsurance(hasInsurance: boolean): void { this.insurance = hasInsurance; }

    public showDetails(): void {
        console.log(`Vacation Package Details:
        - Hotel: ${this.hotel}
        - Flight: ${this.flight}
        - Tour Guide: ${this.tourGuide ? "Included" : "Not Included"}
        - Insurance: ${this.insurance ? "Included" : "Not Included"}
        `);
    }
}

// 2. The Builder Interface
interface IVacationBuilder {
    reset(): void;
    buildHotel(hotelName: string): void;
    buildFlight(airline: string): void;
    addTourGuide(): void;
    addInsurance(): void;
    getProduct(): VacationPackage;
}

// 3. Concrete Builder
class BaliVacationBuilder implements IVacationBuilder {
    private vacation: VacationPackage;

    constructor() {
        this.vacation = new VacationPackage();
    }

    public reset(): void {
        this.vacation = new VacationPackage();
    }

    public buildHotel(hotelName: string): void {
        this.vacation.setHotel(hotelName);
    }

    public buildFlight(airline: string): void {
        this.vacation.setFlight(airline);
    }

    public addTourGuide(): void {
        this.vacation.setTourGuide(true);
    }

    public addInsurance(): void {
        this.vacation.setInsurance(true);
    }

    public getProduct(): VacationPackage {
        const result = this.vacation;
        this.reset();
        return result;
    }
}

// 4. The Director (Optional, but good practice)
class TravelAgent {
    private builder: IVacationBuilder;

    constructor(builder: IVacationBuilder) {
        this.builder = builder;
    }

    public createLuxuryBaliTrip(): void {
        this.builder.buildFlight("Garuda Indonesia First Class");
        this.builder.buildHotel("The Ritz-Carlton Bali");
        this.builder.addTourGuide();
        this.builder.addInsurance();
    }

    public createBackpackerTrip(): void {
        this.builder.buildFlight("AirAsia Economy");
        this.builder.buildHotel("Kuta Beach Hostel");
    }
}

// --- CLIENT CODE (Paste this at the bottom of your file) ---

console.log("--- CASE 1: BUILDER PATTERN EXECUTION ---");

// 1. Create the Builder
const builder = new BaliVacationBuilder();

// 2. Create the Director (Travel Agent)
const director = new TravelAgent(builder);

// 3. Order a Luxury Trip
console.log("\nCreating Luxury Trip:");
director.createLuxuryBaliTrip();
// Get the result
const luxuryTrip = builder.getProduct();
luxuryTrip.showDetails();

// 4. Order a Backpacker Trip
console.log("\nCreating Backpacker Trip:");
director.createBackpackerTrip();
// Get the result
const backpackerTrip = builder.getProduct();
backpackerTrip.showDetails();