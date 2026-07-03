package testRegistries;
import net.bananashelp20.forgermod.ForgerMod;
import net.minecraft.core.HolderLookup;
import net.minecraft.data.PackOutput;
import net.minecraft.data.tags.ItemTagsProvider;
import net.minecraft.tags.ItemTags;
import net.minecraft.world.level.block.Block;
import net.neoforged.neoforge.common.data.ExistingFileHelper;
import org.jetbrains.annotations.Nullable;
import java.util.concurrent.CompletableFuture;
public class ModItemTagProvider extends ItemTagsProvider {

    public ModItemTagProvider(PackOutput pOutput, CompletableFuture<HolderLookup.Provider> pLookupProvider, CompletableFuture<TagLookup<Block>> pBlockTags, @Nullable ExistingFileHelper existingFileHelper) {
        super(pOutput, pLookupProvider, pBlockTags, ForgerMod.MOD_ID, existingFileHelper);
    }

    @Override
    protected void addTags(HolderLookup.Provider pProvider) {
//        tag(ModTags.Items.TRANSFORMABLE_ITEMS)
//        ;
        //!GENERATE ITEM_TAGS

        tag(ItemTags.SWORDS)
                .add(ModItems.STORMING_CLAYMORE.get())
                .add(ModItems.CLAYMORE_OF_THUNDER.get())
                .add(ModItems.SHRIEKING_CLAYMORE.get())
                .add(ModItems.DREAMBOUND_CLAYMORE.get())
                .add(ModItems.CURSEBLOOD_CLAYMORE.get())
                .add(ModItems.CLAYMORE_OF_THE_VOID.get())
                .add(ModItems.INFERNAL_CLAYMORE.get())
                .add(ModItems.HOLLOW_CLAYMORE.get())
                .add(ModItems.OVERGROWN_CLAYMORE.get())
                .add(ModItems.DAMASK_KNIFE.get())
                .add(ModItems.STORMING_CLAYMORE.get())
                .add(ModItems.CLAYMORE_OF_THUNDER.get())
                .add(ModItems.SHRIEKING_CLAYMORE.get())
                .add(ModItems.DREAMBOUND_CLAYMORE.get())
                .add(ModItems.CURSEBLOOD_CLAYMORE.get())
                .add(ModItems.CLAYMORE_OF_THE_VOID.get())
                .add(ModItems.INFERNAL_CLAYMORE.get())
                .add(ModItems.HOLLOW_CLAYMORE.get())
                .add(ModItems.OVERGROWN_CLAYMORE.get())
                .add(ModItems.CLAYMORE.get())
                .add(ModItems.RUSTY_CLAYMORE.get())
                .add(ModItems.RUSTY_CLAYMORE.get())
                .add(ModItems.SCRAP_SWORD.get())
                .add(ModItems.SCRAP_IRON_SWORD.get())
                .add(ModItems.REINFORCED_IRON_SWORD.get())
                .add(ModItems.DAMASK_SWORD.get())
                .add(ModItems.STUMPFL_BAT.get())
                .add(ModItems.STEEL_SWORD.get())
                .add(ModItems.SHARPENED_BLADE.get())
        ;

        tag(ItemTags.AXES)
                .add(ModItems.STEEL_SWORD.get())
        ;
    }
}
