# OAuth Kit

This is a set of reasonable defaults for working with OAuth2-Server and Mongoose for APIs.

This provides a `model` configuration definition for `OAuth2-Server` as well as Mongoose schemas to get projects started.

## Installing

To install `oauth-kit`, run:

```shell
npm install --save oauth-kit
```

## Use

To use Oauth Kit, we can have an `app.js` that looks a bit like this:

```js
var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/token-ideas');

var User = mongoose.model('User', require('oauth-kit/models/user'));
var Client = mongoose.model('OauthClient', require('oauth-kit/models/client'));
var AccessToken = mongoose.model('OauthAccessToken', require('oauth-kit/models/access-token'));
var RefreshToken = mongoose.model('OauthAccessRefreshToken', require('oauth-kit/models/access-refresh-token'));

var app = express();
var oauthModel = require('oauth-kit')(AccessToken, RefreshToken, Client, User);

app.oauth =  require('oauth2-server')({model: oauthModel});

app.use(app.oauth.grant());
```
