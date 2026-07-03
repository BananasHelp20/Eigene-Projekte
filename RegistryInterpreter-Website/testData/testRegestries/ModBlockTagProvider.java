package testRegistries;
import net.bananashelp20.forgermod.ForgerMod;
import net.bananashelp20.forgermod.util.ModTags;
import net.minecraft.core.HolderLookup;
import net.minecraft.data.PackOutput;
import net.minecraft.tags.BlockTags;
import net.neoforged.neoforge.common.data.BlockTagsProvider;
import net.neoforged.neoforge.common.data.ExistingFileHelper;
import org.jetbrains.annotations.Nullable;
import java.util.concurrent.CompletableFuture;
public class ModBlockTagProvider extends BlockTagsProvider {
    public ModBlockTagProvider(PackOutput output, CompletableFuture<HolderLookup.Provider> lookupProvider, @Nullable ExistingFileHelper existingFileHelper) {
        super(output, lookupProvider, ForgerMod.MOD_ID, existingFileHelper);
    }

    @Override
    protected void addTags(HolderLookup.Provider pProvider) {
        tag(ModTags.Blocks.INCORRECT_FOR_STEEL_TOOL)
                .addTag(BlockTags.INCORRECT_FOR_DIAMOND_TOOL)
                .remove(ModTags.Blocks.NEEDS_STEEL_TOOL)
        ;
        tag(ModTags.Blocks.INCORRECT_FOR_CARBON_STEEL_TOOL)
                .addTag(ModTags.Blocks.INCORRECT_FOR_STEEL_TOOL)
                .remove(ModTags.Blocks.NEEDS_CARBON_STEEL_TOOL)
        ;

        //!GENERATE BLOCK_TAGS
        tag(BlockTags.MINEABLE_WITH_PICKAXE)
                .add(ModBlocks.INFUSION_TABLE.get())
                .add(ModBlocks.FORGE.get())
                .add(ModBlocks.ANCIENT_SWORD_STAND.get())
                .add(ModBlocks.DEVELOPIUM_BLOCK.get())
                .add(ModBlocks.AMBER_OBSIDIAN_ORE.get())
                .add(ModBlocks.AMBER_DEEPSLATE_ORE.get())
                .add(ModBlocks.AMBER_STONE_ORE.get())
                .add(ModBlocks.AMBER_NETHER_ORE.get())
                .add(ModBlocks.AMBER_END_ORE.get())
                .add(ModBlocks.AMETHYST_OBSIDIAN_ORE.get())
                .add(ModBlocks.AMETHYST_DEEPSLATE_ORE.get())
                .add(ModBlocks.AMETHYST_STONE_ORE.get())
                .add(ModBlocks.AMETHYST_NETHER_ORE.get())
                .add(ModBlocks.AMETHYST_END_ORE.get())
                .add(ModBlocks.RUBY_OBSIDIAN_ORE.get())
                .add(ModBlocks.RUBY_DEEPSLATE_ORE.get())
                .add(ModBlocks.RUBY_STONE_ORE.get())
                .add(ModBlocks.RUBY_NETHER_ORE.get())
                .add(ModBlocks.RUBY_END_ORE.get())
                .add(ModBlocks.JADE_OBSIDIAN_ORE.get())
                .add(ModBlocks.JADE_DEEPSLATE_ORE.get())
                .add(ModBlocks.JADE_STONE_ORE.get())
                .add(ModBlocks.JADE_NETHER_ORE.get())
                .add(ModBlocks.JADE_END_ORE.get())
                .add(ModBlocks.TAIFUNITE_BLOCK.get())
                .add(ModBlocks.ELECTRIUM_BLOCK.get())
                .add(ModBlocks.STEEL_BLOCK.get())
                .add(ModBlocks.CARBON_STEEL_BLOCK.get())
                .add(ModBlocks.VULNUSIUM_BLOCK.get())
                .add(ModBlocks.SOMNIUM_BLOCK.get())
                .add(ModBlocks.MORSIUM_BLOCK.get())
                .add(ModBlocks.OVERGROWN_BLOCK.get())
                .add(ModBlocks.SCRAP_IRON_BLOCK.get())
                .add(ModBlocks.REINFORCED_IRON_BLOCK.get())
                .add(ModBlocks.IGNISIUM_BLOCK.get())
                .add(ModBlocks.INANISIUM_BLOCK.get())
                .add(ModBlocks.SCRAP_BLOCK.get())
                .add(ModBlocks.PULSITE_BLOCK.get())
                .add(ModBlocks.DAMASK_BLOCK.get())
        ;
        tag(BlockTags.NEEDS_DIAMOND_TOOL)
                .add(ModBlocks.STEEL_BLOCK.get())
                .add(ModBlocks.REINFORCED_IRON_BLOCK.get())
                .add(ModBlocks.DAMASK_BLOCK.get())
        ;
        tag(ModTags.Blocks.NEEDS_CARBON_STEEL_TOOL)
                .add(ModBlocks.DEVELOPIUM_BLOCK.get())
                .add(ModBlocks.TAIFUNITE_BLOCK.get())
                .add(ModBlocks.ELECTRIUM_BLOCK.get())
                .add(ModBlocks.CARBON_STEEL_BLOCK.get())
                .add(ModBlocks.VULNUSIUM_BLOCK.get())
                .add(ModBlocks.SOMNIUM_BLOCK.get())
                .add(ModBlocks.MORSIUM_BLOCK.get())
                .add(ModBlocks.OVERGROWN_BLOCK.get())
                .add(ModBlocks.IGNISIUM_BLOCK.get())
                .add(ModBlocks.INANISIUM_BLOCK.get())
                .add(ModBlocks.PULSITE_BLOCK.get())
        ;
        tag(BlockTags.NEEDS_IRON_TOOL)
                .add(ModBlocks.ANCIENT_SWORD_STAND.get())
                .add(ModBlocks.AMBER_OBSIDIAN_ORE.get())
                .add(ModBlocks.AMBER_DEEPSLATE_ORE.get())
                .add(ModBlocks.AMBER_STONE_ORE.get())
                .add(ModBlocks.AMBER_NETHER_ORE.get())
                .add(ModBlocks.AMBER_END_ORE.get())
                .add(ModBlocks.AMETHYST_OBSIDIAN_ORE.get())
                .add(ModBlocks.AMETHYST_DEEPSLATE_ORE.get())
                .add(ModBlocks.AMETHYST_STONE_ORE.get())
                .add(ModBlocks.AMETHYST_NETHER_ORE.get())
                .add(ModBlocks.AMETHYST_END_ORE.get())
                .add(ModBlocks.RUBY_OBSIDIAN_ORE.get())
                .add(ModBlocks.RUBY_DEEPSLATE_ORE.get())
                .add(ModBlocks.RUBY_STONE_ORE.get())
                .add(ModBlocks.RUBY_NETHER_ORE.get())
                .add(ModBlocks.RUBY_END_ORE.get())
                .add(ModBlocks.JADE_OBSIDIAN_ORE.get())
                .add(ModBlocks.JADE_DEEPSLATE_ORE.get())
                .add(ModBlocks.JADE_STONE_ORE.get())
                .add(ModBlocks.JADE_NETHER_ORE.get())
                .add(ModBlocks.JADE_END_ORE.get())
                .add(ModBlocks.SCRAP_IRON_BLOCK.get())
                .add(ModBlocks.SCRAP_BLOCK.get())
        ;
        tag(ModTags.Blocks.NEEDS_STEEL_TOOL)
                .add(ModBlocks.CARBON_STEEL_BLOCK.get())
        ;
    }
}
