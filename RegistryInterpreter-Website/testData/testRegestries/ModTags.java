package testRegistries;

import net.bananashelp20.forgermod.ForgerMod;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.tags.BlockTags;
import net.minecraft.tags.ItemTags;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;

public class ModTags {
    public static class Blocks {
        private static TagKey<Block> createTag(String name) {
            return BlockTags.create(ResourceLocation.fromNamespaceAndPath(ForgerMod.MOD_ID, name));
        }

        //!GENERATE MOD_TAGS
        public static final TagKey<Block> NEEDS_SCRAP_IRON_TOOL = createTag("needs_scrap_iron_tool");
        public static final TagKey<Block> INCORRECT_FOR_SCRAP_IRON_TOOL = createTag("incorrect_for_scrap_iron_tool");

        public static final TagKey<Block> NEEDS_SCRAP_TOOL = createTag("needs_scrap_tool");
        public static final TagKey<Block> INCORRECT_FOR_SCRAP_TOOL = createTag("incorrect_for_scrap_tool");

        public static final TagKey<Block> NEEDS_REINFORCED_IRON_TOOL = createTag("needs_reinforced_iron_tool");
        public static final TagKey<Block> INCORRECT_FOR_REINFORCED_IRON_TOOL = createTag("incorrect_for_reinforced_iron_tool");

        public static final TagKey<Block> NEEDS_DAMASK_TOOL = createTag("needs_damask_tool");
        public static final TagKey<Block> INCORRECT_FOR_DAMASK_TOOL = createTag("incorrect_for_damask_tool");

        public static final TagKey<Block> NEEDS_DEVELOPIUM_TOOL = createTag("needs_developium_tool");
        public static final TagKey<Block> INCORRECT_FOR_DEVELOPIUM_TOOL = createTag("incorrect_for_developium_tool");

        public static final TagKey<Block> NEEDS_STEEL_TOOL = createTag("needs_steel_tool");
        public static final TagKey<Block> INCORRECT_FOR_STEEL_TOOL = createTag("incorrect_for_steel_tool");

        public static final TagKey<Block> NEEDS_CARBON_STEEL_TOOL = createTag("needs_carbon_steel_tool");
        public static final TagKey<Block> INCORRECT_FOR_CARBON_STEEL_TOOL = createTag("incorrect_for_carbon_steel_tool");

        public static final TagKey<Block> NEEDS_INANISIUM_TOOL = createTag("needs_inanisium_tool");
        public static final TagKey<Block> INCORRECT_FOR_INANISIUM_TOOL = createTag("incorrect_for_inanisium_tool");

        public static final TagKey<Block> NEEDS_IGNISIUM_TOOL = createTag("needs_ignisium_tool");
        public static final TagKey<Block> INCORRECT_FOR_IGNISIUM_TOOL = createTag("incorrect_for_ignisium_tool");

        public static final TagKey<Block> NEEDS_SOMNIUM_TOOL = createTag("needs_somnium_tool");
        public static final TagKey<Block> INCORRECT_FOR_SOMNIUM_TOOL = createTag("incorrect_for_somnium_tool");

        public static final TagKey<Block> NEEDS_MORSIUM_TOOL = createTag("needs_morsium_tool");
        public static final TagKey<Block> INCORRECT_FOR_MORSIUM_TOOL = createTag("incorrect_for_morsium_tool");

        public static final TagKey<Block> NEEDS_VULNUSIUM_TOOL = createTag("needs_vulnusium_tool");
        public static final TagKey<Block> INCORRECT_FOR_VULNUSIUM_TOOL = createTag("incorrect_for_vulnusium_tool");

        public static final TagKey<Block> NEEDS_PULSITE_TOOL = createTag("needs_pulsite_tool");
        public static final TagKey<Block> INCORRECT_FOR_PULSITE_TOOL = createTag("incorrect_for_pulsite_tool");

        public static final TagKey<Block> NEEDS_ELECTRIUM_TOOL = createTag("needs_electrium_tool");
        public static final TagKey<Block> INCORRECT_FOR_ELECTRIUM_TOOL = createTag("incorrect_for_electrium_tool");

        public static final TagKey<Block> NEEDS_LUSH_TOOL = createTag("needs_lush_tool");
        public static final TagKey<Block> INCORRECT_FOR_LUSH_TOOL = createTag("incorrect_for_lush_tool");

        public static final TagKey<Block> NEEDS_TAIFUNITE_TOOL = createTag("needs_taifunite_tool");
        public static final TagKey<Block> INCORRECT_FOR_TAIFUNITE_TOOL = createTag("incorrect_for_taifunite_tool");

    }
    public static class Items {
        private static TagKey<Item> createTag(String name) {
            return ItemTags.create(ResourceLocation.fromNamespaceAndPath(ForgerMod.MOD_ID, name));
        }
        //!GENERATE MOD_ITEM_TAGS
    }
}