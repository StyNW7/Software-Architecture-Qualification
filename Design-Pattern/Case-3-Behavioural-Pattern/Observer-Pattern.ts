// 1. Observer Interface (The Subscriber)
interface Investor {
    update(coinName: string, price: number): void;
}

// 2. Subject Interface (The Publisher)
interface CryptoMarket {
    subscribe(investor: Investor): void;
    unsubscribe(investor: Investor): void;
    notify(): void;
}

// 3. Concrete Subject
class BitcoinTracker implements CryptoMarket {
    private investors: Investor[] = [];
    private price: number = 0;

    public setPrice(newPrice: number): void {
        console.log(`\n[Market Update] Bitcoin price changed to $${newPrice}`);
        this.price = newPrice;
        this.notify();
    }

    public subscribe(investor: Investor): void {
        this.investors.push(investor);
    }

    public unsubscribe(investor: Investor): void {
        const index = this.investors.indexOf(investor);
        if (index !== -1) {
            this.investors.splice(index, 1);
        }
    }

    public notify(): void {
        for (const investor of this.investors) {
            investor.update("Bitcoin", this.price);
        }
    }
}

// 4. Concrete Observers
class WhaleInvestor implements Investor {
    private name: string;
    constructor(name: string) { this.name = name; }

    update(coinName: string, price: number): void {
        if (price < 30000) {
            console.log(`[${this.name}] Price is cheap! BUYING ${coinName}!`);
        } else {
            console.log(`[${this.name}] Hmmm, watching ${coinName}...`);
        }
    }
}

class PanicSeller implements Investor {
    private name: string;
    constructor(name: string) { this.name = name; }

    update(coinName: string, price: number): void {
        if (price > 40000) {
            console.log(`[${this.name}] Price high! SELLING ALL ${coinName}!`);
        } else {
            console.log(`[${this.name}] Holding...`);
        }
    }
}

// --- CLIENT CODE ---
console.log("\n--- CASE 3: OBSERVER PATTERN ---");

const bitcoinMarket = new BitcoinTracker();
const whale = new WhaleInvestor("Mr. Rich");
const paperHands = new PanicSeller("Scared Guy");

bitcoinMarket.subscribe(whale);
bitcoinMarket.subscribe(paperHands);

// Price movements
bitcoinMarket.setPrice(25000); // Whale buys
bitcoinMarket.setPrice(45000); // PanicSeller sells