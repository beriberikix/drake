// Generated by CoffeeScript 1.6.3
(function() {
  var App, Backbone, Config, JSON, NProgress, Safe, SafeEntries, SafeEntry, SafeEntryView, Templates, el, reactive, sjcl, uid, _, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  require("jquery");

  JSON = require("json");

  _ = require("underscore");

  Backbone = require("backbone");

  NProgress = require("nprogress");

  sjcl = require("sjcl");

  uid = require("uid");

  reactive = require("reactive");

  reactive.subscribe(function(obj, prop, fn) {
    return obj.on("change:" + prop, fn);
  });

  reactive.set(function(obj, prop) {
    return obj.set(prop);
  });

  reactive.get(function(obj, prop) {
    return obj.get(prop);
  });

  reactive.bind("data-text", function(el, name) {
    var obj;
    obj = this.obj;
    el.innerText = obj.get(name);
    return el.onblur = function() {
      return obj.set(name, el.innerText);
    };
  });

  reactive.bind("data-value", function(el, name) {
    var obj;
    obj = this.obj;
    el.value = obj.get(name);
    return el.onchange = function() {
      return obj.set(name, el.value);
    };
  });

  Config = {
    clientId: "671657367079.apps.googleusercontent.com"
  };

  Templates = {
    entry: document.querySelector(".entry")
  };

  _ref = _(Templates).values();
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    el.remove();
  }

  SafeEntry = (function(_super) {
    __extends(SafeEntry, _super);

    function SafeEntry() {
      _ref1 = SafeEntry.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return SafeEntry;

  })(Backbone.Model);

  SafeEntries = (function(_super) {
    __extends(SafeEntries, _super);

    function SafeEntries() {
      _ref2 = SafeEntries.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    SafeEntries.prototype.model = SafeEntry;

    return SafeEntries;

  })(Backbone.Collection);

  Safe = (function(_super) {
    __extends(Safe, _super);

    function Safe() {
      this.update = __bind(this.update, this);
      this.open = __bind(this.open, this);
      _ref3 = Safe.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Safe.prototype.open = function(password) {
      var entries;
      this.set("password", password);
      try {
        entries = sjcl.decrypt(password, this.get("ciphertext"));
      } catch (_error) {
        return false;
      }
      this.entries.reset(JSON.parse(entries));
      return true;
    };

    Safe.prototype.update = function() {
      var data;
      data = JSON.stringify(this.entries.toJSON());
      this.set("ciphertext", sjcl.encrypt(this.get("password"), data));
      return this;
    };

    return Safe;

  })(Backbone.Model);

  SafeEntryView = (function(_super) {
    __extends(SafeEntryView, _super);

    function SafeEntryView() {
      this.trash = __bind(this.trash, this);
      this.hidePasword = __bind(this.hidePasword, this);
      this.showPassword = __bind(this.showPassword, this);
      _ref4 = SafeEntryView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    SafeEntryView.prototype.events = {
      "focus .password": "showPassword",
      "blur .password": "hidePasword",
      "click .trash": "trash"
    };

    SafeEntryView.prototype.showPassword = function() {
      this.$(".password").attr("type", "text");
      return this;
    };

    SafeEntryView.prototype.hidePasword = function() {
      this.$(".password").attr("type", "password");
      return this;
    };

    SafeEntryView.prototype.trash = function() {
      this.model.set("trashed", true);
      this.remove();
      return this;
    };

    return SafeEntryView;

  })(Backbone.View);

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      this.genPass = __bind(this.genPass, this);
      this.updateSafeMetadata = __bind(this.updateSafeMetadata, this);
      this.sync = __bind(this.sync, this);
      this.toggleSync = __bind(this.toggleSync, this);
      this.newEntry = __bind(this.newEntry, this);
      this.renderEntries = __bind(this.renderEntries, this);
      this.renderEntry = __bind(this.renderEntry, this);
      this.listenEntries = __bind(this.listenEntries, this);
      this.listenEntry = __bind(this.listenEntry, this);
      this.showEntries = __bind(this.showEntries, this);
      this.open = __bind(this.open, this);
      this.hideOpen = __bind(this.hideOpen, this);
      this.showOpen = __bind(this.showOpen, this);
      this.setSafeContent = __bind(this.setSafeContent, this);
      this.downloadSafe = __bind(this.downloadSafe, this);
      this.setSafeMetadata = __bind(this.setSafeMetadata, this);
      this.getSafeMetadata = __bind(this.getSafeMetadata, this);
      this.pickerCb = __bind(this.pickerCb, this);
      this.pick = __bind(this.pick, this);
      this.newSafe = __bind(this.newSafe, this);
      this.getSafeReq = __bind(this.getSafeReq, this);
      this.hideNew = __bind(this.hideNew, this);
      this.showNew = __bind(this.showNew, this);
      this.hideLoad = __bind(this.hideLoad, this);
      this.showLoad = __bind(this.showLoad, this);
      this.hideAuth = __bind(this.hideAuth, this);
      this.showAuth = __bind(this.showAuth, this);
      this.checkAuth = __bind(this.checkAuth, this);
      this.auth = __bind(this.auth, this);
      this.buildPicker = __bind(this.buildPicker, this);
      this.loadPicker = __bind(this.loadPicker, this);
      this.loadDrive = __bind(this.loadDrive, this);
      this.load = __bind(this.load, this);
      this.setupPlugins = __bind(this.setupPlugins, this);
      this.error = __bind(this.error, this);
      this.initialize = __bind(this.initialize, this);
      _ref5 = App.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    App.prototype.el = ".app";

    App.prototype.events = {
      "click .auth button": function() {
        return this.auth(false, this.checkAuth);
      },
      "click .load button.new": function() {
        this.hideLoad();
        return this.showNew();
      },
      "click .new button.ok": function() {
        var name, password;
        name = this.$(".new .name").val().trim();
        password = this.$(".new .password").val();
        if (!(name && password)) {
          return;
        }
        this.hideNew();
        return this.newSafe(name, password);
      },
      "click .new button.cancel": function() {
        this.hideNew();
        return this.showLoad();
      },
      "click .load button.pick": "pick",
      "click .open button": "open",
      "click .new-entry": "newEntry",
      "click .sync": "sync",
      "click .genpass": "genPass"
    };

    App.prototype.initialize = function() {
      this.safe = new Safe({
        status: "synced"
      });
      this.safe.on("change:status", this.toggleSync);
      this.safe.entries = new SafeEntries();
      this.safe.entries.on("add", this.listenEntry).on("add", this.renderEntry).on("reset", this.listenEntries).on("reset", this.renderEntries);
      this.setupPlugins();
      return this;
    };

    App.prototype.error = function(message) {
      var $error;
      $error = this.$(".error");
      if (this.errTimeout) {
        clearTimeout(this.errTimeout);
      }
      if (message != null) {
        $error.show().find("span").text(message);
        return this.errTimeout = setTimeout(function() {
          return $error.hide();
        }, 3000);
      } else {
        return $error.hide();
      }
    };

    App.prototype.setupPlugins = function() {
      NProgress.configure({
        showSpinner: false
      });
      $(document).ajaxStart(function() {
        return NProgress.start();
      }).ajaxStop(function() {
        return NProgress.done();
      });
      return this;
    };

    App.prototype.load = function() {
      NProgress.start();
      gapi.load("auth,client", this.loadDrive);
      return this;
    };

    App.prototype.loadDrive = function() {
      gapi.client.load("drive", "v2", this.loadPicker);
      return this;
    };

    App.prototype.loadPicker = function(cb) {
      google.load("picker", "1", {
        callback: this.buildPicker
      });
      return this;
    };

    App.prototype.buildPicker = function() {
      NProgress.done();
      this.picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.DOCS).setCallback(this.pickerCb).build();
      this.auth(true, this.checkAuth);
      return this;
    };

    App.prototype.auth = function(immediate, cb) {
      gapi.auth.authorize({
        client_id: Config.clientId,
        scope: "https://www.googleapis.com/auth/drive",
        immediate: immediate
      }, cb);
      return this;
    };

    App.prototype.checkAuth = function(token) {
      if (token && !token.error) {
        this.hideAuth();
        this.showLoad();
      } else {
        this.showAuth();
      }
      return this;
    };

    App.prototype.showAuth = function() {
      this.$(".auth.section").show();
      return this;
    };

    App.prototype.hideAuth = function() {
      this.$(".auth.section").hide();
      return this;
    };

    App.prototype.showLoad = function() {
      this.$(".load.section").show();
      return this;
    };

    App.prototype.hideLoad = function() {
      this.$(".load.section").hide();
      return this;
    };

    App.prototype.showNew = function() {
      this.$(".new.section").show();
      return this;
    };

    App.prototype.hideNew = function() {
      this.$(".new.section").hide();
      return this;
    };

    App.prototype.multipartBody = function(boundary, metadata, contentType, data) {
      return "--" + boundary + "\nContent-Type: application/json\n\n" + (JSON.stringify(metadata)) + "\n--" + boundary + "\nContent-Type: " + contentType + "\nContent-Transfer-Encoding: base64\n\n" + (btoa(data)) + "\n--" + boundary + "--";
    };

    App.prototype.getSafeReq = function(method) {
      var boundary, contentType, metadata, path;
      path = "/upload/drive/v2/files";
      if (method === "PUT") {
        path += "/" + (this.safe.get("id"));
      }
      boundary = uid();
      contentType = "application/json";
      metadata = {
        title: this.safe.get("title"),
        mimeType: contentType
      };
      return gapi.client.request({
        path: path,
        method: method,
        params: {
          uploadType: "multipart"
        },
        headers: {
          "Content-Type": "multipart/mixed; boundary=" + boundary
        },
        body: this.multipartBody(boundary, metadata, contentType, this.safe.get("ciphertext"))
      });
    };

    App.prototype.newSafe = function(name, password) {
      var req;
      this.safe.entries.reset([
        {
          id: uid(20),
          title: "Example",
          url: "http://example.com",
          username: "username",
          password: "password"
        }
      ], {
        silent: true
      });
      this.safe.set({
        title: "" + name + ".safe",
        password: password
      }).update();
      req = this.getSafeReq("POST");
      req.execute(this.setSafeMetadata);
      return this;
    };

    App.prototype.pick = function() {
      this.picker.setVisible(true);
      return this;
    };

    App.prototype.pickerCb = function(data) {
      var fileId;
      switch (data[google.picker.Response.ACTION]) {
        case google.picker.Action.PICKED:
          fileId = data[google.picker.Response.DOCUMENTS][0].id;
          this.getSafeMetadata(fileId);
      }
      return this;
    };

    App.prototype.getSafeMetadata = function(fileId) {
      var req;
      req = gapi.client.drive.files.get({
        fileId: fileId
      });
      req.execute(this.setSafeMetadata);
      return this;
    };

    App.prototype.setSafeMetadata = function(metadata) {
      this.safe.set(metadata);
      this.downloadSafe();
      return this;
    };

    App.prototype.downloadSafe = function() {
      console.log("Downloading " + (this.safe.get("downloadUrl")) + "...");
      $.ajax({
        url: this.safe.get("downloadUrl"),
        type: "get",
        headers: {
          "Authorization": "Bearer " + (gapi.auth.getToken().access_token)
        }
      }).done(this.setSafeContent).fail(function() {
        return this.error("Failed to download safe");
      });
      return this;
    };

    App.prototype.setSafeContent = function(resp) {
      this.safe.set("ciphertext", JSON.stringify(resp));
      this.hideLoad();
      this.showOpen();
      return this;
    };

    App.prototype.showOpen = function() {
      this.$(".open.section").show();
      return this;
    };

    App.prototype.hideOpen = function() {
      this.$(".open.section").hide();
      return this;
    };

    App.prototype.open = function() {
      var password;
      this.error();
      password = this.$(".open input[type=password]").val();
      if (this.safe.open(password)) {
        this.hideOpen();
        this.showEntries();
      } else {
        this.error("Failed to open safe");
      }
      return this;
    };

    App.prototype.showEntries = function() {
      return this.$(".entries").show();
    };

    App.prototype.listenEntry = function(entry) {
      var safe;
      safe = this.safe;
      entry.on("change", function() {
        return safe.set("status", "needSync");
      });
      return this;
    };

    App.prototype.listenEntries = function(entries) {
      entries.each(this.listenEntry);
      return this;
    };

    App.prototype.renderEntry = function(entry) {
      if (!entry.get("trashed")) {
        this.$(".entries > ul").append(new SafeEntryView({
          model: entry,
          el: reactive(Templates.entry.cloneNode(true), entry).el
        }).$el);
      }
      return this;
    };

    App.prototype.renderEntries = function(entries) {
      entries.each(this.renderEntry);
      return this;
    };

    App.prototype.newEntry = function() {
      var entry;
      this.safe.set("status", "needSync");
      entry = new SafeEntry({
        id: uid(20),
        title: "New Entry",
        username: "",
        password: uid(40),
        url: "http://"
      });
      this.safe.entries.add(entry);
      return this;
    };

    App.prototype.toggleSync = function() {
      var status;
      status = this.safe.get("status");
      this.$(".sync").prop("disabled", status !== "needSync").find("span").text((function() {
        switch (status) {
          case "needSync":
            return "Sync";
          case "syncing":
            return "Syncing";
          case "synced":
            return "Synced";
        }
      })());
      return this;
    };

    App.prototype.sync = function() {
      var req;
      NProgress.start();
      this.safe.set("status", "syncing").update();
      req = this.getSafeReq("PUT");
      req.execute(this.updateSafeMetadata);
      return this;
    };

    App.prototype.updateSafeMetadata = function(metadata) {
      NProgress.done();
      this.safe.set(metadata);
      this.safe.set("status", "synced");
      return this;
    };

    App.prototype.genPass = function() {
      this.$(".genpass-output").text(uid(40));
      return this;
    };

    return App;

  })(Backbone.View);

  module.exports = new App();

}).call(this);
