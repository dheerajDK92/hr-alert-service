const Joi = require("@hapi/joi");

const AddAssetValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    assetName: Joi.string().required(),
    assetCategory: Joi.string().required(),
    assetPrice: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = {
  AddAssetValidation,
};
