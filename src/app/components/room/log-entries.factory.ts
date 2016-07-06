/*
 * Copyright (C) 2015 SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

LogEntryFactory.$inject = ['$sanitize'];
function LogEntryFactory($sanitize) {
  return function(type, content) {
    this.type = type;
    this.timestamp = new Date();
    this.content = content || {};

    this.text = function() {
      return this[this.type + "Text"]();
    };

    this.muteRequestText = function() {
      var res;

      if (this.content.source.isPublisher) {
        res = "You have muted ";
      } else {
        res = this.content.source.display + " has muted ";
      }
      if (this.content.target.isPublisher) {
        res += "you";
      } else {
        res += this.content.target.display;
      }
      return res;
    };

    this.chatMsgText = function() {
      return $sanitize(this.content.text).trim();
    };

    this.publishScreenText = function() {
      return "Screen sharing started";
    };

    this.destroyFeedText = function() {
      if (this.content.feed.isLocalScreen) {
        return "Screen sharing stopped";
      } else {
        return this.content.feed.display + " has left the room";
      }
    };

    this.newRemoteFeedText = function() {
      return this.content.feed.display + " has joined the room";
    };

    this.ignoreFeedText = function() {
      return "You are ignoring " + this.content.feed.display + " now";
    };

    this.stopIgnoringFeedText = function() {
      return "You are not longer ignoring " + this.content.feed.display;
    };

    this.hasText = function() {
      return this.text() !== "";
    };
  };
}

export default LogEntryFactory;
