'use strict';
const async = require('async');

module.exports = function(Note) {
  /**
    * Updates the date of notes in bulk.
    * Example format: [{"id": 1, "date": '2017-06-02'}, {"id": 2, "date": '2017-06-02'}]
    * @param {array} updatedDates Contains the notes that must be updated.
    * @param {Function(Error, Note)} callback
    */

  Note.updateDatesInBulk = function(updatedDates, cb) {
    // Update the attribute.
    let note = this;

    async.map(updatedDates, (note, mapCb) => {
      Note.findById(note.id, (err, instance) => {
        if (err) {
          return mapCb(err);
        }

        // Update the startTime attribute.
        instance.updateAttribute('date', note.date,
        (err, updatedInstance) => {
          if (err) {
            return mapCb(err);
          }

          mapCb(null, updatedInstance);
        });
      });
    }, (err, response) => {
      // Handle errors from the loop sequence
      if (err) {
        return cb(err);
      }
      cb(null, response);
    });
  };
};
