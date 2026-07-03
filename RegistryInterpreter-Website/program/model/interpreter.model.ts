export interface Block {
    name: string;
    creationMethod?: string;
    properties: { 
        destroyTime: number; 
        explosionResistance: number; 
        soundType: string 
    } | "!INDESTRUCTIBLE";
    dropMethod: string;
    dropsOtherItem?: Item;
    modelMethod?: string;
    breakingTool?: string;
    breakingMaterial?: string;
    creativeTab?: CreativeTab;
    parsedName: Languages;
}

export interface Ore {
    blocks: [OreBlock];
    defaultName: string;
}

export interface OreBlock {
    baseBlock: Block;
    generatesInDimension: string;
    generationStep: {
        //Biome modifier
        stepType: "Decoration" | "Carving";
        step: string;
    };
    generationalRuleTest: {
        replaceablesVariableName: string;
        matchTestType: "TagMatchTest" | "BlockMatchTest";
        replacingBlock?: string;
        replacingBlockTag?: string;
    };
    oreSize: number;
    placement: {
        spawnShape: string;
        lowerBoundry: {
            anchor: string;
            spawnType: string;
            height: number;
        };
        upperBoundry: {
            anchor: string;
            spawnType: string;
            height: number;
        };
    };
}

export interface CreativeTab {
    name: string; //this_should_look_like_this
    displayItem: Item;
    parsedName: Languages;
}

export interface Item {
    parsedName?: Languages;
    isWeapon: boolean;
    name: string;
    modelMethod: string;
    creativeTab?: string;
    enchantments?: [string];
    rarity?: string;
    createMethod?: string;
    description?: string;
    durabilityMaxDamage?: number;
    setNoRepair?: boolean;
    maxStackSize?: number;
    fireResistant: boolean;
}

export interface Weapon {
    weaponProperties: {
              tier: string;
              damage: number;
              speed: number;
          }
        | "!ULTRA";
    material?: string;
    baseItem: Item;
}

export interface UpgradeableWeapon {
    baseWeapon: Weapon;
    weaponClass: string;
    weaponClassCode?: string; //wenn Klasse noch ned existiert, und da nutzer des dann auf da Website programmiert ka
    variations: [
        {
            variation: string;
            overrideLanguages: Languages;
        },
    ];
}

export interface ToolTier {
    type: "normal";
    ingredient: Item;
    materialName: string;
    properties: {
        defaultUses: number;
        defaultSpeed: number;
        attackDamageBonus: number;
        enchantmentValue: number;
    };
}

export interface CraftingRecipe {
    asRecipe: SmeltingRecipe | ShapedRecipe | ConversionRecipe | ShapelessRecipe | CustomRecipe;
}

interface SmeltingRecipe {
    createSmeltingRecipe: boolean;
    createBlastingRecipe: boolean;
    category: string;
    outputItem: Item;
    properties: {
        smeltingProperties?: {
            listName: string | null;
            experience: number;
            cookingTime: number;
        };
        blastingProperties?: {
            listName: string | null;
            experience: number;
            cookingTime: number;
        };
    };
    possibleInputItems: [Item];
}

interface ShapelessRecipe {
    category: string;
    unlockedByItem: Item;
    amount: number;
    neededItems: [string];
    outputItem: Item;
}

interface ShapedRecipe {
    category: string;
    pattern: [[string], [string], [string]];
    amount: number;
    meanings: [
        {
            item: Item;
            patternLetter: string;
        },
    ];
    unlockedByItem: Item;
    outputItem: Item;
}

interface ConversionRecipe {
    category: string;
    first: {
        outputAmountWhenCrafted?: number;
        item: Item;
    };
    second: {
        outputAmountWhenCrafted?: number;
        item: Item;
    };
    conversionMethod: "1 <-> 2" | "1 <- 2" | "1 -> 2";
}

interface CustomRecipe {
    craftingClass: string;
    craftingClassCode?: string;
    possibleOutputItems: [Item];
    possibleInputItems: [Item];
}

export interface Languages {
    english: string;
    german?: string;
    austrian?: string;
}

//io
export interface File {
    name: string; //filename with extention
    content: string[]; //lines of file
    path: string; //filePath
}

export interface Directory {
    files: File[]; //files in Directory
    directories: Directory[] //directories in directory
    name: string; //dirname
    path: string; //dirpath
}