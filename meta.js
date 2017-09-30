module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "demo": {
      "type": "confirm",
      "message": "Init demo?"
    },
    "demoConfig": {
       "when": "demo",
       "type": "list",
       "message": "Pick an UI on the mobile or PC side",
       "choices": [
         {
           "name": "PC(element-ui)",
           "value": "PC",
           "short": "PC"
         },
         {
           "name": "Mobile(mint-ui)",
           "value": "Mobile",
           "short": "Mobile"
         }
       ]
    }
  },
  "filters": {
    "src/views/demo/*": "demo",
    "src/views/login/*": "demo",
    "src/views/main/*": "demo",
    "src/views/test/*": "demo",
    "src/mock/*": "demo"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
