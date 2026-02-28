
export default class Location {
    latitude: number;
    longitude: number;
    isScrambled: boolean;

    constructor(latitude: number, longitude: number, isScrambled: boolean = false) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.isScrambled = isScrambled;
    }

    // Method to scramble the location by adding random noise to latitude and longitude
    scramble() {
        
        if (!this.isScrambled) {
            const noise = 0.01; // Adjust this value to increase/decrease scrambling
            fileRandomFraction().then(randomValue => {
                this.latitude += randomValue * noise;
                fileRandomFraction().then(randomValue => {
                    this.longitude += randomValue * noise;
                    this.isScrambled = true;
                    console.log(`Location successfully scrambled to: (${this.latitude}, ${this.longitude})`);
                }).catch(err => {
                    console.error('Error scrambling longitude:', err);
                });
            }).catch(err => {
                console.error('Error scrambling latitude:', err);
            });
        }
    }
    // Method to descramble the location by resetting it to the original coordinates
    descramble(CurrentLocation: Location) {
        if (this.isScrambled) {
            this.latitude = CurrentLocation.latitude;
            this.longitude = CurrentLocation.longitude;
            this.isScrambled = false;
        }
    }

    
}

import fs from 'fs';
import path from 'path';

/**
 * Read a single byte from the RandomNumbers file at the given position.
 *
 * @param position - zero-based offset within the file
 * @returns the numeric value of the byte (0–255)
 *
 * Usage example:
 *   const b = await filerandom(42);
 *   console.log('byte at 42', b);
 */
export async function filerandom(position: number): Promise<number> {
    // build absolute path to the RandomNumbers file stored in the app folder
    const filePath = "./RandomNumbers"; // Adjust this path if your file is located elsewhere

    // ensure file exists
    await fs.promises.access(filePath, fs.constants.R_OK);

    // open file descriptor for reading
    const fd = await fs.promises.open(filePath, 'r');
    try {
        const buffer = Buffer.alloc(1);
        // read a single byte at the requested offset
        await fd.read(buffer, 0, 1, position);
        return buffer[0];
    } finally {
        await fd.close();
    }
}

async function fileRandomFraction() {
    Math.random(); // Warm up the random number generator
    return filerandom(0).then(byte => (byte / 255 - 0.5));
}



filerandom(0).then(byte => {
    console.log('First byte of RandomNumbers:', byte);
}).catch(err => {
    console.error('Error reading RandomNumbers:', err);
});

let location = new Location(37.7749, -122.4194); // Example coordinates (San Francisco)
console.log('Original location:', location);
location.scramble();