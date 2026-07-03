package testRegistries;

import net.bananashelp20.forgermod.ForgerMod;
import net.minecraft.data.PackOutput;
import net.neoforged.neoforge.client.model.generators.BlockStateProvider;
import net.neoforged.neoforge.common.data.ExistingFileHelper;
import net.neoforged.neoforge.registries.DeferredBlock;

public class ModBlockStateProvider extends BlockStateProvider {
    public ModBlockStateProvider(PackOutput output, ExistingFileHelper exFileHelper) {
        super(output, ForgerMod.MOD_ID, exFileHelper);
    }

    public void blockWithItem(DeferredBlock<?> deferredBlock) {
        simpleBlockWithItem(deferredBlock.get(), cubeAll(deferredBlock.get()));
    }

    @Override
    protected void registerStatesAndModels() {
        //!GENERATE MODELS
        blockWithItem(ModBlocks.DAMASK_BLOCK);
        blockWithItem(ModBlocks.PULSITE_BLOCK);
        blockWithItem(ModBlocks.SCRAP_BLOCK);
        blockWithItem(ModBlocks.INANISIUM_BLOCK);
        blockWithItem(ModBlocks.IGNISIUM_BLOCK);
        blockWithItem(ModBlocks.REINFORCED_IRON_BLOCK);
        blockWithItem(ModBlocks.SCRAP_IRON_BLOCK);
        blockWithItem(ModBlocks.OVERGROWN_BLOCK);
        blockWithItem(ModBlocks.MORSIUM_BLOCK);
        blockWithItem(ModBlocks.SOMNIUM_BLOCK);
        blockWithItem(ModBlocks.VULNUSIUM_BLOCK);
        blockWithItem(ModBlocks.CARBON_STEEL_BLOCK);
        blockWithItem(ModBlocks.STEEL_BLOCK);
        blockWithItem(ModBlocks.ELECTRIUM_BLOCK);
        blockWithItem(ModBlocks.TAIFUNITE_BLOCK);
        blockWithItem(ModBlocks.JADE_END_ORE);
        blockWithItem(ModBlocks.JADE_NETHER_ORE);
        blockWithItem(ModBlocks.JADE_STONE_ORE);
        blockWithItem(ModBlocks.JADE_DEEPSLATE_ORE);
        blockWithItem(ModBlocks.JADE_OBSIDIAN_ORE);
        blockWithItem(ModBlocks.RUBY_END_ORE);
        blockWithItem(ModBlocks.RUBY_NETHER_ORE);
        blockWithItem(ModBlocks.RUBY_STONE_ORE);
        blockWithItem(ModBlocks.RUBY_DEEPSLATE_ORE);
        blockWithItem(ModBlocks.RUBY_OBSIDIAN_ORE);
        blockWithItem(ModBlocks.AMETHYST_END_ORE);
        blockWithItem(ModBlocks.AMETHYST_NETHER_ORE);
        blockWithItem(ModBlocks.AMETHYST_STONE_ORE);
        blockWithItem(ModBlocks.AMETHYST_DEEPSLATE_ORE);
        blockWithItem(ModBlocks.AMETHYST_OBSIDIAN_ORE);
        blockWithItem(ModBlocks.AMBER_END_ORE);
        blockWithItem(ModBlocks.AMBER_NETHER_ORE);
        blockWithItem(ModBlocks.AMBER_STONE_ORE);
        blockWithItem(ModBlocks.AMBER_DEEPSLATE_ORE);
        blockWithItem(ModBlocks.AMBER_OBSIDIAN_ORE);
        blockWithItem(ModBlocks.DEVELOPIUM_BLOCK);
    }
}