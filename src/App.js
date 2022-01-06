import "./App.css";
// import Login from './container/login';
// const App = () => <Login/>
// import Eform from './container/eform';
// const App = () => <Eform/>
import Select from "./components/form/select";
import Autocomplete from "./components/form/autocomplete";
const App = () => (
  <div style={{ padding: 50 }}>
    <Autocomplete />
    <Select
      label={"Pick your favorite"}
      disable={false}
      required={true}
      value={"pineapple"}
      placeholder={"select fruits.."}
      validation={{
        isError: false,
        isTouched: true,
        message: "field is required !",
      }}
      options={[
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
      ]}
    />
  </div>
);
//
// const App = () => {
//   return(
//     <div style={{ padding: 50 }}>
//       <Select
//         label={'Pick your favorite'}
//         disable={false}
//         required={true}
//         value={'pineapple'}
//         placeholder={'select fruits..'}
//         validation={{
//           isError: false,
//           isTouched: true,
//           message: "field is required !"
//         }}
//         options={[
//           {
//             label: "Apple",
//             value: "apple",
//           },
//           {
//             label: "Mango",
//             value: "mango",
//           },
//           {
//             label: "Banana",
//             value: "banana",
//           },
//           {
//             label: "Pineapple",
//             value: "pineapple",
//           },
//         ]}
//       />
//     </div>
//   )
// }

export default App;
