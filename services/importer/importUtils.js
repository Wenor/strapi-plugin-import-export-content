const { ID_ATTRIBUTE } = require("../../constants/contentTypes");

const importToCollectionType = async (uid, item, allowUpdate) => {
  try {
    const id = item[ID_ATTRIBUTE];
    if (allowUpdate && id) {
      const existing = await strapi.query(uid).find({ [ID_ATTRIBUTE]: id });
      if (existing.length > 0) {
        const params = { [ID_ATTRIBUTE]: id };
        await strapi.entityService.update({ data: item, params }, { model: uid });
        return true;
      }
    }
    await strapi.entityService.create({ data: item }, { model: uid });
    return true;
  } catch (error) {
    console.error(err);
    return false;
  }
};

const importToSingleType = async (uid, item) => {
  try {
    const existing = await strapi.query(uid).find({});
    if (existing.length > 0) {
      const { id } = existing[0];
      delete item.created_by;
      await strapi.query(uid).update({ id }, item);
    } else {
      strapi.query(uid).create(item);
    }
    return [true];
  } catch (error) {
    return [false];
  }
};

module.exports = {
  importToCollectionType,
  importToSingleType,
};
