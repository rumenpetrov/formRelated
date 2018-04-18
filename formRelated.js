(function($, window, document, undefined) {
	'use strict';

	/**
	 * Toggle content when certan checkbox or radio button is checked. Can handle multiple triggers and targets. Require "data-related-id" attribute on triggers and targets.
	 * 
	 * @param {object}
	 *
	 * TODO:
	 * - refactor toggle function
	 * - test radio buttons cases
	 * - add invert case
	 */
	var FormRelated = function(options) {
		this.initialize(options);
	};

	FormRelated.prototype = {
		defaults: {
			$triggers: null,
			$targets: null,
			classActive: 'has-flag'
		},
		options: {},
		$triggers: null,
		$targets: null,
		classActive: '',
		initialize: function(options) {
			var self = this;
			
			self.options = $.extend(true, {}, self.defaults, options);

			self.validateInput();
		},
		validateInput: function() {
			var self = this;

			if (self.options.$triggers === null || self.options.$targets === null) {
				console.error('FormRelated: Elements are missing or configuration is not valid!');
				console.error('FormRelated: Stop execution!');
				return;
			}

			if (!self.options.$triggers.length || !self.options.$targets.length) {
				console.error('FormRelated: Elements are missing!');
				console.error('FormRelated: Stop execution!');
				return;
			}

			self.cacheConfig();
		},
		cacheConfig: function() {
			var self = this;

			self.$triggers = self.options.$triggers;
			self.$targets = self.options.$targets;
			self.classActive = self.options.classActive;

			self.$triggers.data('related', self);

			self.bindEvents();
		},
		bindEvents: function() {
			var self = this;

			self.$triggers.on('change', function() {
				self.toggle(this);
			});

			self.$triggers.each(function() {
				self.toggle(this);
				// disabler();
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

					$this.addClass(self.classActive);
					$this.find('input, select, textarea').prop('disabled', false);
				});
			} else {
				$currentTargets.each(function() {
					var $this = $(this);

					$this.removeClass(self.classActive);
					$this.find('input, select, textarea').prop('disabled', true);
				});
			}
		}
	};

	window.formRelated = function(settings) {
		new FormRelated(settings);
	}
})(jQuery, window, document);