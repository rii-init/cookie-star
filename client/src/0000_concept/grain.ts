
const s32 = [
    // (Math.random() * 2**48)[]
] as number[];


// deterministic, seeded pseudo random noise generator:
// Idea: use something like LCG to extend the sequence beyond 128
export class Grain {
    
    public static init(seed: number) {
        if (Grain.seeded.length === 0) {
            Grain.seeded = Grain.applySeed(Grain.seeded, seed);
        }  
    }

    public static noise() {
        if (Grain.index === 128) {
            Grain.index = 0;
        }

        return Grain.seeded[Grain.index++];
    }

    private static index = 0;
    private static publicSeed = s32;
    private static seeded = this.publicSeed.concat();

    private static applySeed(publicSeed: number[], privateSeed: number) { 
        return publicSeed.map( v => v ^ privateSeed  )
                         .map( v => v / 2**48 ) 
    }

    
}