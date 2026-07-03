package testRegistries;

import net.minecraft.core.Holder;
import net.minecraft.core.HolderLookup;
import net.minecraft.core.registries.Registries;
import net.minecraft.data.loot.BlockLootSubProvider;
import net.minecraft.world.flag.FeatureFlags;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.enchantment.Enchantment;
import net.minecraft.world.item.enchantment.Enchantments;
import net.minecraft.world.level.ItemLike;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.storage.loot.LootTable;
import net.minecraft.world.level.storage.loot.entries.LootItem;
import net.minecraft.world.level.storage.loot.entries.LootPoolEntryContainer;
import net.minecraft.world.level.storage.loot.functions.ApplyBonusCount;
import net.minecraft.world.level.storage.loot.functions.SetItemCountFunction;
import net.minecraft.world.level.storage.loot.providers.number.UniformGenerator;

import java.util.Set;

public class ModBlockLootTableProvider extends BlockLootSubProvider {
    protected ModBlockLootTableProvider(HolderLookup.Provider pRegistries) {
        super(Set.of(), FeatureFlags.REGISTRY.allFlags(), pRegistries);
    }

    public static void dropSelf(ItemLike block) {
        dropSelf(block);
    }

    public static void dropOther(ItemLike block, ItemLike itemDrop) {
        dropOther(block, itemDrop);
    }

    protected LootTable.Builder createMultipleOreDrops(Block pBlock, Item item, float minDrops, float maxDrops) {
        HolderLookup.RegistryLookup<Enchantment> registrylookup = this.registries.lookupOrThrow(Registries.ENCHANTMENT);
        return this.createSilkTouchDispatchTable(pBlock,
                (LootPoolEntryContainer.Builder<?>)this.applyExplosionDecay(pBlock,
                        LootItem.lootTableItem(item)
                                .apply(SetItemCountFunction.setCount(UniformGenerator.between(minDrops, maxDrops)))
                                .apply(ApplyBonusCount.addOreBonusCount(registrylookup.getOrThrow(Enchantments.FORTUNE)))
                )
        );
    }

    @Override
    protected Iterable<Block> getKnownBlocks() {
        return ModBlocks.BLOCKS.getEntries().stream().map(Holder::value)::iterator;
    }

    @Override
    protected void generate() {
        //!GENERATE DROPS
        dropSelf(ModBlocks.DAMASK_BLOCK.get());
        dropSelf(ModBlocks.PULSITE_BLOCK.get());
        dropSelf(ModBlocks.SCRAP_BLOCK.get());
        dropSelf(ModBlocks.INANISIUM_BLOCK.get());
        dropSelf(ModBlocks.IGNISIUM_BLOCK.get());
        dropSelf(ModBlocks.REINFORCED_IRON_BLOCK.get());
        dropSelf(ModBlocks.SCRAP_IRON_BLOCK.get());
        dropSelf(ModBlocks.OVERGROWN_BLOCK.get());
        dropSelf(ModBlocks.MORSIUM_BLOCK.get());
        dropSelf(ModBlocks.SOMNIUM_BLOCK.get());
        dropSelf(ModBlocks.VULNUSIUM_BLOCK.get());
        dropSelf(ModBlocks.CARBON_STEEL_BLOCK.get());
        dropSelf(ModBlocks.STEEL_BLOCK.get());
        dropSelf(ModBlocks.ELECTRIUM_BLOCK.get());
        dropSelf(ModBlocks.TAIFUNITE_BLOCK.get());
        dropOther(ModBlocks.JADE_END_ORE.get(), ModItems.JADE_GEMSTONE.get());
        dropOther(ModBlocks.JADE_NETHER_ORE.get(), ModItems.JADE_GEMSTONE.get());
        dropOther(ModBlocks.JADE_STONE_ORE.get(), ModItems.JADE_GEMSTONE.get());
        dropOther(ModBlocks.JADE_DEEPSLATE_ORE.get(), ModItems.JADE_GEMSTONE.get());
        dropOther(ModBlocks.JADE_OBSIDIAN_ORE.get(), ModItems.JADE_GEMSTONE.get());
        dropOther(ModBlocks.RUBY_END_ORE.get(), ModItems.RUBY_GEMSTONE.get());
        dropOther(ModBlocks.RUBY_NETHER_ORE.get(), ModItems.RUBY_GEMSTONE.get());
        dropOther(ModBlocks.RUBY_STONE_ORE.get(), ModItems.RUBY_GEMSTONE.get());
        dropOther(ModBlocks.RUBY_DEEPSLATE_ORE.get(), ModItems.RUBY_GEMSTONE.get());
        dropOther(ModBlocks.RUBY_OBSIDIAN_ORE.get(), ModItems.RUBY_GEMSTONE.get());
        dropOther(ModBlocks.AMETHYST_END_ORE.get(), ModItems.AMETHYST_GEMSTONE.get());
        dropOther(ModBlocks.AMETHYST_NETHER_ORE.get(), ModItems.AMETHYST_GEMSTONE.get());
        dropOther(ModBlocks.AMETHYST_STONE_ORE.get(), ModItems.AMETHYST_GEMSTONE.get());
        dropOther(ModBlocks.AMETHYST_DEEPSLATE_ORE.get(), ModItems.AMETHYST_GEMSTONE.get());
        dropOther(ModBlocks.AMETHYST_OBSIDIAN_ORE.get(), ModItems.AMETHYST_GEMSTONE.get());
        dropOther(ModBlocks.AMBER_END_ORE.get(), ModItems.AMBER_GEMSTONE.get());
        dropOther(ModBlocks.AMBER_NETHER_ORE.get(), ModItems.AMBER_GEMSTONE.get());
        dropOther(ModBlocks.AMBER_STONE_ORE.get(), ModItems.AMBER_GEMSTONE.get());
        dropOther(ModBlocks.AMBER_DEEPSLATE_ORE.get(), ModItems.AMBER_GEMSTONE.get());
        dropOther(ModBlocks.AMBER_OBSIDIAN_ORE.get(), ModItems.AMBER_GEMSTONE.get());
        dropSelf(ModBlocks.DEVELOPIUM_BLOCK.get());
        dropWhenSilkTouch(ModBlocks.ANCIENT_SWORD_STAND.get());
        dropSelf(ModBlocks.FORGE.get());
        dropSelf(ModBlocks.INFUSION_TABLE.get());
    }
}