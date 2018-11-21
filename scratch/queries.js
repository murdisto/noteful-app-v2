'use strict';

const knex = require('../knex');

let searchTerm = 'barque';

// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('content', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });


let id = 2;
// knex
//   .select('id', 'title', 'content')
//   .from('notes')
//   .where('id', `${id}`)
//   .then(([note]) => {
//     console.log(JSON.stringify(note, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

knex
  .from('notes')
  .update({title: 'unique', content: 'this is unique content' })
  .where('id', `${id}`)
  .returning('*')
  .then(([note]) => {
    //console.log(note);
    console.log(JSON.stringify(note, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

// let newItem;
// knex
//   .insert({
//     'title': 'Wubba Lubba Dub Dub',
//     'content': 'I am in great pain'
//   })
//   .into('notes')
//   .then((note) => {
//     console.log(JSON.stringify(note));
//   })
//   .catch(err => {
//     console.error(err);
//   });


// knex
//   .from('notes')
//   .where('id', 9)
//   .del()
//   .then(result => {
//     console.log(JSON.stringify(result));
//   })
//   .catch(err => {
//     console.error(err);
//   });
