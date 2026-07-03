package testRegistries;

import net.bananashelp20.forgermod.block.custom.AncientSwordStandBlock;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.neoforged.neoforge.registries.DeferredBlock;

import static net.bananashelp20.forgermod.block.ModBlocks.*;


public class TestReg {
    public static void main(String[] args) {
        System.out.println();
    }

    //STARTGENERATING!

    //Simple Blocks
    public static final DeferredBlock<Block> NEWBLOCK = createSimpleBlock("newblock", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> NEWBLOCKADFDSF = createSimpleBlock("newblockadfdsf", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> NEWBLOCKASDJF = createSimpleBlock("newblockasdjf", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> NEWBLOCKABHASD = createSimpleBlock("newblockabhasd", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> NEWBLOCK3 = createSimpleBlock("newblock3", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> ABCBLOCK = createSimpleBlock("abcblock", 77f, 50, SoundType.HEAVY_CORE);
    public static final DeferredBlock<Block> NEWBLOCKADSF = createSimpleBlock("newblockadsf", 77f, 50, SoundType.HEAVY_CORE);

    //Special Blocks
    public static final DeferredBlock<Block> NEWSPECIALBLOCK = createBlockWithDescription("newspecialblock", 50f, 100, SoundType.HEAVY_CORE, "tooltips.forgermod.newSpecialBlock.tooltip");

    //Complex Blocks
    public static final DeferredBlock<Block> NEWCOMPLEXBLOCK = registerBlock("newcomplexblock",
            () -> new AncientSwordStandBlock(BlockBehaviour.Properties.of().noOcclusion().strength(45f, 50).sound(SoundType.NETHERITE_BLOCK)));
    public static final DeferredBlock<Block> NEWCOMPLEXBLOCK2 = registerBlock("newcomplexblock2",
            () -> new AncientSwordStandBlock(BlockBehaviour.Properties.of().noOcclusion().strength(45f, 50).sound(SoundType.NETHERITE_BLOCK)));

}