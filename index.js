#!/usr/bin/env node

"use strict";

var url = require("url");

var parse = require("pg-connection-string").parse;

if (process.env.DATABASE_URL) {
  var uri = url.parse(process.env.DATABASE_URL);

  if (uri.protocol === "postgres:") {
    var cfg = parse(process.env.DATABASE_URL),
        env = {};

    env.PGHOST = cfg.host;
    env.PGPORT = cfg.port;
    env.PGDATABASE = cfg.database;
    env.PGUSER = cfg.user;
    env.PGPASSWORD = cfg.password;

    env.PGSSLMODE = cfg.ssl ? "require" : "";
    env.PGAPPNAME = cfg.application_name;
    env.PGCLIENTENCODING = cfg.client_encoding;

    // TODO other options from cfg that match
    // http://www.postgresql.org/docs/9.3/interactive/libpq-envars.html

    Object.keys(env)
      .filter(function(k) {
        return !!env[k];
      })
      .forEach(function(k) {
        console.log("%s=%s", k, env[k]);
      });
  }
}

