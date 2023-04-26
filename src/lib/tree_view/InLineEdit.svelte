<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
  
	export let value:any; 
	export let required:boolean = true
	export let editing = false; 
	export let auto = true;
	export let placeholder = "";
	export let autofocus = false;
	let original:any;
	let ref: boolean;
  
	const dispatch = createEventDispatcher()

	onMount(() => {
	  original = value
	})
  
	function edit() {
	  if(!auto) return;
	  editing = true
	}
  
	function submit() {
		  if (value != original) {
			  dispatch('submit', value)
		  }
		  
	  editing = false
	}
  
	function keydown(event:any) {
	  
	  if (event.key == 'Escape') {
		event.preventDefault()
		value = original
		editing = false
	  }

	  if(event.key == 'Enter'){
		editing = false;
	  }
	}
	  
	  function focus(element:any) {
		  element.focus()
	  }
  </script>
  
  {#if editing}
	<form on:submit|preventDefault={submit} on:keydown={keydown}>
	  <input 
	  bind:value {autofocus} on:blur={submit} {required} use:focus {placeholder} on:input={(e)=>dispatch('input', value)}/>
	</form>
  {:else}
	<div on:click={edit}>
		{value}
	</div>
  {/if}
  
  {#if value == "" && !editing}
  <span style="color:grey" on:click={edit}>
	  {placeholder}
  </span>
{/if}

<svelte:body on:keydown={keydown}></svelte:body>


  <style>
	input {
	  border: none;
	  background: none;
	  font-size: inherit;
	  color: inherit;
	  font-weight: inherit;
	  text-align: inherit;
	  box-shadow: none;
	}
	  input:focus {
		  all:inherit
	}
  </style>