import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Elements, FrontendComponents } from "../../components";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { InputMask } from 'primereact/inputmask';
import {  useNavigate } from "react-router-dom";
import './inputs.scss'
import { Zustand } from "../../libs";


const schema = yup.object({
    username: yup.string().required("El nombre es requerido"),
    email: yup.string().email('Debe ser un correo valido').required("El correo es requerido"),
    phone: yup.string().required("El teléfono es requerido"),
    indentification: yup.string().required("La identificación es requerida"),
    newpassword: yup.string().required("La contraseña es requerida"),
    confirmPass: yup
    .string()
    .oneOf([yup.ref("newpassword")], "Las contraseñas no coinciden").required("Confirme la contraseña"),
}).required();

// eslint-disable-next-line react/prop-types
const Greetings = ({name})=>{return(<div className="text-center"><h3 className="text-3xl font-bold">Gracias por registrarte {name}</h3> <h4 className="text-xl font-semibold">Presione el boton abajo para entrar a su cuenta</h4></div>)}
const Footer = ()=>{
    const {setAuthModal} = Zustand.useStore()
    const navigate = useNavigate(); 
    const onClick = ()=>{
        navigate('/profile')
        setAuthModal({open:false})
    }  
    return( <div className="flex justify-content-center"><button className="px-4 py-2 text-white duration-300 bg-primary hover:bg-secondary" onClick={onClick}>Aceptar</button></div> )
}

export default function Register(){

    const {setAuthModal,setIsLogin,setUserData,isLogin,setIsAdmin} = Zustand.useStore()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

      const onSubmit = (data) =>{
        console.log(data)
        console.log(errors);
        setIsLogin(true)
        const {username, email, phone, indentification} = data
        setUserData({username, email, phone, indentification,role:'admin'})
        setIsAdmin('admin')
        setAuthModal({open:true, content:<Greetings name={data.username} />, title:"Usuario creado",setOpen:()=>{setAuthModal({open:false})},footer:<Footer />})
      }

      useEffect(()=>{
          if (isLogin) {
            navigate('/profile')
          }
      },[])

    return (
       <>
        <Helmet>
            <title>PFServicios | Registrarse</title>
        </Helmet>
        <FrontendComponents.Layout.AuthLayout bgBackground="/register.jpg"> 
            <Elements.CardComponent title={<h1 className="text-center">Registrarse</h1>} subtitle="" >
                <Divider />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="container flex flex-col gap-4 md:flex-row">
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel className="flex flex-col w-full gap-2">
                            <label htmlFor="username">Nombre</label>
                            <InputText id="username" {...register("username")} placeholder="Ej. Juan Pérez" />
                            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                        </FloatLabel>
                        </div>
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel  className="flex flex-col w-full gap-2">
                            <label htmlFor="email">Correo</label>
                            <InputText id="email" {...register("email")} placeholder="Ej. juan@pfservicios" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </FloatLabel>
                        </div>
                    </div>
                    <div className="container flex flex-col gap-4 md:flex-row">
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel className="flex flex-col w-full gap-2">
                            <label htmlFor="phone">Nombre</label>
                            <InputMask id="phone" {...register("phone")}  mask="+58999-999-9999" placeholder="Ej. +58000-000-0000" />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                        </FloatLabel>
                        </div>
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel  className="flex flex-col w-full gap-2">
                            <label htmlFor="indentification">Cedula</label>
                            <InputText id="indentification" {...register("indentification")} placeholder="Ej. 99.999.999" />
                            {errors.indentification && <p className="text-red-500">{errors.indentification.message}</p>}
                        </FloatLabel>
                        </div>
                    </div>
                    <div className="container flex flex-col gap-4 md:flex-row">
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel className="flex flex-col w-full gap-2 pass">
                            <label htmlFor="newpassword">Contraseña</label>
                            <Elements.PasswordInput register={register} placeholder="Contraseña" indicator="newpassword" />
                        {/*     <Password id="newpassword" className="block w-full"  {...register("newpassword")} placeholder="Contraseña"  feedback={false} tabIndex={1}  toggleMask/> */}
                            {errors.newpassword && <p className="text-red-500">{errors.newpassword.message}</p>}
                        </FloatLabel>
                        </div>
                        <div className="w-full pb-3 md:w-6/12">
                        <FloatLabel className="flex flex-col w-full gap-2 pass">
                            <label htmlFor="confirmPass">Confirmar Contraseña</label>
                            <Elements.PasswordInput register={register} placeholder="Confirmar Contraseña" indicator="confirmPass" />
                            {errors.confirmPass && <p className="text-red-500">{errors.confirmPass.message}</p>}
                        </FloatLabel>
                        </div>
                        </div>
           <button className="w-full py-3 text-center text-white duration-300 rounded-md bg-secondary hover:bg-primary">Registrarse</button>
           </form>
            </Elements.CardComponent>
        </FrontendComponents.Layout.AuthLayout>
       </>
    )
}