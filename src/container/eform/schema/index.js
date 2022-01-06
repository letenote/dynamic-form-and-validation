export const diagnoseFormSchema = {
  diagnose: {
    id: "diagnose",
    label: "diagnose",
    disable: false,
    placeholder: "Enter diagnose",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'diagnose.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      }
    ]
  },
  date: {
    id: "date",
    label: "date",
    disable: true,
    placeholder: "Enter date",
    type: "date",
    validationType: "date",
    value: "",
    targetValue: 'date.value',
    required: false,
    validations: [
      // {
      //   type: "required",
      //   params: ["this field is required"]
      // }
    ],
    validationConditions: [
      {
        type: "when",
        ref: "diagnose",
        is: (diagnose) => diagnose.value && diagnose.value !== '',
        then: {
          type: "required",
          validationType: "date",
          params: ["field is required because you assign diagnose"]
        }
      }
    ]
  }
}

export const accidentFormSchema = {
  accident: {
    id: "accident",
    label: "accident",
    disable: false,
    placeholder: "Enter accident",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'accident.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      },
      {
        type: "min",
        params: [5, "cant be less than 5 chars"]
      },
      {
        type: "max",
        params: [10, "cant be more than 10 chars"]
      }
    ]
  },
  date: {
    id: "date",
    label: "date",
    disable: false,
    placeholder: "Enter date",
    type: "date",
    validationType: "string",
    value: "",
    targetValue: 'date.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      }
    ]
  },
  doctorName: {
    id: "doctorName",
    label: "doctorName",
    disable: true,
    placeholder: "Enter doctorName",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'doctorName.value',
    required: false,
    validations: [
      {
        type: "min",
        params: [5, "cant be less than 5 chars"]
      },
      {
        type: "max",
        params: [10, "cant be more than 10 chars"]
      }
    ],
    validationConditions: [
      {
        type: "when",
        ref: ["accident", "date"],
        is: (accident, date) => {
          // console.log('qwer', accident, date)
          return accident.value && 
          accident.value !== '' &&
          date.value && 
          date.value !== ''
        },
        then: {
          type: "required",
          validationType: "string",
          params: ["DC: this field is required"]
        }
      }
    ]
  },
};

export const formSchema = {
  firstName: {
    id: "firstName",
    label: "First name",
    disable: false,
    placeholder: "Enter first name",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'firstName.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      },
      {
        type: "min",
        params: [5, "first name cant be less than 5 characters"]
      },
      {
        type: "max",
        params: [70, "first name cant be more than 10 characters"]
      }
    ],
  },
  lastName: {
    id: "lastName",
    label: "Last name",
    disable: true,
    placeholder: "Enter last name",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'lastName.value',
    required: false,
    validations: [
      {
        type: "min",
        params: [5, "last name cant be less than 5 characters"]
      },
      {
        type: "max",
        params: [90, "last name cant be more than 10 characters"]
      }
    ],
    validationConditions: [
      {
        type: "when",
        ref: "firstName",
        is: (firstName) => firstName.value && firstName.value !== '',
        then: {
          type: "required",
          validationType: "string",
          params: ["C: this field is required because you assign firstname"]
        }
      },
    ]
  },
  fruit: {
    id: "fruit",
    label: "fruit",
    disable: false,
    placeholder: "Chose Fruit",
    type: "select",
    validationType: "string",
    value: "",
    targetValue: 'fruit.value',
    required: true,
    options: [
      {
        label: "Apple",
        value: "apple",
      },
      {
        label: "Mango",
        value: "mango",
      },
      {
        label: "Banana",
        value: "banana",
      },
      {
        label: "Pineapple",
        value: "pineapple",
      },
    ],
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      }
    ]
  },
  email: {
    id: "email",
    label: "Email",
    disable: true,
    placeholder: "Enter email",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'email.value',
    required: false,
    validations: [
      // {
      //   type: "required",
      //   params: ["this field is required"]
      // },
      {
        type: "email",
        params: ["please enter a valid email"]
      }
    ],
    validationConditions: [
      {
        type: "when",
        ref: "fruit",
        is: (fruit) => fruit.value && fruit.value !== '',
        then: {
          type: "required",
          validationType: "string",
          params: ["C: this field is required because you chose fruit"]
        }
      }
    ]
  },
  date: {
    id: "date",
    label: "date",
    disable: false,
    placeholder: "Enter date",
    type: "date",
    validationType: "date",
    value: "",
    targetValue: 'date.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      }
    ]
  },
  hobi: {
    id: "hobi",
    label: "hobi",
    disable: true,
    placeholder: "Enter hobi",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'hobi.value',
    required: false,
    validations: [
    ],
    validationConditions: [
      {
        type: "when",
        ref: "date",
        is: (date) => date.value && date.value !== '',
        then: {
          type: "required",
          validationType: "string",
          params: ["C: this field is required because you assign date"]
        }
      }
    ]
  },
  diagnoses: [ diagnoseFormSchema ],
  accidents: [ accidentFormSchema ],
};