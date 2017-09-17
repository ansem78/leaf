module.exports = {

  settings : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    key : {type : 'string',maxlength : 50,nullable : false,unique : true},
    value : {type : 'text',maxlength : 1000000000,fieldtype : 'longtext',nullable : true},
    type : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'core',validations : {isIn : [['core','site','private']]}},
    created_at : {type: 'dateTime',nullable : false},
    created_by : {type: 'string',maxlength : 24,nullable : false},
    updated_at : {type: 'dateTime',nullable : true},
    updated_by : {type: 'string',maxlength : 24,nullable : true}
  },

  users : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    name : {type : 'string',maxlength : 191,nullable : false},
    slug : {type : 'string',maxlength : 191,nullable : false,unique : true},
    email : {type : 'string',maxlength : 191,nullable : false,unique : true,validations : {isEmail : true}},
    password : {type : 'string',maxlength : 60,nullable : false},
    bio : {type : 'text',maxlength : 65535,nullable : true},
    url : {type : 'string',maxlength : 2000,nullable : true,validations : {isEmptyOrURL : true}},
    location : {type : 'text',maxlength : 65535,nullable : true},
    language : {type : 'string',maxlength : 6,nullable : false,defaultTo : 'en_US'},
    status : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'active'},
    avatar : {type : 'string',maxlength : 2000,nullable : false},
    role : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'author',validations : {isIn : [['author','editor','admin','owner']]}},
    last_seen : {type : 'dateTime',nullable : true},
    created_at : {type : 'dateTime',nullable : false},
    created_by : {type : 'string',maxlength : 24,nullable : false},
    updated_at : {type : 'dateTime',nullable : true},
    updated_by : {type : 'string',maxlength : 24,nullable : true}
/*
    auth_access_token : {type : 'string',maxlength : 32,nullable : true},
    auth_id : {type : 'string',maxlength : 24,nullable : true},
    facebook : {type : 'string',maxlength : 2000,nullable : true},
    twitter : {type : 'string',maxlength : 2000,nullable : true},
    visibility : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'public',validations : {isIn : [['public']]}},
    meta_title : {type : 'string',maxlength : 2000,nullable : true},
    meta_description : {type : 'string',maxlength : 2000,nullable : true},
*/
  },

  invites : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    role : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'author',validations : {isIn : [['author','editor','admin']]}},
    token : {type : 'string',maxlength : 191,nullable : false,unique : true},
    email : {type : 'string',maxlength : 191,nullable : false,unique : true,validations : {isEmail : true}},
    expires : {type : 'bigInteger',nullable : false},
    created_at : {type : 'dateTime',nullable : false},
    created_by : {type : 'string',maxlength : 24,nullable : false},
    updated_at : {type : 'dateTime',nullable : true},
    updated_by : {type : 'string',maxlength : 24,nullable : true}
/*
    status : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'pending',validations : {isIn : [['pending','sent']]}},
*/
  },

  posts : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    title : {type : 'string',maxlength : 2000,nullable : false},
    slug : {type : 'string',maxlength : 191,nullable : false,unique : true},
    markdown : {type : 'text',maxlength : 1000000000,fieldtype : 'longtext',nullable : true},
    html : {type : 'text',maxlength : 1000000000,fieldtype : 'longtext',nullable : true},
    text : {type : 'text',maxlength : 1000000000,fieldtype : 'longtext',nullable : true},
    author_id : {type : 'string',maxlength : 24,nullable : false},
    featured : {type : 'boolean',nullable : false,defaultTo : false},
    page : {type : 'boolean',nullable : false,defaultTo : false},
    image : {type : 'string',maxlength : 2000,nullable : true},
    meta_title : {type : 'string',maxlength : 2000,nullable : true},
    meta_description : {type : 'string',maxlength : 2000,nullable : true},
    status : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'draft'},
    language : {type : 'string',maxlength : 6,nullable : false,defaultTo : 'en_US'},
    created_at : {type : 'dateTime',nullable : false},
    created_by : {type : 'string',maxlength : 24,nullable : false},
    updated_at : {type : 'dateTime',nullable : true},
    updated_by : {type : 'string',maxlength : 24,nullable : true},
    published_at : {type : 'dateTime',nullable : true},
    published_by : {type : 'string',maxlength : 24,nullable : true}

/*
    uuid : {type : 'string',maxlength : 36,nullable : false,validations : {isUUID : true}},
    mobiledoc : {type : 'text',maxlength : 1000000000,fieldtype : 'long',nullable : true},
    amp : {type : 'text',maxlength : 1000000000,fieldtype : 'long',nullable : true},
    visibility : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'public',validations : {isIn : [['public']]}},
*/
  },

  tags : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    name : {type : 'string',maxlength : 191,nullable : false,unique : true,validations : {matches : /^([^,]|$)/}},
    slug : {type : 'string',maxlength : 191,nullable : false,unique : true},
    description : {type : 'text',maxlength : 65535,nullable : true},
    image : {type : 'string',maxlength : 2000,nullable : true},
    meta_title : {type : 'string',maxlength : 2000,nullable : true},
    meta_description : {type : 'string',maxlength : 2000,nullable : true},
    created_at : {type : 'dateTime',nullable : false},
    created_by : {type : 'string',maxlength : 24,nullable : false},
    updated_at : {type : 'dateTime',nullable : true},
    updated_by : {type : 'string',maxlength : 24,nullable : true}
/*
    parent_id : {type : 'string',nullable : true},
    visibility : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'public',validations : {isIn : [['public','internal']]}},
*/
  },

  links : {
    id : {type : 'string',maxlength : 24,nullable : false,primary : true},
    name : {type : 'string',maxlength : 191,nullable : false,unique : true},
    slug : {type : 'string',maxlength : 191,nullable : false,unique : true},
    url : {type : 'string',maxlength : 2000,nullable : false,unique : true},
    type : {type : 'string',maxlength : 50,nullable : false,defaultTo : 'nav',validations : {isIn : [['nav','share']]}},
    position : {type : 'integer',nullable : false,defaultTo : 0,validations : {isInt : {min : 0}}},
    created_at : {type : 'dateTime',nullable : false},
    created_by : {type : 'string',maxlength : 24,nullable : false},
    updated_at : {type : 'dateTime',nullable : true},
    updated_by : {type : 'string',maxlength : 24,nullable : true}
  }

};
