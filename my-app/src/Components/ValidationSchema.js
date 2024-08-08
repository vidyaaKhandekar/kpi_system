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
 export const AddEmployeeFormSchema=yup.object().shape({
    name:yup.string().required("name is required field"),
    email:yup.string().email("Invalid Email").matches(/@tekditechnologies\.com$/, 'Email must end with @tekditechnologies.com').required("Email is required"),
    department:yup.string().required("Department is required field"),
    role:yup.string().required("role is required field")
 })
 //name, email, roleId, deptId