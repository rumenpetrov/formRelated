[In Progress]
# FormRelated

FormRelated toggle content when certan checkbox or radio button is checked. It can handle multiple triggers and targets.

## Getting started
To use it:
- Add the styles and the javascript into your project.

```
	<link rel="stylesheet" href="formRelated.css" type="text/css" media="all" />

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="formRelated.js"></script>
```

- Add "data-related-id" attribute with unique string on triggers and targets to distinguish between items.

To init the plugin add this:

```
	<script>
		formRelated({
			$triggers: $('.js-related-trigger'),
			$targets: $('.js-related-target'),
			classActive: 'has-flag'
		});
	</script>
```