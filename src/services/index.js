const UserService = require("./user.service.js");
const DbService = require("./db.service.js");
const StudentService = require("./student.service.js");
const TutorService = require("./tutor.service.js");
const MusicianService = require("./musician.service.js");
const OrganizationService = require("./organization.service.js");
const ForumService = require('./forum.service.js');
module.exports = {
  UserService,
  StudentService,
  TutorService,
  MusicianService,
  OrganizationService,
  DbService,
  ForumService
};
