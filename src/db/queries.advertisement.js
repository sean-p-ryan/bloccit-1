const Advertisement = require("./models").Advertisement;

module.exports = {

    //#1
    getAllAds(callback) {
        return Advertisement.all()

            //#2
            .then((ads) => {
                callback(null, ads);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getAd(id, callback) {
        return Advertisement.findById(id)
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },
    addAdvertisement(newAd, callback) {
        return Advertisement.create({
            title: newAd.title,
            description: newAd.description
        })
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },
    deleteAd(id, callback){
        return Advertisement.destroy({
          where: {id}
        })
        .then((ad) => {
          callback(null, ad);
        })
        .catch((err) => {
          callback(err);
        })
    },
    updateTopic(id, updatedAd, callback){
        return Advertisement.findById(id)
        .then((ad) => {
          if(!ad){
            return callback("Topic not found");
          }

          ad.update(updatedAd, {
            fields: Object.keys(updatedAd)
          })
          .then(() => {
            callback(null, ad);
          })
          .catch((err) => {
            callback(err);
          });
        });
      }
}