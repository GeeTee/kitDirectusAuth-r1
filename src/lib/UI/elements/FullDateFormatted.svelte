<script>
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour24: true,
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit"
	}
    const formatter = Intl.DateTimeFormat("fr-FR", options);
    export let datetime;
	const date = new Date(datetime)
</script>

{formatter.format(date)}