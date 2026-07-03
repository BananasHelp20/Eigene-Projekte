package testRegistries;

import net.minecraft.world.item.Tier;
import net.minecraft.world.item.crafting.Ingredient;
import net.neoforged.neoforge.common.SimpleTier;


public class ModToolTiers {
    //!GENERATE

    public static final Tier SCRAP_IRON = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_SCRAP_IRON_TOOL,
            350, 6.5f, 3, 12,
            () -> Ingredient.of(ModItems.SCRAP_IRON_INGOT.get())
    );
    public static final Tier SCRAP = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_SCRAP_TOOL,
            350, 6.5f, 3, 12,
            () -> Ingredient.of(ModItems.SCRAP_INGOT.get())
    );
    public static final Tier REINFORCED_IRON = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_REINFORCED_IRON_TOOL,
            500, 7f, 4, 12,
            () -> Ingredient.of(ModItems.REINFORCED_IRON_INGOT.get())
    );
    public static final Tier DAMASK = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_DAMASK_TOOL,
            1200, 8.5f, 5, 14,
            () -> Ingredient.of(ModItems.DAMASK_INGOT.get())
    );
    public static final Tier DEVELOPIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_DEVELOPIUM_TOOL,
            1750, 9f, 6, 16,
            () -> Ingredient.of(ModItems.DEVELOPIUM_INGOT.get())
    );
    public static final Tier STEEL = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_STEEL_TOOL,
            1750, 9f, 6, 16,
            () -> Ingredient.of(ModItems.STEEL_INGOT.get())
    );
    public static final Tier CARBON_STEEL = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_CARBON_STEEL_TOOL,
            2500, 11f, 7, 18,
            () -> Ingredient.of(ModItems.CARBON_STEEL_INGOT.get())
    );
    public static final Tier INANISIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_INANISIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.INANISIUM_INGOT.get())
    );
    public static final Tier IGNISIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_IGNISIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.IGNISIUM_INGOT.get())
    );
    public static final Tier SOMNIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_SOMNIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.SOMNIUM_INGOT.get())
    );
    public static final Tier MORSIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_MORSIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.MORSIUM_INGOT.get())
    );
    public static final Tier VULNUSIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_VULNUSIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.VULNUSIUM_INGOT.get())
    );
    public static final Tier PULSITE = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_PULSITE_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.PULSITE_INGOT.get())
    );
    public static final Tier ELECTRIUM = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_ELECTRIUM_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.ELECTRIUM_INGOT.get())
    );
    public static final Tier LUSH = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_LUSH_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.LUSH_INGOT.get())
    );
    public static final Tier TAIFUNITE = new SimpleTier(
            ModTags.Blocks.INCORRECT_FOR_TAIFUNITE_TOOL,
            3500, 14f, 9, 20,
            () -> Ingredient.of(ModItems.TAIFUNITE_INGOT.get())
    );
}