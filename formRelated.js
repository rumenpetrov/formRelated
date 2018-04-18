(function($, window, document, undefined) {
	'use strict';

	var name = 'FormRelated';

	/**
	 * Toggle content when certan checkbox or radio button is checked. Can handle multiple triggers and targets. Require "data-related-id" attribute on triggers and targets.
	 * 
	 * @param {object}
	 *
	 * TODO:
	 * - refactor toggle function
	 * - add radio buttons case where there are multiple options
	 * - add invert case
	 */
	var FormRelated = function(settings) {
		this.initialize(settings);
	};

	FormRelated.prototype = {
		defaults: {
			triggers: '.js-form-related-trigger',
			targets: '.js-form-related-target',
			classActive: 'has-flag'
		},
		settings: {},
		$triggers: null,
		$targets: null,
		initialize: function(settings) {
			var self = this;

			self.settings = $.extend(true, {}, self.defaults, settings);

			self.cacheConfig();
			self.bindEvents();

			self.$triggers.each(function() {
				self.toggle(this);
			});
		},
		cacheConfig: function() {
			this.$triggers = $(this.settings.triggers);
			this.$targets = $(this.settings.targets);
		},
		bindEvents: function() {
			var self = this;

			self.$triggers.on('change', function() {
				self.toggle(this);
			});
		},
		toggle: function(element) {
			var self = this;
			var $element = $(element);
			var type = $element.attr('type');
			var currentId = $element.attr('data-related-id');
			var $currentTriggers = self.$triggers.filter('[data-related-id="'+ currentId +'"]');
			var $currentTargets = self.$targets.filter('[data-related-id="'+ currentId +'"]');
			var stateChecked = $element.prop('checked');
			var stateValue = false;

			if (type === 'checkbox') {
				stateValue = true;
				$currentTriggers.not($element).prop('checked', stateChecked);
			}

			if (stateChecked && type === 'radio') {
				stateValue = ($element.val() === 'true' || $element.val() === '1' || $element.val() === 'yes') ? true : false;
			}

			if (stateChecked && stateValue) {
				$currentTargets.each(function() {
					var $this = $(this);

					$this.addClass(self.settings.classActive);
					$this.find('input, select, textarea').prop('disabled', false);
				});
			} else {
				$currentTargets.each(function() {
					var $this = $(this);

					$this.removeClass(self.settings.classActive);
					$this.find('input, select, textarea').prop('disabled', true);
				});
			}
		}
	};

	window.formRelated = function(settings) {
		new FormRelated(settings);
	}
})(jQuery, window, document);