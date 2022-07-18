import React from 'react'
import "./Forms.css"
import { useRef,useState } from 'react';

import { useFormik } from 'formik';
import * as yup from "yup"
import { BlockUI } from 'primereact/blockui';
import {Panel} from 'primereact/panel'
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';
function Forms() { 
  
   let [SubmittedData,SetSubmitData]=useState()
   let [DisplayDialog,SetDisplayDialog]=useState(false)
    
  
   const toast = useRef(null)
   const msgs1 = useRef(null);

   const onHide = (name) => {
    console.log(name); 
    SetDisplayDialog(false);
    window.location.href=""
   
    
}

const renderFooter = (name) => {
    return (
        <div>
          
            <Button label="Ok" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
        </div>
    );
}

  
   
  const LoginFormik = useFormik({
    initialValues:{
      "Username":"", 
      "Password":""
    }, 
    validationSchema:yup.object({
      Username:yup.string().required("UserName is Required").min(1,"Min Length Should be 1").max(30,"Max Length exceed").trim().matches(/^\S/,"Please Enter Valid Format"), 
      Password:yup.string().required("Password is Required").max(20,"Max length exceeded should be less than 20").trim().matches(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{10,16}$/,"password should contain atleast one uppercase,one digit,one special characters")
    }), 

    onSubmit : (LoginFormData)=>{ 
      SubmittedData =LoginFormData 
      SetSubmitData(SubmittedData)
     
      
      

      console.log(SubmittedData)
       
      toast.current.show({severity: 'success', summary: 'Profile Detail', detail: 'Login Data Successful'});

      msgs1.current.show({severity: 'success', summary: 'Login Data Submitted', 
          detail: 'Login Data Successful'}); 

          SetDisplayDialog(true); 


    }
  })

 
  return ( 
    <div className='outer'>
    <h2 className='text-center card-header bg-warning'>React Forms Handling</h2> 
  
    <div className='maindiv card-footer'>
   
    <Toast ref={toast}></Toast>
    <Messages ref={msgs1} />
    <form className='logform bg-light' onSubmit={LoginFormik.handleSubmit}>
     <h2 className='text-center card-footer  formtitle'>Login Form</h2>
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">User Name</label>
    <input type="text" className="form-control" id="username" name="Username" autoComplete='off' style={{
      border : LoginFormik.errors.Username ? '2px solid red' : '1px solid blue'
    }}
     aria-describedby="emailHelp" onChange={LoginFormik.handleChange} value={LoginFormik.values.Username} placeholder="Enter your username"/> 
     {
      LoginFormik.errors.Username? <h4 id="emailHelp" className="form-text  text-danger card-footer">{LoginFormik.errors.Username}</h4>:null 
     }
   
  </div> 

  <div className="form-group">
  <label htmlFor="exampleInputPassword1">Password</label>
  <input type="password" className="form-control" id="password" name="Password" autoComplete='off' style={{
    border : LoginFormik.errors.Password ? '2px solid red' : '1px solid blue'
  }}
  onChange={LoginFormik.handleChange} value={LoginFormik.values.Password} placeholder="Enter your last name"/> 
  {
    LoginFormik.errors.Password? <h5 id="emailHelp" className="form-text  text-danger card-footer">{LoginFormik.errors.Password}</h5>:null 
  }
</div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form> 

 {DisplayDialog && <Dialog header="Your Submitted Details" visible={DisplayDialog} style={{ width: '50vw' }} 
  footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}> 

  <BlockUI >
  <Panel header="Profile Informations">
   
          <div>

         <div className='item flex-lg-row card-footer'>
           <h3 className=''>User Name : </h3>
           <h4 className='res'>{SubmittedData.Username}</h4>
          
         </div> 

         <div className='item flex-lg-row card-footer'>
         <h3 className=''>Password : </h3>
         <h4 className='res'>{SubmittedData.Password}</h4>
      
       </div>  

    

       </div>
     
       
       
     
  </Panel> 

</BlockUI>
 
</Dialog>
 }

    </div>
    </div>
  )
}

export default Forms