<script>
	const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
	}
    const formatter = Intl.DateTimeFormat("fr-FR", options);
    export let datetime;
    const date = new Date(datetime)
</script>

{formatter.format(date)}