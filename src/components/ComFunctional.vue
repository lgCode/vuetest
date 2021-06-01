<template functional>
  <div style="width:100px;height:30px;background:blue;">
  </div>
</template>
<script>
export default {
  name: 'funtional-button',
  functional: true,
  render(createElement, context) {
    console.log(context);
    return createElement('button', context.props.name)
  }
}
</script>