const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db("recipes");
}

function findById(id) {
  return db("recipes").where({ id }).first();
}

function add(scheme) {
  return db("recipes")
    .insert(scheme, "id")
    .then((ids) => {
      const id = ids[0];
      return findById(id);
    });
}

function update(changes, id) {
  return db("recipes")
    .where({ id })
    .update(changes)
    .then((count) => {
      return findById(id);
    });
}

function remove(id) {
  const objToDelete = findById(id).then((item) => item);

  return db("recipes")
    .where({ id })
    .delete()
    .then((count) => {
      return objToDelete;
    });
}
