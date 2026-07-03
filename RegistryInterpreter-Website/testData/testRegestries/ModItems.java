package testRegistries;

import net.bananashelp20.forgermod.ForgerMod;
import net.bananashelp20.forgermod.item.ModToolTiers;
import net.bananashelp20.forgermod.item.custom.*;
import net.minecraft.network.chat.Component;
import net.minecraft.world.item.*;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.registries.DeferredItem;
import net.neoforged.neoforge.registries.DeferredRegister;

import java.util.List;
import java.util.function.Supplier;

public class ModItems {
    public static final DeferredRegister.Items ITEMS = DeferredRegister.createItems(ForgerMod.MOD_ID);

    public static DeferredItem<Item> createItem(String name) {
        return ITEMS.register(name, () -> new Item(new Item.Properties()));
    }

    public static DeferredItem<Item> createItemWithDescription(String name, String descriptionName) {
        return ITEMS.register(name,
                () -> new Item(new Item.Properties()) {
                    @Override
                    public void appendHoverText(ItemStack pStack, TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {
                        pTooltipComponents.add(Component.translatable(descriptionName));
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);
                    }
                });
    }

    public static DeferredItem<Item> createItemWithRarityAndDescription(String name, String descriptionName, Rarity rarity) {
        return ITEMS.register(name,
                () -> new Item(new Item.Properties().rarity(rarity)) {
                    @Override
                    public void appendHoverText(ItemStack pStack, TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {
                        pTooltipComponents.add(Component.translatable(descriptionName));
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);
                    }
                });
    }

    public static DeferredItem<SwordItem> createSwordItem(String name, Tier tier, int damage, float speed) {
        return ITEMS.register(
                name, () -> new SwordItem(
                    tier, new Item.Properties().attributes(SwordItem.createAttributes(tier, damage, -speed)))
                );
    }

    public static DeferredItem<SwordItem> createSwordItemWithDescription(String name, Tier tier, int damage, float speed, String descriptionName) {
        return ITEMS.register(name,
                () -> new SwordItem(tier, new Item.Properties()
                        .attributes(SwordItem.createAttributes(tier, damage, -speed))) //Tier/Damage/attackSpeed
                {
                    @Override
                    public void appendHoverText(ItemStack pStack, TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {
                        pTooltipComponents.add(Component.translatable(descriptionName));
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);
                    }
                });
    }

    public static DeferredItem<SwordItem> createSwordItemWithRarityAndDescription(String name, Tier tier, Rarity rarity, int damage, float speed, String descriptionName) {
        return ITEMS.register(name,
                () -> new SwordItem(tier, new Item.Properties()
                        .rarity(rarity)
                        .attributes(SwordItem.createAttributes(tier, damage, -speed))) //Tier/Damage/attackSpeed
                {
                    @Override
                    public void appendHoverText(ItemStack pStack, TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {
                        pTooltipComponents.add(Component.translatable(descriptionName));
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);
                    }
                });
    }

    public static DeferredItem<SwordItem> createSpecialSwordItem(String name, Supplier<SwordItemWithEffect> weapon) {
        return ITEMS.register(name, weapon);
    }

    private static final int DEFAULT_RUSTY_DAMAGE = -2;
    private static final float DEFAULT_RUSTY_SPEED = 3.2f;
    private static final int SCRAP_IRON_SWORD_DAMAGE = 3;
    private static final float SCRAP_IRON_SWORD_SPEED = 2.6f;
    private static final int REINFORCED_IRON_SWORD_DAMAGE = 3;
    private static final float REINFOCED_IRON_SWORD_SPEED = 2.8f;
    private static final int KNIFE_DAMASK_DAMAGE = 0;
    private static final float KNIFE_DAMASK_SPEED = 1f;
    private static final int SCRAP_SWORD_DAMAGE = 4;
    private static final float SCRAP_SWORD_SPEED = 2.2f;
    private static final int DAMASK_SWORD_DAMAGE = 3;
    private static final float DAMASK_SWORD_SPEED = 2.4f;
    private static final int STEEL_SWORD_DAMAGE = 3;
    private static final float STEEL_SWORD_SPEED = 2.4f;
    private static final int DEFAULT_CLAYMORE_DAMAGE = 3;
    private static final float DEFAULT_CLAYMORE_SPEED = 2.8f;

    private static final int DEFAULT_SPECIAL_DAMAGE = 4;
    private static final float DEFAULT_SPECIAL_SPEED = 2.8f;
    private static final int GEMSTONE_SPECIAL_DAMAGE = 5;
    private static final float GEMSTONE_SPECIAL_SPEED = 2.4f;

    //!GENERATE

