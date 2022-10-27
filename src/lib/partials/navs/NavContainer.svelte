<script>
	import { page } from '$app/stores';
	import { getContext } from "svelte";

	import Nav from "./NavLinks.svelte";
	import ThumbXxs from "../images/ThumbXXS.svelte";
	
	// export let path;
	export let isAuthenticated = false
	export let logoId = undefined

	let path = $page.url.pathname

	const metiersLinks = getContext('metiersLinks')
	const navGeneraleLinks = getContext('navGeneraleLinks')


</script>
<nav class="nav-top-bar navbar is-fixed-top has-shadow"  aria-label="Menu principal">
	<div class="navbar-brand">
		<a class="navbar-item" href="/">
			<ThumbXxs id={logoId} />
		</a>

		<a role="button" id="top-burger" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>

	<div id="navMenu" class="navbar-menu">
		{#if navGeneraleLinks?.length > 0}
			<div class="navbar-start">
			<Nav {path} links={navGeneraleLinks} {isAuthenticated} />
		</div>
		{/if}

		{#if metiersLinks?.length > 0}
			<div class="navbar-end">
			<Nav {path} links={metiersLinks} />
		</div>
		{/if}
	</div>
</nav>




