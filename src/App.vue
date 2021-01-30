<template>
	<div class="main is-flex columns">
		<dir class="column is-4-desktop is-2">
			<ImagesColumn />
		</dir>
		<div class="pages column is-8">
			<router-view/>
		</div>
	</div>
</template>

<script>
import ImagesColumn from '/src/components/ImagesColumn'

export default {
	components:{
		ImagesColumn
	}
}
</script>

<style lang="sass" scoped>
.column
	padding: 0

</style>

