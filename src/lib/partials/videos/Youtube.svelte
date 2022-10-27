<script>
	import f from '$lib/helpers/scripts'
	import Notification from '$lib/UI/elements/Notification.svelte'

    export let video_url = null
    export let video_title = null
	export let title = 'YouTube video player'
    const src = f.getEmbedUrlYoutube(video_url)
	const missingUrl = 'Pas de vidéo'

    // console.log('Youtube component', f.getEmbedUrlYoutube(video_url))
    // console.log('Youtube component isYouTube ::: ', f.isYouTube('https://www.youtube.com/watch?v=kpmTGFj_pX8'))
</script>
<div>
	<div class="mediacontainer">
		{#if video_url}
		<iframe width="560" height="315" {src} {title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		
		{/if}
		{#if !video_url}
			<Notification is-warning text={missingUrl} />
		{/if}
	</div>
	{#if video_url && video_title}
		<span class="label is-uppercase">{video_title}</span>
	{/if}
</div>
<style lang="scss">
.mediacontainer {
	height: 0;
	overflow: hidden;
	padding-bottom: 56.25%; //format 16/9 pour youtube
	position: relative;
	width: 100%;
	iframe {
		height: 100% !important;
		left: 0;
		position: absolute;
		top: 0;
		width: 100% !important;
	}
	// &.r1 {
	// 	padding-bottom: 100%; // format carré
	// 	}
}
</style>