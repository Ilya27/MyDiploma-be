const accountTypesObject = {
    _id: joi.number(),
    email: joi.string(),
    name: joi.string(),
    category: joi.string(),
    type: joi.string(),
    style: joi.string(),
    startDate: joi.number(),
    endDate: joi.number(),
    victoryRules: joi.string(),
    isPrizeFund: joi.boolean(),
    isMoneyBack: joi.boolean(),
    details: joi.array(),
    __v: joi.number(),
};


describe.only('Projects', () => {

  context('POST', () => {

    frisby.create('Should be -----')
      .config(frisbyConfig)
      .post('/projects', {
        "owner": 2,
        "email": "test@t.com",
        "name": "Project1",
        "category": "RENOVATION",
        "type": "Type1",
        "style": "Style1",
        "startDate": 12092020,
        "endDate": 12102020,
        "status": "BRIEFING",
        "paymentStatus": "WAIT",
        "paymentAmount": 1000,
        "victoryRules": "Some rules",
        "isPrizeFund": true,
        "isMoneyBack": false,
        "details": [],
      })
      .expectStatus(201)
      .expectJSONTypes(accountTypesObject)
      .toss();
  });
});