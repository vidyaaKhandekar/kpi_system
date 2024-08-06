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
