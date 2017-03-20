var mongoose = require('mongoose');

module.exports = mongoose.model('Mood', {
  display: Boolean,
  name: String,
  name_en: String,
  slug: String,
  description: String,
  schedule: String,
  moodcolor: String,
  gifpath: String,
  imagepath: String,
  logopath: String,
  bannerpath: String,
  website: String,
  facebook: String,
  instagram: String,
  text: String,
  moodtype: String
});