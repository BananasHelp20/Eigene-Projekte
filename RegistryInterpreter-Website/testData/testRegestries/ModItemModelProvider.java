package testRegistries;

import net.bananashelp20.forgermod.ForgerMod;
import net.minecraft.data.PackOutput;
import net.minecraft.resources.ResourceLocation;
import net.neoforged.neoforge.client.model.generators.ItemModelBuilder;
import net.neoforged.neoforge.client.model.generators.ItemModelProvider;
import net.neoforged.neoforge.common.data.ExistingFileHelper;
import net.neoforged.neoforge.registries.DeferredItem;

public class ModItemModelProvider extends ItemModelProvider {
    public ModItemModelProvider(PackOutput output, ExistingFileHelper existingFileHelper) {
        super(output, ForgerMod.MOD_ID, existingFileHelper);
    }

    private ItemModelBuilder handheldItem(DeferredItem<?> item) {
        return withExistingParent(item.getId().getPath(), ResourceLocation.parse("item/handheld"))
                .texture("layer0", ResourceLocation.fromNamespaceAndPath(ForgerMod.MOD_ID, "item/" + item.getId().getPath()));
    }

    private ItemModelBuilder simpleBlockItem(DeferredItem<?> item) {
        return withExistingParent(item.getId().getPath(),
                ResourceLocation.parse("item/generated")).texture("layer0",
                ResourceLocation.fromNamespaceAndPath(ForgerMod.MOD_ID,"item/" + item.getId().getPath()));
    }

    private void basicItem(DeferredItem<?> item) {
        basicItem(item.get());
    }

