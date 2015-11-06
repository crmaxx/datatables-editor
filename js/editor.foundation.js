

(function(window, document, $, DataTable) {

/*
 * Set the default display controller to be our foundation control 
 */
DataTable.Editor.defaults.display = "foundation";


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	field: {
		wrapper:         "DTE_Field row",
		label:           "small-4 columns inline",
		input:           "small-8 columns",
		error:           "error",
		multiValue:      "panel radius multi-value",
		multiInfo:       "small",
		multiRestore:    "panel radius multi-restore",
		"msg-labelInfo": "label secondary",
		"msg-info":      "label secondary",
		"msg-message":   "label secondary",
		"msg-error":     "label alert"
	},
	form: {
		button:  "button small"
	}
} );


/*
 * Foundation display controller - this is effectively a proxy to the Foundation
 * modal control.
 */
var self;

DataTable.Editor.display.foundation = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		self._dom.content = $(
			'<div class="reveal-modal" data-reveal />'
		);
		self._dom.close = $('<button class="close">&times;</div>');

		self._dom.close.click( function () {
			self._dte.close('icon');
		} );

		$(document).on('click', 'div.reveal-modal-bg', function () {
			self._dte.background();
		} );

		return self;
	},

	"open": function ( dte, append, callback ) {
		if ( self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		self._dte = dte;
		self._shown = true;

		var content = self._dom.content;
		content.children().detach();
		content.append( append );
		content.prepend( self._dom.close );

		$(self._dom.content)
			.one('opened.fndtn.reveal', function () {
				if ( callback ) {
					callback();
				}
			})
			.one('closed.fndtn.reveal', function () {
				self._shown = false;
			})
			.foundation( 'reveal','open' );
	},

	"close": function ( dte, callback ) {
		if ( !self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		$(self._dom.content).foundation('reveal', 'close');

		self._dte = dte;
		self._shown = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return self._dom.content[0];
	},


	/*
	 * Private properties
	 */
	 "_shown": false,
	"_dte": null,
	"_dom": {}
} );

self = DataTable.Editor.display.foundation;


}(window, document, jQuery, jQuery.fn.dataTable));

