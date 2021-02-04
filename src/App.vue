<template>
	<div class="container">
		<router-view class="container"/>
		<portal-target name="modals" />
	</div>
</template>
<script>
export default {
  title: 'Home - Page Viewer'
}
</script>