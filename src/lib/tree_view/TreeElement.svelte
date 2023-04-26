<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Tree } from "./tree";
  import { createEventDispatcher } from "svelte";
    import InLineEdit from "./InLineEdit.svelte";
    import Icon from "$lib/icons/components/Icon.svelte";
    import caretDown from "$lib/icons/icons/caretDown";
    import caretRight from "$lib/icons/icons/caretRight";

  export let node: Tree;
  let dispatch = createEventDispatcher();

  function onClick(item: Tree) {
    item.open = !item.open;
    onSelect(item);
    node = node;
  }

  function onContextMenu(item: Tree) {
    dispatch("contextMenu", item);
  }

  function onSelect(item: Tree) {
    dispatch("select", item);
  }
</script>

<span transition:fade>
  <div class="tree-item">
    {#if node.open}
      <Icon data={caretDown} />
    {:else}
      <Icon data={caretRight}></Icon>
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="tree-item-content" on:click={() => onClick(node)} on:contextmenu|preventDefault={() => onContextMenu(node)}>
      <span class="name">
        <InLineEdit bind:value={node.name} bind:editing={node.rename} auto={false}></InLineEdit>
      </span>
    </div>
  </div>
  {#if node.open}
    <div class="tree-item-children">
      {#each node.children as item}
        <svelte:self node={item} on:contextMenu={(item) => onContextMenu(item.detail)} on:select={(e) => dispatch("select", e.detail)}></svelte:self>
      {/each}
    </div>
  {/if}
</span>

<style>
  .name {
    cursor: pointer;
    user-select: none;
    margin-left:5px;
  }

  .tree-item {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .tree-item-content {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right:10px;
  }

  .tree-item-children {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
