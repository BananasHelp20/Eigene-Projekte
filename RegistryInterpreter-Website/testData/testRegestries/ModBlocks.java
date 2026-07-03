package testRegistries;

import net.bananashelp20.forgermod.ForgerMod;
import net.bananashelp20.forgermod.block.custom.AncientSwordStandBlock;
import net.bananashelp20.forgermod.block.custom.ForgeBlock;
import net.bananashelp20.forgermod.block.custom.InfusionTableBlock;
import net.bananashelp20.forgermod.item.ModItems;
import net.minecraft.network.chat.Component;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.TooltipFlag;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.registries.DeferredBlock;
import net.neoforged.neoforge.registries.DeferredRegister;

import java.util.List;
import java.util.function.Supplier;

public class ModBlocks {
    public static final DeferredRegister.Blocks BLOCKS = DeferredRegister.createBlocks(ForgerMod.MOD_ID);

    public static <T extends Block> DeferredBlock<T> registerBlock(String name, Supplier<T> block) {
        DeferredBlock<T> toReturn = BLOCKS.register(name, block);
        registerBlockItem(name, toReturn);
        return toReturn;
    }

    private static <T extends Block> void registerBlockItem(String name, DeferredBlock<T> block) {
        ModItems.ITEMS.register(name, () -> new BlockItem(block.get(), new Item.Properties()));
    }

    public static DeferredBlock<Block> createSimpleBlock(String name, float destroyTime, int explosionResistance, SoundType sound) {
        return registerBlock(name, () -> new Block(BlockBehaviour.Properties.of()
                        .strength(destroyTime, explosionResistance)
                        .sound(sound)
                        .requiresCorrectToolForDrops()
                )
        );
    }

    public static DeferredBlock<Block> createBlockWithDescription(String name, float destroyTime, int explosionTime, SoundType sound, String descriptionName) {
        return registerBlock(name,
                () -> new Block(BlockBehaviour.Properties.of()
                        .strength(destroyTime, explosionTime)
                        .sound(sound)
                        .requiresCorrectToolForDrops()) {
                    @Override
                    public void appendHoverText(ItemStack pStack, Item.TooltipContext pContext, List<Component> pTooltipComponents, TooltipFlag pTooltipFlag) {
                        pTooltipComponents.add(Component.translatable(descriptionName));
                        super.appendHoverText(pStack, pContext, pTooltipComponents, pTooltipFlag);
                    }
                }
        );
    }

    public static void register(IEventBus eventBus) {
        BLOCKS.register(eventBus);
    }
    //!GENERATE

