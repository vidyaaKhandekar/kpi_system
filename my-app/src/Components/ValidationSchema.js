import * as yup from 'yup';
//validation schema for the yup library

export const DepartmentSchema=yup.object().shape({
    department:yup.string().required("required Field")
})
/*
error={formik.errors.department?true:false} 
                label={formik.errors.department?"department is required field":""} 
*/
export const AddRoleformSchema=yup.object().shape({
    department:yup.string().required("Department is required field"),
    role:yup.string().required("role is required field")
})

//Schema for KPI form
export const AddKpiFormSchema=yup.object().shape({
    description:yup.string().required("required field"),
    weight:yup.number("Weight must be number").required("Required Field"),
    department:yup.string().required("Department is required field"),
    role:yup.string().required("role is required field")
 })

 export const LoginAsAdminSchema=yup.object().shape({
    username:yup.string().required("Username required"),
    password:yup.string().required("Password Required")

 })


  //Yup validation
  export const AddEmployeeFormSchema = yup.object().shape({
    firstName: yup.string().required("name is required field"),
    lastName: yup.string().required("name is required field"),
    email: yup
      .string()
      .email("Invalid Email")
      .matches(
        /@tekditechnologies\.com$/,
        "Email must end with @tekditechnologies.com"
      )
      .required("Email is required"),
    department: yup.string().required("Department is required field"),
    role: yup.string().required("Role is departmentrequired"),
  });