    public static final DeferredItem<Item> INANISIUM_SHARD = createItem("inanisium_shard");
    public static final DeferredItem<Item> IGNISIUM_SHARD = createItem("ignisium_shard");
    public static final DeferredItem<Item> MORSIUM_SHARD = createItem("morsium_shard");
    public static final DeferredItem<Item> SOMNIUM_SHARD = createItem("somnium_shard");
    public static final DeferredItem<Item> VULNUSIUM_SHARD = createItem("vulnusium_shard");
    public static final DeferredItem<Item> LUSH_SHARD = createItem("lush_shard");
    public static final DeferredItem<Item> PULSITE_SHARD = createItem("pulsite_shard");
    public static final DeferredItem<Item> ELECTRIUM_SHARD = createItem("electrium_shard");
    public static final DeferredItem<Item> TAIFUNITE_SHARD = createItem("taifunite_shard");
    public static final DeferredItem<Item> DEVELOPIUM_SHARD = createItem("developium_shard");
    public static final DeferredItem<Item> INANISIUM_INGOT = createItem("inanisium_ingot");
    public static final DeferredItem<Item> IGNISIUM_INGOT = createItem("ignisium_ingot");
    public static final DeferredItem<Item> MORSIUM_INGOT = createItem("morsium_ingot");
    public static final DeferredItem<Item> SOMNIUM_INGOT = createItem("somnium_ingot");
    public static final DeferredItem<Item> VULNUSIUM_INGOT = createItem("vulnusium_ingot");
    public static final DeferredItem<Item> LUSH_INGOT = createItem("lush_ingot");
    public static final DeferredItem<Item> PULSITE_INGOT = createItem("pulsite_ingot");
    public static final DeferredItem<Item> ELECTRIUM_INGOT = createItem("electrium_ingot");
    public static final DeferredItem<Item> TAIFUNITE_INGOT = createItem("taifunite_ingot");
    public static final DeferredItem<Item> DEVELOPIUM_INGOT = createItem("developium_ingot");
    public static final DeferredItem<Item> ANCIENT_UPGRADE_TEMPLATE = createItemWithDescription("ancient_upgrade_template", "tooltips.forgermod.ancient_upgrade_template.tooltip");
    public static final DeferredItem<Item> GEMSTONE_UPGRADE_TEMPLATE = createItemWithDescription("gemstone_upgrade_template", "tooltips.forgermod.gemstone_upgrade_template.tooltip");
    public static final DeferredItem<Item> SCRAP_INGOT = createItem("scrap_ingot");
    public static final DeferredItem<Item> SCRAP_IRON_INGOT = createItem("scrap_iron_ingot");
    public static final DeferredItem<Item> UNREFINED_STEEL = createItem("unrefined_steel");
    public static final DeferredItem<Item> UNREFINED_CARBON_STEEL = createItem("unrefined_carbon_steel");
    public static final DeferredItem<Item> SHARPENED_BLADE = createItemWithDescription("sharpened_blade", "tooltips.forgermod.sharpened_blade.tooltip");
    public static final DeferredItem<Item> CARBON_STEEL_CROSS_GUARD = createItemWithDescription("carbon_steel_cross_guard", "tooltips.forgermod.carbon_steel_cross_guard.tooltip");
    public static final DeferredItem<Item> HANDLE = createItemWithDescription("handle", "tooltips.forgermod.handle.tooltip");
    public static final DeferredItem<Item> ADVANCED_HANDLE = createItemWithDescription("advanced_handle", "tooltips.forgermod.advanced_handle.tooltip");
    public static final DeferredItem<Item> DAMASK_INGOT = createItem("damask_ingot");
    public static final DeferredItem<Item> REINFORCED_IRON_INGOT = createItem("reinforced_iron_ingot");
    public static final DeferredItem<Item> CARBON_STEEL_INGOT = createItem("carbon_steel_ingot");
    public static final DeferredItem<Item> STEEL_INGOT = createItem("steel_ingot");
    public static final DeferredItem<Item> RUBY_GEMSTONE = createItemWithDescription("ruby_gemstone", "tooltips.forgermod.ruby_gemstone.tooltip");
    public static final DeferredItem<Item> AMBER_GEMSTONE = createItemWithDescription("amber_gemstone", "tooltips.forgermod.amber_gemstone.tooltip");
    public static final DeferredItem<Item> AMETHYST_GEMSTONE = createItemWithDescription("amethyst_gemstone", "tooltips.forgermod.amethyst_gemstone.tooltip");
    public static final DeferredItem<Item> JADE_GEMSTONE = createItemWithDescription("jade_gemstone", "tooltips.forgermod.jade_gemstone.tooltip");
    public static final DeferredItem<SwordItem> STEEL_SWORD = createSwordItem("steel_sword", ModToolTiers.STEEL, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> STUMPFL_BAT = createSwordItemWithDescription("stumpfl_bat", ModToolTiers.DEVELOPIUM, 999999999, 0.1f, "tooltips.forgermod.stumpfl_bat.tooltip");
    public static final DeferredItem<SwordItem> DAMASK_SWORD = createSwordItem("damask_sword", ModToolTiers.DAMASK, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> REINFORCED_IRON_SWORD = createSwordItem("reinforced_iron_sword", ModToolTiers.REINFORCED_IRON, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> SCRAP_IRON_SWORD = createSwordItem("scrap_iron_sword", ModToolTiers.SCRAP_IRON, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> SCRAP_SWORD = createSwordItem("scrap_sword", ModToolTiers.SCRAP, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> RUSTY_CLAYMORE = createSwordItemWithRarityAndDescription("rusty_claymore", ModToolTiers.CARBON_STEEL, Rarity.UNCOMMON, 999999999, 0.1f, "tooltips.forgermod.rusty_claymore.tooltip");
    public static final DeferredItem<SwordItem> CLAYMORE = createSwordItemWithRarityAndDescription("claymore", ModToolTiers.CARBON_STEEL, Rarity.UNCOMMON, 999999999, 0.1f, "tooltips.forgermod.claymore.tooltip");
    public static final DeferredItem<SwordItem> DAMASK_KNIFE = createSwordItem("damask_knife", ModToolTiers.DAMASK, STEEL_SWORD_DAMAGE, STEEL_SWORD_SPEED);
    public static final DeferredItem<SwordItem> OVERGROWN_CLAYMORE = createSpecialSwordItem("overgrown_claymore", () -> new LushWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> OVERGROWN_CLAYMORE_RUBY = createSpecialSwordItem("overgrown_claymore_ruby", () -> new LushWeapon("ruby"));
    public static final DeferredItem<SwordItem> OVERGROWN_CLAYMORE_AMBER = createSpecialSwordItem("overgrown_claymore_amber", () -> new LushWeapon("amber"));
    public static final DeferredItem<SwordItem> OVERGROWN_CLAYMORE_JADE = createSpecialSwordItem("overgrown_claymore_jade", () -> new LushWeapon("jade"));
    public static final DeferredItem<SwordItem> OVERGROWN_CLAYMORE_AMETHYST = createSpecialSwordItem("overgrown_claymore_amethyst", () -> new LushWeapon("amethyst"));

    public static final DeferredItem<SwordItem> HOLLOW_CLAYMORE = createSpecialSwordItem("hollow_claymore", () -> new MorsiumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> HOLLOW_CLAYMORE_RUBY = createSpecialSwordItem("hollow_claymore_ruby", () -> new MorsiumWeapon("ruby"));
    public static final DeferredItem<SwordItem> HOLLOW_CLAYMORE_AMBER = createSpecialSwordItem("hollow_claymore_amber", () -> new MorsiumWeapon("amber"));
    public static final DeferredItem<SwordItem> HOLLOW_CLAYMORE_JADE = createSpecialSwordItem("hollow_claymore_jade", () -> new MorsiumWeapon("jade"));
    public static final DeferredItem<SwordItem> HOLLOW_CLAYMORE_AMETHYST = createSpecialSwordItem("hollow_claymore_amethyst", () -> new MorsiumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> INFERNAL_CLAYMORE = createSpecialSwordItem("infernal_claymore", () -> new IgnisiumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> INFERNAL_CLAYMORE_RUBY = createSpecialSwordItem("infernal_claymore_ruby", () -> new IgnisiumWeapon("ruby"));
    public static final DeferredItem<SwordItem> INFERNAL_CLAYMORE_AMBER = createSpecialSwordItem("infernal_claymore_amber", () -> new IgnisiumWeapon("amber"));
    public static final DeferredItem<SwordItem> INFERNAL_CLAYMORE_JADE = createSpecialSwordItem("infernal_claymore_jade", () -> new IgnisiumWeapon("jade"));
    public static final DeferredItem<SwordItem> INFERNAL_CLAYMORE_AMETHYST = createSpecialSwordItem("infernal_claymore_amethyst", () -> new IgnisiumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> CLAYMORE_OF_THE_VOID = createSpecialSwordItem("claymore_of_the_void", () -> new InanisiumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THE_VOID_RUBY = createSpecialSwordItem("claymore_of_the_void_ruby", () -> new InanisiumWeapon("ruby"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THE_VOID_AMBER = createSpecialSwordItem("claymore_of_the_void_amber", () -> new InanisiumWeapon("amber"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THE_VOID_JADE = createSpecialSwordItem("claymore_of_the_void_jade", () -> new InanisiumWeapon("jade"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THE_VOID_AMETHYST = createSpecialSwordItem("claymore_of_the_void_amethyst", () -> new InanisiumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> CURSEBLOOD_CLAYMORE = createSpecialSwordItem("curseblood_claymore", () -> new VulnusiumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> CURSEBLOOD_CLAYMORE_RUBY = createSpecialSwordItem("curseblood_claymore_ruby", () -> new VulnusiumWeapon("ruby"));
    public static final DeferredItem<SwordItem> CURSEBLOOD_CLAYMORE_AMBER = createSpecialSwordItem("curseblood_claymore_amber", () -> new VulnusiumWeapon("amber"));
    public static final DeferredItem<SwordItem> CURSEBLOOD_CLAYMORE_JADE = createSpecialSwordItem("curseblood_claymore_jade", () -> new VulnusiumWeapon("jade"));
    public static final DeferredItem<SwordItem> CURSEBLOOD_CLAYMORE_AMETHYST = createSpecialSwordItem("curseblood_claymore_amethyst", () -> new VulnusiumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> DREAMBOUND_CLAYMORE = createSpecialSwordItem("dreambound_claymore", () -> new SomniumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> DREAMBOUND_CLAYMORE_RUBY = createSpecialSwordItem("dreambound_claymore_ruby", () -> new SomniumWeapon("ruby"));
    public static final DeferredItem<SwordItem> DREAMBOUND_CLAYMORE_AMBER = createSpecialSwordItem("dreambound_claymore_amber", () -> new SomniumWeapon("amber"));
    public static final DeferredItem<SwordItem> DREAMBOUND_CLAYMORE_JADE = createSpecialSwordItem("dreambound_claymore_jade", () -> new SomniumWeapon("jade"));
    public static final DeferredItem<SwordItem> DREAMBOUND_CLAYMORE_AMETHYST = createSpecialSwordItem("dreambound_claymore_amethyst", () -> new SomniumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> SHRIEKING_CLAYMORE = createSpecialSwordItem("shrieking_claymore", () -> new PulsiteWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> SHRIEKING_CLAYMORE_RUBY = createSpecialSwordItem("shrieking_claymore_ruby", () -> new PulsiteWeapon("ruby"));
    public static final DeferredItem<SwordItem> SHRIEKING_CLAYMORE_AMBER = createSpecialSwordItem("shrieking_claymore_amber", () -> new PulsiteWeapon("amber"));
    public static final DeferredItem<SwordItem> SHRIEKING_CLAYMORE_JADE = createSpecialSwordItem("shrieking_claymore_jade", () -> new PulsiteWeapon("jade"));
    public static final DeferredItem<SwordItem> SHRIEKING_CLAYMORE_AMETHYST = createSpecialSwordItem("shrieking_claymore_amethyst", () -> new PulsiteWeapon("amethyst"));

    public static final DeferredItem<SwordItem> CLAYMORE_OF_THUNDER = createSpecialSwordItem("claymore_of_thunder", () -> new ElectriumWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THUNDER_RUBY = createSpecialSwordItem("claymore_of_thunder_ruby", () -> new ElectriumWeapon("ruby"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THUNDER_AMBER = createSpecialSwordItem("claymore_of_thunder_amber", () -> new ElectriumWeapon("amber"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THUNDER_JADE = createSpecialSwordItem("claymore_of_thunder_jade", () -> new ElectriumWeapon("jade"));
    public static final DeferredItem<SwordItem> CLAYMORE_OF_THUNDER_AMETHYST = createSpecialSwordItem("claymore_of_thunder_amethyst", () -> new ElectriumWeapon("amethyst"));

    public static final DeferredItem<SwordItem> STORMING_CLAYMORE = createSpecialSwordItem("storming_claymore", () -> new TaifuniteWeapon("no_gemstone"));
    public static final DeferredItem<SwordItem> STORMING_CLAYMORE_RUBY = createSpecialSwordItem("storming_claymore_ruby", () -> new TaifuniteWeapon("ruby"));
    public static final DeferredItem<SwordItem> STORMING_CLAYMORE_AMBER = createSpecialSwordItem("storming_claymore_amber", () -> new TaifuniteWeapon("amber"));
    public static final DeferredItem<SwordItem> STORMING_CLAYMORE_JADE = createSpecialSwordItem("storming_claymore_jade", () -> new TaifuniteWeapon("jade"));
    public static final DeferredItem<SwordItem> STORMING_CLAYMORE_AMETHYST = createSpecialSwordItem("storming_claymore_amethyst", () -> new TaifuniteWeapon("amethyst"));

}