    @Override
    protected void registerModels() {
        //!GENERATE MODELS
        basicItem(ModItems.INANISIUM_SHARD);
        basicItem(ModItems.IGNISIUM_SHARD);
        basicItem(ModItems.MORSIUM_SHARD);
        basicItem(ModItems.SOMNIUM_SHARD);
        basicItem(ModItems.VULNUSIUM_SHARD);
        basicItem(ModItems.LUSH_SHARD);
        basicItem(ModItems.PULSITE_SHARD);
        basicItem(ModItems.ELECTRIUM_SHARD);
        basicItem(ModItems.TAIFUNITE_SHARD);
        basicItem(ModItems.DEVELOPIUM_SHARD);
        basicItem(ModItems.INANISIUM_INGOT);
        basicItem(ModItems.IGNISIUM_INGOT);
        basicItem(ModItems.MORSIUM_INGOT);
        basicItem(ModItems.SOMNIUM_INGOT);
        basicItem(ModItems.VULNUSIUM_INGOT);
        basicItem(ModItems.LUSH_INGOT);
        basicItem(ModItems.PULSITE_INGOT);
        basicItem(ModItems.ELECTRIUM_INGOT);
        basicItem(ModItems.TAIFUNITE_INGOT);
        basicItem(ModItems.DEVELOPIUM_INGOT);
        basicItem(ModItems.ANCIENT_UPGRADE_TEMPLATE);
        basicItem(ModItems.GEMSTONE_UPGRADE_TEMPLATE);
        basicItem(ModItems.SCRAP_INGOT);
        basicItem(ModItems.SCRAP_IRON_INGOT);
        basicItem(ModItems.UNREFINED_STEEL);
        basicItem(ModItems.UNREFINED_CARBON_STEEL);
        handheldItem(ModItems.SHARPENED_BLADE);
        basicItem(ModItems.CARBON_STEEL_CROSS_GUARD);
        handheldItem(ModItems.HANDLE);
        handheldItem(ModItems.ADVANCED_HANDLE);
        basicItem(ModItems.DAMASK_INGOT);
        basicItem(ModItems.REINFORCED_IRON_INGOT);
        basicItem(ModItems.CARBON_STEEL_INGOT);
        basicItem(ModItems.STEEL_INGOT);
        basicItem(ModItems.RUBY_GEMSTONE);
        basicItem(ModItems.AMBER_GEMSTONE);
        basicItem(ModItems.AMETHYST_GEMSTONE);
        basicItem(ModItems.JADE_GEMSTONE);
        handheldItem(ModItems.STEEL_SWORD);
        handheldItem(ModItems.STUMPFL_BAT);
        handheldItem(ModItems.DAMASK_SWORD);
        handheldItem(ModItems.REINFORCED_IRON_SWORD);
        handheldItem(ModItems.SCRAP_IRON_SWORD);
        handheldItem(ModItems.SCRAP_SWORD);
        handheldItem(ModItems.RUSTY_CLAYMORE);
        handheldItem(ModItems.CLAYMORE);
        handheldItem(ModItems.DAMASK_KNIFE);
        handheldItem(ModItems.OVERGROWN_CLAYMORE.get());
        handheldItem(ModItems.OVERGROWN_CLAYMORE_RUBY.get());
        handheldItem(ModItems.OVERGROWN_CLAYMORE_AMBER.get());
        handheldItem(ModItems.OVERGROWN_CLAYMORE_JADE.get());
        handheldItem(ModItems.OVERGROWN_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.HOLLOW_CLAYMORE.get());
        handheldItem(ModItems.HOLLOW_CLAYMORE_RUBY.get());
        handheldItem(ModItems.HOLLOW_CLAYMORE_AMBER.get());
        handheldItem(ModItems.HOLLOW_CLAYMORE_JADE.get());
        handheldItem(ModItems.HOLLOW_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.INFERNAL_CLAYMORE.get());
        handheldItem(ModItems.INFERNAL_CLAYMORE_RUBY.get());
        handheldItem(ModItems.INFERNAL_CLAYMORE_AMBER.get());
        handheldItem(ModItems.INFERNAL_CLAYMORE_JADE.get());
        handheldItem(ModItems.INFERNAL_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.CLAYMORE_OF_THE_VOID.get());
        handheldItem(ModItems.CLAYMORE_OF_THE_VOID_RUBY.get());
        handheldItem(ModItems.CLAYMORE_OF_THE_VOID_AMBER.get());
        handheldItem(ModItems.CLAYMORE_OF_THE_VOID_JADE.get());
        handheldItem(ModItems.CLAYMORE_OF_THE_VOID_AMETHYST.get());

        handheldItem(ModItems.CURSEBLOOD_CLAYMORE.get());
        handheldItem(ModItems.CURSEBLOOD_CLAYMORE_RUBY.get());
        handheldItem(ModItems.CURSEBLOOD_CLAYMORE_AMBER.get());
        handheldItem(ModItems.CURSEBLOOD_CLAYMORE_JADE.get());
        handheldItem(ModItems.CURSEBLOOD_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.DREAMBOUND_CLAYMORE.get());
        handheldItem(ModItems.DREAMBOUND_CLAYMORE_RUBY.get());
        handheldItem(ModItems.DREAMBOUND_CLAYMORE_AMBER.get());
        handheldItem(ModItems.DREAMBOUND_CLAYMORE_JADE.get());
        handheldItem(ModItems.DREAMBOUND_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.SHRIEKING_CLAYMORE.get());
        handheldItem(ModItems.SHRIEKING_CLAYMORE_RUBY.get());
        handheldItem(ModItems.SHRIEKING_CLAYMORE_AMBER.get());
        handheldItem(ModItems.SHRIEKING_CLAYMORE_JADE.get());
        handheldItem(ModItems.SHRIEKING_CLAYMORE_AMETHYST.get());

        handheldItem(ModItems.CLAYMORE_OF_THUNDER.get());
        handheldItem(ModItems.CLAYMORE_OF_THUNDER_RUBY.get());
        handheldItem(ModItems.CLAYMORE_OF_THUNDER_AMBER.get());
        handheldItem(ModItems.CLAYMORE_OF_THUNDER_JADE.get());
        handheldItem(ModItems.CLAYMORE_OF_THUNDER_AMETHYST.get());

        handheldItem(ModItems.STORMING_CLAYMORE.get());
        handheldItem(ModItems.STORMING_CLAYMORE_RUBY.get());
        handheldItem(ModItems.STORMING_CLAYMORE_AMBER.get());
        handheldItem(ModItems.STORMING_CLAYMORE_JADE.get());
        handheldItem(ModItems.STORMING_CLAYMORE_AMETHYST.get());

    }
}