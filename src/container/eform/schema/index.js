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
    type: "text",
    validationType: "string",
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
          validationType: "string",
          params: ["DC: this field is required"]
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
        params: [5, "first name cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [10, "first name cannot be more than 10 characters"]
      }
    ]
  },
  date: {
    id: "date",
    label: "date",
    disable: false,
    placeholder: "Enter date",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'date.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      },
      {
        type: "min",
        params: [5, "first name cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [10, "first name cannot be more than 10 characters"]
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
      // {
      //   type: "required",
      //   params: ["this field is required"]
      // },
      {
        type: "min",
        params: [5, "first name cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [10, "first name cannot be more than 10 characters"]
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
        params: [5, "first name cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [70, "first name cannot be more than 10 characters"]
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
        params: [5, "last name cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [90, "last name cannot be more than 10 characters"]
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
          params: ["C: this field is required"]
        }
      },
      {
        type: "when",
        ref: "email",
        is: (email) => email.value && email.value !== '',
        then: {
          type: "required",
          validationType: "string",
          params: ["DC: this field is required"]
        }
      }
    ]
  },
  email: {
    id: "email",
    label: "Email",
    disable: false,
    placeholder: "Enter email",
    type: "text",
    validationType: "string",
    value: "",
    targetValue: 'email.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      },
      {
        type: "email",
        params: ["please enter a valid email"]
      }
    ]
  },
  diagnoses: [ diagnoseFormSchema ],
  // accidents: [ accidentFormSchema ],
};