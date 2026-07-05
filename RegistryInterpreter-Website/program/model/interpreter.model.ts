export interface Block {
    name: string;
    creationMethod?: string;
    properties: {
        destroyTime?: number;
        explosionResistance?: number;
        soundType?: string;
        description?: string;
        friction?: number;
        ignitedByLava: boolean;
        instaBreak: boolean;
        jumpFactor?: number;
        speedFactor?: number;
        requiresCorrectTool: boolean;
        indestructable: boolean;
    };
    dropsAnything?: {
        dropMethod: string;
        dropsItem: Item | Block;
        dropsNonModItem: boolean;
        dropsItemAsItem: boolean; //item or block
        dropsOtherItem?: Item | Block;
        dropsOtherNonModItem: boolean;
        dropsOtherItemAsItem?: boolean; //item or block
    };
    modelMethod?: string;
    breakingTools?: string[];
    breakingMaterial?: string;
    creativeTab?: CreativeTab;
    parsedName: Languages;
    camelName: string;
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
        lowerBound: {
            anchor: string;
            spawnType: string;
            height: number;
        };
        upperBound: {
            anchor: string;
            spawnType: string;
            height: number;
        };
    };
}

export interface CreativeTab {
    name: string; //this_should_look_like_this
    displayItem: Item | Block;
    displayItemIsItem: boolean;
    parsedName: Languages;
    camelName: string; //thisShouldLookLikeThis
}

export interface Item {
    isWeapon: boolean;
    isUpgradeable: boolean;
    creativeTab?: CreativeTab;
    parsedName?: Languages; //Parsed Name | Übersetzter Name | ...
    name: string; //not_camel_name
    camelName: string; //CamelName
    modelMethod: string;
    enchantments?: [string];
    rarity?: string;
    createMethod?: string;
    description?: string;
    durabilityMaxDamage?: number;
    setNoRepair?: boolean;
    maxStackSize?: number;
    fireResistant: boolean;
    weaponItem?: Weapon;
}

interface Weapon {
    weaponProperties: {
              tier: string;
              damage: number;
              speed: number;
          }
        | "!ULTRA";
    material?: string;
    weaponFamily?: string;
    upgradeableWeapon?: UpgradeableWeapon;
}

interface UpgradeableWeapon {
    weaponClass: string;
    weaponClassCode?: string; //wenn Klasse noch ned existiert, und da nutzer des dann auf da Website programmiert ka
    variations: [
        {
            variation: string; // z.B. Ruby
            overrideName?: Languages; //z.B. Ruby-Enforced Sword
            overrideDescriptions?: [{descriptionkey: string, sentence: Languages}]; //description changes
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
    type: "smelting" | "shaped" | "conversion" | "shapeless" | "custom"
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

//classes
export interface BlockClass {
    name: `${string}.java`;
    voxalShapes?: [
        {
            name: string;
            x1: number;
            y1: number;
            z1: number;
            x2: number;
            y2: number;
            z2: number;
        },
    ];
    voxalShapeGetter?: string;
    ignoresPlayerFacing: boolean; //yes -> ignores player face, no -> looks at facesPlayerWhenPlaced for placement face
    facesPlayerWhenPlaced?: boolean; //yes -> faces player, no -> faces opposite
    stateForPlacementGetter?: string;
    isBlockEntity: boolean;
    blockEntityClass: {
        isCraftingEntity: boolean;
        hasMenu: boolean;
        MenuClass?: {
            name: `${string}.java`;
        };
        MenuEntryInModClass?: string;
        ScreenClass?: {
            name: `${string}.java`;
        };
    };
}

export interface ItemClass {
    name: `${string}.java`;
    constructor: string;
    postHurtEffectMethod?: string;
    postHurtEffectVariables?: string[];
    variationVariable?: string;
    rarityVariable?: string;
    descriptionMethod?: string;
}

//composed
export interface ComposedTab {
    baseTab: CreativeTab;
    supplierConstant: string;
    tabRegister: string;
    getDisplayItemMethod: string;
}

export interface ComposedBlock {
    baseBlock: Block;
    tags: string[];
    customClass?: BlockClass;
    customClassName?: string;
    deferredBlockConstant: string;
    loottableEntry: string;
    blockStateEntry: string;
    tagEntry: string;
    tabEntry: string;
}

export interface ComposedItem {
    baseItem: Item;
    customClass?: ItemClass;
    customClassName?: string;
    deferredItemConstant: string;
    itemModelEntry: string;
    tags: string[]
    tagEntry: string;
    tabEntry: string;
}

export interface ComposedRecipe {
    baseRecipe: CraftingRecipe
    recipeEntry?: string; //normal Recipes
    recipeEntryClass?: `${string}.java`; //item class for recipes
    recipeInputEntry?: string; //recipes in custom blocks
    recipeOutputEntry?: string; //recipes in custom blocks
}

export interface ComposedOre {
    baseOre: Ore;
    biomeModifierConstants: string;
    modifierBootstrapRegisterCalls: string;
    configuredFeatureConstants: string;
    ruleTests: string;
    oreConfigurationLists?: string;
    configurationBootstrapRegisterCalls: string;
    placedFeatureConstants: string;
    placedFeatureBootstrapRegisterCalls: string;
}

export interface ComposedToolTier {
    baseToolTier: ToolTier;
    toolTierMaterialConstant: string;
    modTagConstants: string;
    modItemTagRegistry?: string;
    modBlockTagRegistry?: string;
}