    public static final DeferredBlock<Block> DAMASK_BLOCK = createSimpleBlock("damask_block",77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> PULSITE_BLOCK = createSimpleBlock("pulsite_block",77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> SCRAP_BLOCK = createSimpleBlock("scrap_block",60f, 50, SoundType.NETHERITE_BLOCK);
    public static final DeferredBlock<Block> INANISIUM_BLOCK = createSimpleBlock("inanisium_block",77f, 50, SoundType.AMETHYST);
    public static final DeferredBlock<Block> IGNISIUM_BLOCK = createSimpleBlock("ignisium_block",77f, 50, SoundType.GILDED_BLACKSTONE);
    public static final DeferredBlock<Block> REINFORCED_IRON_BLOCK = createSimpleBlock("reinforced_iron_block",55f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> SCRAP_IRON_BLOCK = createSimpleBlock("scrap_iron_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> OVERGROWN_BLOCK = createSimpleBlock("overgrown_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> MORSIUM_BLOCK = createSimpleBlock("morsium_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> SOMNIUM_BLOCK = createSimpleBlock("somnium_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> VULNUSIUM_BLOCK = createSimpleBlock("vulnusium_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> CARBON_STEEL_BLOCK = createSimpleBlock("carbon_steel_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> STEEL_BLOCK = createSimpleBlock("steel_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> ELECTRIUM_BLOCK = createSimpleBlock("electrium_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> TAIFUNITE_BLOCK = createSimpleBlock("taifunite_block",45f, 50, SoundType.METAL);
    public static final DeferredBlock<Block> JADE_END_ORE = createSimpleBlock("jade_end_ore",3.0f, 9, SoundType.STONE);
    public static final DeferredBlock<Block> JADE_NETHER_ORE = createSimpleBlock("jade_nether_ore",3.0f, 3, SoundType.NETHER_ORE);
    public static final DeferredBlock<Block> JADE_STONE_ORE = createSimpleBlock("jade_stone_ore",1.5f, 6, SoundType.STONE);
    public static final DeferredBlock<Block> JADE_DEEPSLATE_ORE = createSimpleBlock("jade_deepslate_ore",3.0f, 6, SoundType.DEEPSLATE);
    public static final DeferredBlock<Block> JADE_OBSIDIAN_ORE = createSimpleBlock("jade_obsidian_ore",50.0f, 1200, SoundType.STONE);
    public static final DeferredBlock<Block> RUBY_END_ORE = createSimpleBlock("ruby_end_ore",3.0f, 9, SoundType.STONE);
    public static final DeferredBlock<Block> RUBY_NETHER_ORE = createSimpleBlock("ruby_nether_ore",3.0f, 3, SoundType.NETHER_ORE);
    public static final DeferredBlock<Block> RUBY_STONE_ORE = createSimpleBlock("ruby_stone_ore",1.5f, 6, SoundType.STONE);
    public static final DeferredBlock<Block> RUBY_DEEPSLATE_ORE = createSimpleBlock("ruby_deepslate_ore",3.0f, 6, SoundType.DEEPSLATE);
    public static final DeferredBlock<Block> RUBY_OBSIDIAN_ORE = createSimpleBlock("ruby_obsidian_ore",50.0f, 1200, SoundType.STONE);
    public static final DeferredBlock<Block> AMETHYST_END_ORE = createSimpleBlock("amethyst_end_ore",3.0f, 9, SoundType.STONE);
    public static final DeferredBlock<Block> AMETHYST_NETHER_ORE = createSimpleBlock("amethyst_nether_ore",3.0f, 3, SoundType.NETHER_ORE);
    public static final DeferredBlock<Block> AMETHYST_STONE_ORE = createSimpleBlock("amethyst_stone_ore",1.5f, 6, SoundType.STONE);
    public static final DeferredBlock<Block> AMETHYST_DEEPSLATE_ORE = createSimpleBlock("amethyst_deepslate_ore",3.0f, 6, SoundType.DEEPSLATE);
    public static final DeferredBlock<Block> AMETHYST_OBSIDIAN_ORE = createSimpleBlock("amethyst_obsidian_ore",50.0f, 1200, SoundType.STONE);
    public static final DeferredBlock<Block> AMBER_END_ORE = createSimpleBlock("amber_end_ore",3.0f, 9, SoundType.STONE);
    public static final DeferredBlock<Block> AMBER_NETHER_ORE = createSimpleBlock("amber_nether_ore",3.0f, 3, SoundType.NETHER_ORE);
    public static final DeferredBlock<Block> AMBER_STONE_ORE = createSimpleBlock("amber_stone_ore",1.5f, 6, SoundType.STONE);
    public static final DeferredBlock<Block> AMBER_DEEPSLATE_ORE = createSimpleBlock("amber_deepslate_ore",3.0f, 6, SoundType.DEEPSLATE);
    public static final DeferredBlock<Block> AMBER_OBSIDIAN_ORE = createSimpleBlock("amber_obsidian_ore",50.0f, 1200, SoundType.STONE);
    public static final DeferredBlock<Block> DEVELOPIUM_BLOCK = createBlockWithDescription("developium_block", 50f, 100, SoundType.HEAVY_CORE, "tooltips.forgermod.developium_block.tooltip");

    public static final DeferredBlock<Block> ANCIENT_SWORD_STAND = registerBlock("ancient_sword_stand",
            () -> new AncientSwordStandBlock(BlockBehaviour.Properties.of().noOcclusion().strength(45f, 50).sound(SoundType.DEEPSLATE))
    );

    public static final DeferredBlock<Block> FORGE = registerBlock("forge",
            () -> new ForgeBlock(BlockBehaviour.Properties.of().strength(45f, 50).sound(SoundType.NETHERITE_BLOCK).lightLevel(state -> state.getValue(ForgeBlock.LIT) ? 10 : 0))
    );

    public static final DeferredBlock<Block> INFUSION_TABLE = registerBlock("infusion_table",
            () -> new InfusionTableBlock(BlockBehaviour.Properties.of().strength(45f, 50).sound(SoundType.WOOD))
    );
}