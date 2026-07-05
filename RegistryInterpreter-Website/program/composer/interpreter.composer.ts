import { getWholeDirectory } from "../fileManagement/interpreter.io";
import { Block, ComposedBlock, ComposedItem, ComposedOre, ComposedRecipe, ComposedTab, ComposedToolTier, CraftingRecipe, CreativeTab, File, Item, Ore, ToolTier } from "../model/interpreter.model";
import { PRIMARY_SOURCE_TEMP } from "../repository/interpreter.repository";

export function composeTab(tab: CreativeTab, blocks: Block[], items: Item[]): ComposedTab {
    function getItemAndBlockEntriesForTab(blocks: Block[], items: Item[]) {
        let ret = "";
        
        for (let i = 0; i < items.length; i++) {
            items[i].creativeTab?.name === tab.name ? (ret += `                ModItems.${items[i].name.toUpperCase()}.get(),\n`) : "";
        }

        for (let i = 0; i < blocks.length; i++) {
            blocks[i].creativeTab?.name === tab.name ? (ret += `                ModBlocks.${blocks[i].name.toUpperCase()}.get(),\n`) : "";
        }

        return ret.slice(0, ret.length-2) + "\n";     
    }

    return {
        baseTab: tab,
        supplierConstant: `
            public static final Supplier<CreativeModeTab> ${tab.name.trim().toUpperCase()} = CREATIVE_MODE_TABS.register("${tab.name.trim().toLowerCase()}",\n
                () -> CreativeModeTab.builder()\n
                        .icon(() -> new ItemStack(RegistryClass.getDisplayItemFor${tab.camelName.trim()}()))\n
                        .title(Component.translatable("creativetab.forgermod.${tab.name.trim().toLowerCase()}"))\n
                        .displayItems((itemDisplayParameters, output) -> {\n
                            ItemLike[] tabRegister = RegistryClass.get${tab.camelName.trim()}Register();\n
                            for (int i = 0; i < tabRegister.length; i++) {\n
                                output.accept(tabRegister[i]);\n
                            }\n
                        }).build());\n
        `,
        tabRegister: `
            public static ItemLike[] getIngredientTabRegister() {\n
                return new ItemLike[] {\n
                    ${getItemAndBlockEntriesForTab(blocks, items)}\n
                };\n
            }\n
        `,
        getDisplayItemMethod: `
            public static ItemLike getDisplayItemForForgerItemsTab() {\n
                return Mod${tab.displayItemIsItem ? "Items" : "Blocks"}.${tab.displayItem.name.trim().toUpperCase()}.get();\n
            }\n
        `,
    };
}

export function composeBlock(block: Block): ComposedBlock {
    function parseTags() {
        let tags = [];
        for (let tool of block.breakingTools!) {
            tags.push(`BlockTags.MINEABLE_WITH_${tool.toUpperCase()}`);
        }
        tags.push(`${["DIAMOND", "IRON", "STONE"].includes(block.breakingMaterial!.toUpperCase()) ? "BlockTags" : "ModTags.Blocks"}.NEEDS_${block.breakingMaterial!.toUpperCase()}_TOOL`);
        return tags;
    }

    function getBlockProperties() {
        let properties = "";
        let space = "                        ";

        if (block.properties.indestructable) {
            properties += space + `.strength(1000000f, 1000000)\n`;
        } else {
            properties += space + `.strength(${block.properties.destroyTime!}f, ${block.properties.explosionResistance!})\n`;
        }

        properties += !block.properties.requiresCorrectTool ? "" : space + ".requiresCorrectToolForDrops()\n"; //is so komplex gschrieben, dass des a hinzugefügt wird wenn nix spezifiziert is, oiso ma des property nur braucht wenn mas ned haben will
        if (block.properties.friction) properties += space + `.friction(${block.properties.friction}f)\n`;
        if (block.properties.ignitedByLava) properties += space + `.ignitedByLava()\n`;
        if (block.properties.instaBreak) properties += space + `.instabreak()\n`;
        if (block.properties.jumpFactor) properties += space + `.jumpFactor(${block.properties.jumpFactor}f)\n`;
        if (block.properties.soundType) properties += space + `.sound(SoundType.${block.properties.soundType.toUpperCase()})\n`;
        if (block.properties.speedFactor) properties += space + `.speedFactor(${block.properties.speedFactor}f)\n`;
        return properties;
    }

    return {
        baseBlock: block,
        tags: parseTags(),
        deferredBlockConstant: `
        public static final DeferredBlock<Block> ${block.name.toUpperCase()} = registerBlock(${block.name.toLowerCase()},\n
                () -> new Block(BlockBehaviour.Properties.of()\n
                ${getBlockProperties()}) ${
                    block.properties.description
                        ? `{\n
                    @Override\n
                    public void appendHoverText(ItemStack pStack, Item.TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {\n
                        pTooltipComponents.add(Component.translatable("tooltips.forgermod.${block.name.toLowerCase()}.tooltip"));\n
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);\n
                    }\n
                }\n`
                        : "\n"
                }
        );\n
        `,
        loottableEntry: block.dropsAnything!
            ? `        ${block.dropsAnything!.dropMethod}(${block.dropsAnything!.dropsNonModItem! ? "Mod" : ""}${block.dropsAnything!.dropsItemAsItem! ? "Items" : "Blocks"}.${block.dropsAnything!.dropsItem.name.toUpperCase()}${block.dropsAnything!.dropsNonModItem! ? ".get()" : ""}${
                  block.dropsAnything!.dropMethod! === "dropOther" ? `, ${block.dropsAnything!.dropsOtherNonModItem! ? "Mod" : ""}${block.dropsAnything!.dropsOtherItemAsItem! ? "Items" : "Blocks"}.${block.dropsAnything!.dropsOtherItem!.name.toUpperCase()}${block.dropsAnything!.dropsOtherNonModItem! ? ".get()" : ""}` : ""
              });`
            : "",
        tagEntry: `                .add(ModBlocks.${block.name.toUpperCase()}.get())`,
        blockStateEntry: block.modelMethod ? `        ${block.modelMethod!}(ModBlocks.${block.name.toUpperCase()});` : "",
        tabEntry: `                ModBlocks.${block.name.toUpperCase()}.get(),`,
    };
}

export function composeItem(item: Item): ComposedItem {
    return {
        baseItem: item,
        
    };
}

export function composeRecipe(recipe: CraftingRecipe): ComposedRecipe {
    return {
        baseRecipe: recipe,

    };
}

export function composeOre(ore: Ore): ComposedOre {
    return {
        baseOre: ore,

    };
}

export function composeToolTier(toolTier: ToolTier): ComposedToolTier {
    return {
        baseToolTier: toolTier,

    };
}