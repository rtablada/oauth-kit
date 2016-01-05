module.exports = function(OAuthAccessTokensModel, OAuthRefreshTokensModel, OAuthClientsModel, User) {
  return {
    getAccessToken(bearerToken, callback) {
      console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

      OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback);
    },

    getClient(clientId, clientSecret, callback) {
      console.log(`in getClient (clientId: ${clientId})`);
      if (clientSecret === null) {
        return OAuthClientsModel.findOne({ clientId: clientId }, callback);
      }

      OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
    },

    grantTypeAllowed(clientId, grantType, callback) {
      if (grantType === 'password') {
        return callback(false, true);
      }

      callback(false, true);
    },

    saveAccessToken(token, clientId, expires, userId, callback) {
      userId = userId.id || userId;
      console.log(`in saveAccessToken (userId: ${userId})`);

      var accessToken = new OAuthAccessTokensModel({
        accessToken: token,
        clientId: clientId,
        expires: expires,
        user: userId,
      });

      accessToken.save(callback);
    },

    getUser(username, password, callback) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return callback(err);
        }

        if (!user) {
          return callback('Password does not match');
        }

        user.checkPassword(password, function() {
          return callback(null, user);
        },

        function() {
          return callback('Password does not match');
        });
      });
    },

    saveRefreshToken(token, clientId, expires, userId, callback) {
      userId = userId.id || userId;
      console.log(`in saveRefreshToken (userId: ${userId})`);

      var refreshToken = new OAuthRefreshTokensModel({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires,
      });

      refreshToken.save(callback);
    },

    getRefreshToken(refreshToken, callback) {
      console.log(`in getRefreshToken (refreshToken: ${refreshToken})`);

      OAuthRefreshTokensModel.findOne({ refreshToken: refreshToken }, callback);
    },
  };
};
