import * as yup from 'yup';
//validation schema for the yup library

export const DepartmentSchema=yup.object().shape({
    department:yup.string().required("required Field")
})
/*
error={formik.errors.department?true:false} 
                label={formik.errors.department?"department is required field":""} 
*/
export const AddDepartment=yup.object().shape({
    
})
