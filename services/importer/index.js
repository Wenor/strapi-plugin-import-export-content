const {
  COLLECTION_TYPE,
  SINGLE_TYPE,
} = require("../../constants/contentTypes");
const { importToCollectionType, importToSingleType } = require("./importUtils");

function importContent(target, items, options, allowUpdate) {
  const { uid, kind } = target;
  switch (kind) {
    case COLLECTION_TYPE:
      return Promise.all(
        items.map((item) =>
          importToCollectionType(uid, {
            ...item,
            ...options,
          }, allowUpdate)
        )
      );

    case SINGLE_TYPE:
      return importToSingleType(uid, {
        ...items[0],
        ...options,
      });

    default:
      throw new Error("Tipe is not supported");
  }
}

module.exports = {
  importContent,
};
