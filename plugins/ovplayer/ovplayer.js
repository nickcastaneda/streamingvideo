// $Id: ovplayer.js,v 1.1 2009/08/24 20:48:05 joachim Exp $

Drupal.wysiwyg.plugins['ovplayer'] = {

  /**
   * Return whether the passed node belongs to this plugin.
   */
  isNode: function(node) {
    return ($(node).is('img.wysiwyg-ovplayer'));
  },

  /**
   * Execute the button.
   */
  invoke: function(data, settings, instanceId) {
    if (data.format == 'html') {
      var content = this._getPlaceholder(settings);
      var options = {nid: '', title: '', captionTitle: '', desc: '', captionDesc: '', link: '', url: '', align: '', width: '', height: '', id: instanceId, action: 'insert'};
    }
    else {
      var content = '<!--column-->';
    }
    if (typeof content != 'undefined') {
      Drupal.wysiwyg.instances[instanceId].openDialog(settings.dialog, options);
    }
  },

  /**
   * Replace all <!--column--> tags with images.
   */
  attach: function(content, settings, instanceId) {
    content = content.replace(/<!--column-->/g, this._getPlaceholder(settings));
    return content;
  },

  /**
   * Replace images with <!--column--> tags in content upon detaching editor.
   */
  detach: function(content, settings, instanceId) {
    var $content = $('<div>' + content + '</div>'); // No .outerHTML() in jQuery :(
    // #404532: document.createComment() required or IE will strip the comment.
    // #474908: IE 8 breaks when using jQuery methods to replace the elements.
    // @todo Add a generic implementation for all Drupal plugins for this.
    $.each($('img.wysiwyg-ovplayer', $content), function (i, elem) {
      elem.parentNode.insertBefore(document.createComment('column'), elem);
      elem.parentNode.removeChild(elem);
    });
    return $content.html();
  },

  /**
   * Helper function to return a HTML placeholder.
   */
  _getPlaceholder: function (settings) {
    return '<img src="' + settings.path + '/images/spacer.gif" alt="&lt;--column-&gt;" title="&lt;--column--&gt;" class="wysiwyg-ovplayer" />';
  }
};