import * as yup from 'yup';
//validation schema for the yup library

export const DepartmentSchema=yup.object().shape({
    department:yup.string().required("Department Required")
})

export const AddRoleformSchema=yup.object().shape({
    department:yup.string().required("Department Required"),
    role:yup.string().required("Role Required")
})

//Schema for KPI form
export const AddKpiFormSchema=yup.object().shape({
    description:yup.string().required("Deacription Required"),
    weight:yup.number("Weight must be number").required("Weight Required"),
    department:yup.string().required("Department Required "),
    role:yup.string().required("Role Required")
 })

 export const LoginAsAdminSchema=yup.object().shape({
    username:yup.string().required("Username Required"),
    password:yup.string().required("Password Required")

 })


  //Yup validation
  export const AddEmployeeFormSchema = yup.object().shape({
    firstName: yup.string().required("First Name Required"),
    lastName: yup.string().required("Last Name Required"),
    email: yup
      .string()
      .email("Invalid Email")
      .matches(
        /@tekditechnologies\.com$/,
        "Email must end with @tekditechnologies.com"
      )
      .required("Email Required"),
    department: yup.string().required("Department Required"),
    role: yup.string().required("Role Required"),
  });
