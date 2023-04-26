<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import TreeElement from "./TreeElement.svelte";
    import type { Tree } from "./tree.js";

    export let data:Tree;

    let x = 0;
    let y = 0;

    let menuX = 0;
    let menuY = 0;

    let dispatchEvent = createEventDispatcher();

    function onMouseMove(e:MouseEvent){
        x = e.clientX;
        y = e.clientY;
    }

    function onSelect(item: Tree){
        dispatchEvent('select', item);
    }

    function onContextMenu(item: Tree){
        menuX = x;
        menuY = y;
        dispatchEvent('contextMenu', {x: menuX, y:menuY, item})
    }


</script>
  
<div on:mousemove={onMouseMove} style="min-width:200px; margin-right:50px">
    <TreeElement node={data} on:contextMenu={(e)=>onContextMenu(e.detail)} on:select={(e)=>onSelect(e.detail)}></TreeElement> 
</div>