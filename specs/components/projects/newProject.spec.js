const accountTypesObject = {
    email: joi.string(),
    name: joi.string().required(),
    category: joi.string(),
    type: joi.string(),
    style: joi.string(),
    startDate: joi.number(),
    endDate: joi.number(),
    // TODO  ask about rules of victory
    victoryRules: joi.string(),
    isPrizeFund: joi.boolean(),
    isMoneyBack: joi.boolean(),
    details: joi.object(),
    projectOptions: joi.array(),
};

const projectFields = {
  email: "test@t.com",
  name: "Project1",
  category: "RENOVATION",
  type: "Type1",
  style: "Style1",
  startDate: 12092020,
  endDate: 12102020,
  victoryRules: "Some rules",
  isPrizeFund: true,
  isMoneyBack: false,
  projectOptions: [2,3]
};

const projectEmptyFields = {
  email: "",
  name: "",
  category: "",
  type: "",
  style: "",
  startDate: null,
  endDate: null,
  victoryRules: "",
  isPrizeFund: false,
  isMoneyBack: false,
  projectOptions: []
};


describe.only('Projects request', () => {

  context('POST', () => {

    frisby.create('Should send correct response')
      .config(frisbyConfig)
      .addHeader('Access-Token', TEST_CUSTOMER_TOKEN)
      .post('/projects', projectFields)
      .expectStatus(201)
      // .expectJSONTypes(accountTypesObject)
      .toss();

    frisby.create('Should send access error')
      .config(frisbyConfig)
      .addHeader('Access-Token', TESTS_USER_TOKEN)
      .post('/projects', projectFields)
      .expectStatus(403)
      .toss();

    frisby.create('Should return error due to empty fields')
      .config(frisbyConfig)
      .addHeader('Access-Token', TEST_CUSTOMER_TOKEN)
      .post('/projects', projectEmptyFields)
      .expectStatus(400)
      .toss();
  });
});