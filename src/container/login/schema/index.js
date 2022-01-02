export const formData = {
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
        type: "min",
        params: [5, "email cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [10, "email cannot be more than 10 characters"]
      },
      {
        type: "email",
        params: ["please enter a valid email"]
      }
    ]
  },
  password: {
    id: "password",
    label: "Password",
    disable: false,
    placeholder: "Enter Password",
    type: "password",
    validationType: "string",
    value: "",
    targetValue: 'password.value',
    required: true,
    validations: [
      {
        type: "required",
        params: ["this field is required"]
      },
      {
        type: "min",
        params: [5, "email cannot be less than 5 characters"]
      },
      {
        type: "max",
        params: [10, "email cannot be more than 10 characters"]
      }
    ]
  }
};